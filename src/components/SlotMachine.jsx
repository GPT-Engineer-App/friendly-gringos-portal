import React, { useState, useEffect } from 'react';
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

  const symbols = {
    science: ['⚛', '🧬', '🔬', '🧪', '📊', '💡'],
    fantasy: ['🐉', '🦄', '🧙‍♂️', '🧝‍♀️', '🏰', '🔮'],
    technology: ['💾', '🕹️', '👾', '🖥️', '📱', '🤖'],
    food: ['🍕', '🍔', '🍣', '🍰', '🍷', '🍳'],
    space: ['🚀', '👽', '🛸', '🌠', '🪐', '🌌'],
    steampunk: ['⚙️', '🎩', '🔧', '🕰️', '🎈', '🔍'],
    modern: ['😎', '🤑', '🎉', '💯', '🔥', '💖'],
    prehistoric: ['🦕', '🦖', '🌋', '🍖', '🦴', '🌿'],
  };

  const colors = {
    science: ['#1a237e', '#283593', '#3f51b5'],
    fantasy: ['#4a148c', '#6a1b9a', '#7b1fa2'],
    technology: ['#004d40', '#00695c', '#00796b'],
    food: ['#e65100', '#ef6c00', '#f57c00'],
    space: ['#1a237e', '#283593', '#3f51b5'],
    steampunk: ['#3e2723', '#4e342e', '#5d4037'],
    modern: ['#880e4f', '#ad1457', '#c2185b'],
    prehistoric: ['#1b5e20', '#2e7d32', '#43a047'],
  };

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

  const spin = () => {
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
      setReels(reels.map(() => Math.floor(Math.random() * symbols[slot.theme].length)));
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
  };

  useEffect(() => {
    if (autoPlay && autoPlayCount > 0 && !spinning) {
      spin();
    }
  }, [autoPlay, autoPlayCount, spinning]);

  const checkResult = () => {
    let winAmount = 0;
    if (reels[0] === reels[1] && reels[1] === reels[2]) {
      winAmount = bet * 10;
      setResult(`Jackpot! You win ${winAmount} coins!`);
    } else if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) {
      winAmount = bet * 2;
      setResult(`Two of a kind! You win ${winAmount} coins!`);
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{slot.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="relative w-full h-64 bg-gray-800 rounded-lg overflow-hidden">
            <svg viewBox="0 0 300 200" className="w-full h-full">
              {/* Slot machine body */}
              <rect width="300" height="200" fill={colors[slot.theme][0]} />
              <rect x="20" y="20" width="260" height="160" fill={colors[slot.theme][1]} rx="10" />
              
              {/* Reels */}
              {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(${70 + i * 60}, 50)`}>
                  <rect width="50" height="100" fill="white" stroke={colors[slot.theme][2]} strokeWidth="4" />
                  <motion.text
                    x="25"
                    y="65"
                    fontSize="40"
                    textAnchor="middle"
                    fill={colors[slot.theme][2]}
                    animate={{ y: spinning ? [0, 100, 0] : 0 }}
                    transition={{ duration: 0.5, repeat: spinning ? Infinity : 0, ease: "linear" }}
                  >
                    {symbols[slot.theme][reels[i]]}
                  </motion.text>
                </g>
              ))}

              {/* Lever */}
              <motion.g
                animate={{ rotate: spinning ? 45 : 0 }}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: '270px 70px' }}
              >
                <rect x="260" y="80" width="20" height="100" fill={colors[slot.theme][2]} rx="10" />
                <circle cx="270" cy="70" r="15" fill="red" />
              </motion.g>
            </svg>
          </div>
          <div className="flex justify-between items-center mt-4 mb-2">
            <div>
              <label htmlFor="bet" className="mr-2">Bet:</label>
              <Slider
                id="bet"
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
          <div className="flex space-x-2 mt-2 mb-2">
            <Button onClick={spin} disabled={spinning || autoPlay} className="flex-1">
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
          {autoPlay && <p className="text-center text-sm">Auto spins remaining: {autoPlayCount}</p>}
          {result && <p className="text-center font-bold mt-2">{result}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SlotMachine;
