import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSupabaseAuth } from '@/integrations/supabase/auth';
import { supabase } from '@/integrations/supabase';
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Howl } from 'howler';

const SlotMachine = ({ slot, onClose }) => {
  const [reels, setReels] = useState([0, 0, 0]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState('');
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(10);
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoPlayCount, setAutoPlayCount] = useState(0);
  const [jackpot, setJackpot] = useState(10000);
  const [winChance, setWinChance] = useState(0);
  const [lastWin, setLastWin] = useState(0);
  const { user } = useSupabaseAuth();
  
  const spinSound = useRef(new Howl({ src: ['/sounds/spin.mp3'] }));
  const winSound = useRef(new Howl({ src: ['/sounds/win.mp3'] }));
  const jackpotSound = useRef(new Howl({ src: ['/sounds/jackpot.mp3'] }));

  const symbols = [
    { symbol: '🍒', value: 1, weight: 20 },
    { symbol: '🍋', value: 2, weight: 15 },
    { symbol: '🍊', value: 3, weight: 12 },
    { symbol: '🍇', value: 4, weight: 10 },
    { symbol: '🔔', value: 5, weight: 8 },
    { symbol: '💎', value: 10, weight: 5 },
    { symbol: '7️⃣', value: 20, weight: 3 },
    { symbol: '🃏', value: 50, weight: 1 },
  ];

  const [reelHeight, setReelHeight] = useState(0);

  useEffect(() => {
    const updateReelHeight = () => {
      const reelElement = document.querySelector('.reel');
      if (reelElement) {
        setReelHeight(reelElement.offsetHeight);
      }
    };

    updateReelHeight();
    window.addEventListener('resize', updateReelHeight);

    return () => window.removeEventListener('resize', updateReelHeight);
  }, []);

  const getSymbolStyles = (index) => ({
    transform: `translateY(${-reelHeight * index}px)`,
    transition: spinning ? 'transform 0.5s cubic-bezier(.17,.67,.83,.67)' : 'none',
  });

  useEffect(() => {
    if (user) {
      fetchBalance();
      fetchJackpot();
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

  const fetchJackpot = async () => {
    const { data, error } = await supabase
      .from('jackpot')
      .select('amount')
      .single();

    if (error) {
      console.error('Error fetching jackpot:', error);
    } else {
      setJackpot(data.amount);
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

  const updateJackpot = async (newAmount) => {
    const { error } = await supabase
      .from('jackpot')
      .update({ amount: newAmount })
      .eq('id', 1);

    if (error) {
      console.error('Error updating jackpot:', error);
    } else {
      setJackpot(newAmount);
    }
  };

  const spin = useCallback(() => {
    if (balance < bet) {
      toast.error("Insufficient balance!");
      return;
    }

    setSpinning(true);
    setResult('');
    spinSound.current.play();
    const spinDuration = 2000;
    const intervalDuration = 100;
    let spins = 0;

    const spinInterval = setInterval(() => {
      setReels(reels.map(() => weightedRandomSymbol()));
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
    updateJackpot(jackpot + bet * 0.01);
  }, [balance, bet, autoPlay, autoPlayCount, jackpot]);

  const playWinAnimation = (winAmount) => {
    setLastWin(winAmount);
    setTimeout(() => setLastWin(0), 3000);
  };

  useEffect(() => {
    if (autoPlay && autoPlayCount > 0 && !spinning) {
      spin();
    }
  }, [autoPlay, autoPlayCount, spinning, spin]);

  const weightedRandomSymbol = () => {
    const totalWeight = symbols.reduce((sum, symbol) => sum + symbol.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < symbols.length; i++) {
      if (random < symbols[i].weight) {
        return i;
      }
      random -= symbols[i].weight;
    }
    return symbols.length - 1;
  };

  const checkResult = () => {
    const reelSymbols = reels.map(index => symbols[index]);
    let winAmount = 0;
    
    if (reelSymbols[0].symbol === reelSymbols[1].symbol && reelSymbols[1].symbol === reelSymbols[2].symbol) {
      if (reelSymbols[0].symbol === '🃏') {
        winAmount = jackpot;
        setResult(`MEGA JACKPOT! You win ${winAmount} coins!`);
        updateJackpot(10000); // Reset jackpot after win
        jackpotSound.current.play();
      } else {
        winAmount = bet * reelSymbols[0].value * 3;
        setResult(`Jackpot! You win ${winAmount} coins!`);
        winSound.current.play();
      }
    } else if (reelSymbols[0].symbol === reelSymbols[1].symbol || reelSymbols[1].symbol === reelSymbols[2].symbol) {
      winAmount = bet * Math.max(reelSymbols[0].value, reelSymbols[1].value, reelSymbols[2].value);
      setResult(`Nice! You win ${winAmount} coins!`);
      winSound.current.play();
    } else {
      setResult('Try again!');
    }

    if (winAmount > 0) {
      updateBalance(balance + winAmount);
      playWinAnimation(winAmount);
    }

    // Record game history
    supabase.from('game_history').insert({
      user_id: user.id,
      game_name: slot.name,
      bet_amount: bet,
      win_amount: winAmount,
      result: winAmount > 0 ? `Won ${winAmount}` : 'Lost',
      played_at: new Date().toISOString(),
    });
  };

  useEffect(() => {
    const totalValue = symbols.reduce((sum, symbol) => sum + symbol.value * symbol.weight, 0);
    const averageValue = totalValue / symbols.reduce((sum, symbol) => sum + symbol.weight, 0);
    const theoreticalWinChance = (averageValue * 3) / 100; // Simplified calculation
    setWinChance(theoreticalWinChance * 100);
  }, []);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center justify-between">
            {slot.name}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="secondary" className="ml-2">
                    {slot.rtp}% RTP
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Return to Player: {slot.rtp}%</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="relative w-full h-64 bg-gray-800 rounded-lg overflow-hidden">
            <div className="flex justify-around items-center h-full">
              {reels.map((reelIndex, index) => (
                <div key={index} className="reel w-1/3 h-full overflow-hidden">
                  <div className="reel-container" style={getSymbolStyles(reelIndex)}>
                    {symbols.map((symbol, symbolIndex) => (
                      <div key={symbolIndex} className="symbol flex items-center justify-center h-full text-6xl">
                        {symbol.symbol}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <AnimatePresence>
            {lastWin > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-yellow-400 z-10"
              >
                +{lastWin} coins!
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex justify-between items-center mt-4 mb-2">
            <div className="flex items-center">
              <span className="mr-2">Bet:</span>
              <Slider
                min={slot.min_bet}
                max={slot.max_bet}
                step={1}
                value={[bet]}
                onValueChange={(value) => setBet(value[0])}
                className="w-32"
              />
              <span className="ml-2">{bet} coins</span>
            </div>
            <div>Balance: {balance} coins</div>
          </div>
          <div className="flex justify-between items-center mt-2 mb-4">
            <div>Jackpot: {jackpot} coins</div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">Win Chance: {winChance.toFixed(2)}%</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Based on RTP and current jackpot</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Progress value={winChance} className="mb-4" />
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
