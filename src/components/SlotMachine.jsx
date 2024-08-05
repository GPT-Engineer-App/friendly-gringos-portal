import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSupabaseAuth } from '@/integrations/supabase/auth';
import { supabase } from '@/integrations/supabase';
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

const SlotMachine = ({ slot, onClose }) => {
  const [reels, setReels] = useState([0, 0, 0]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState('');
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(10);
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoPlayCount, setAutoPlayCount] = useState(0);
  const { user } = useSupabaseAuth();

  const symbols = [
    { symbol: '🍒', value: 1 },
    { symbol: '🍋', value: 2 },
    { symbol: '🍊', value: 3 },
    { symbol: '🍇', value: 4 },
    { symbol: '🔔', value: 5 },
    { symbol: '💎', value: 10 },
    { symbol: '7️⃣', value: 20 },
    { symbol: '🃏', value: 50 },
  ];

  useEffect(() => {
    if (user) {
      fetchBalance();
    }
  }, [user]);

  const fetchBalance = async () => {
    const { data, error } = await supabase
      .from('user_balance')
      .select('balance')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching balance:', error);
    } else {
      setBalance(data.balance);
    }
  };

  const updateBalance = async (newBalance) => {
    const { error } = await supabase
      .from('user_balance')
      .upsert({ user_id: user.id, balance: newBalance });

    if (error) {
      console.error('Error updating balance:', error);
    } else {
      setBalance(newBalance);
    }
  };

  const spin = useCallback(() => {
    if (balance < bet) {
      toast.error("Insufficient balance!");
      return;
    }

    setSpinning(true);
    setResult('');
    const spinDuration = 2000;
    const intervalDuration = 100;
    let spins = 0;

    const spinInterval = setInterval(() => {
      setReels(reels.map(() => Math.floor(Math.random() * symbols.length)));
      spins++;

      if (spins * intervalDuration >= spinDuration) {
        clearInterval(spinInterval);
        setSpinning(false);
        checkResult();
        if (autoPlay && autoPlayCount > 1) {
          setAutoPlayCount(prev => prev - 1);
          setTimeout(spin, 1000);
        } else if (autoPlay && autoPlayCount === 1) {
          setAutoPlay(false);
          setAutoPlayCount(0);
        }
      }
    }, intervalDuration);

    updateBalance(balance - bet);
  }, [balance, bet, autoPlay, autoPlayCount, symbols.length]);

  useEffect(() => {
    if (autoPlay && autoPlayCount > 0 && !spinning) {
      spin();
    }
  }, [autoPlay, autoPlayCount, spinning, spin]);

  const checkResult = () => {
    const reelSymbols = reels.map(index => symbols[index]);
    let winAmount = 0;
    
    if (reelSymbols[0].symbol === reelSymbols[1].symbol && reelSymbols[1].symbol === reelSymbols[2].symbol) {
      winAmount = bet * reelSymbols[0].value;
      setResult(`Jackpot! You win ${winAmount} coins!`);
    } else if (reelSymbols[0].symbol === reelSymbols[1].symbol || reelSymbols[1].symbol === reelSymbols[2].symbol) {
      winAmount = bet * Math.max(reelSymbols[0].value, reelSymbols[1].value, reelSymbols[2].value) / 2;
      setResult(`Nice! You win ${winAmount} coins!`);
    } else {
      setResult('Try again!');
    }

    if (winAmount > 0) {
      updateBalance(balance + winAmount);
    }

    // Record game history
    supabase.from('game_history').insert({
      user_id: user.id,
      game_name: slot.name,
      result: winAmount > 0 ? `Won ${winAmount}` : 'Lost',
      played_at: new Date().toISOString(),
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">{slot.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="relative w-full h-64 bg-gray-800 rounded-lg overflow-hidden">
            <div className="flex justify-around items-center h-full">
              {reels.map((reel, index) => (
                <motion.div
                  key={index}
                  className="text-6xl bg-gray-700 p-4 rounded-lg"
                  animate={{ 
                    y: spinning ? [0, 100, 0] : 0,
                    rotateX: spinning ? [0, 360] : 0
                  }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: spinning ? Infinity : 0, 
                    ease: "linear" 
                  }}
                >
                  {symbols[reel].symbol}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 mb-2">
            <div className="flex items-center">
              <span className="mr-2">Bet:</span>
              <Slider
                min={1}
                max={100}
                step={1}
                value={[bet]}
                onValueChange={(value) => setBet(value[0])}
                className="w-32"
              />
              <span className="ml-2">{bet} coins</span>
            </div>
            <div>Balance: {balance} coins</div>
          </div>
          <div className="flex space-x-2 mt-4">
            <Button onClick={spin} disabled={spinning || autoPlay} className="flex-1 bg-green-500 hover:bg-green-600">
              {spinning ? 'Spinning...' : 'Spin'}
            </Button>
            <Button
              onClick={() => {
                setAutoPlay(!autoPlay);
                setAutoPlayCount(autoPlay ? 0 : 10);
              }}
              variant={autoPlay ? "destructive" : "secondary"}
              className="flex-1"
            >
              {autoPlay ? 'Stop Auto' : 'Auto Play'}
            </Button>
          </div>
          {autoPlay && <p className="text-center text-sm mt-2">Auto spins remaining: {autoPlayCount}</p>}
          {result && <p className="text-center font-bold mt-4 text-xl">{result}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SlotMachine;
