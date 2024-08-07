import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useSupabaseAuth } from '@/integrations/supabase/auth';
import { supabase } from '@/integrations/supabase';
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Howl } from 'howler';
import confetti from 'canvas-confetti';
import { useSpring, animated } from 'react-spring';
import MiniGame from './MiniGame';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const SlotMachine = ({ slot, onClose }) => {
  const [theme, setTheme] = useState('default');
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
  const [gameHistory, setGameHistory] = useState([]);
  const { user } = useSupabaseAuth();
  
  const spinSound = useRef(new Howl({ src: ['/sounds/spin.mp3'] }));
  const winSound = useRef(new Howl({ src: ['/sounds/win.mp3'] }));
  const jackpotSound = useRef(new Howl({ src: ['/sounds/jackpot.mp3'] }));
  const coinSound = useRef(new Howl({ src: ['/sounds/coin.mp3'] }));

  const [coinAnimation, setCoinAnimation] = useState(false);
  const coinSpring = useSpring({
    to: async (next) => {
      if (coinAnimation) {
        await next({ y: 0, opacity: 1 });
        await next({ y: -50, opacity: 0 });
      }
    },
    from: { y: 50, opacity: 0 },
    reset: true,
  });

  const symbols = [
    { symbol: '🍒', value: 1, weight: 20 },
    { symbol: '🍋', value: 2, weight: 15 },
    { symbol: '🍊', value: 3, weight: 12 },
    { symbol: '🍇', value: 4, weight: 10 },
    { symbol: '🔔', value: 5, weight: 8 },
    { symbol: '💎', value: 10, weight: 5 },
    { symbol: '7️⃣', value: 20, weight: 3 },
    { symbol: '🃏', value: 50, weight: 1 },
    { symbol: '🌟', value: 100, weight: 1 }, // Wild symbol
  ];

  const [freeSpins, setFreeSpins] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [bonusGame, setBonusGame] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(false);

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

  const handleMiniGameWin = () => {
    const bonusAmount = Math.floor(Math.random() * 100) + 50;
    updateBalance(balance + bonusAmount);
    toast.success(`You won ${bonusAmount} coins in the mini-game!`);
    setShowMiniGame(false);
  };

  const getSymbolStyles = (index) => ({
    transform: `translateY(${-reelHeight * index}px)`,
    transition: spinning ? 'transform 0.5s cubic-bezier(.17,.67,.83,.67)' : 'none',
  });

  useEffect(() => {
    if (user) {
      fetchBalance();
      fetchJackpot();
      fetchGameHistory();
    }
  }, [user]);

  const fetchGameHistory = async () => {
    const { data, error } = await supabase
      .from('game_history')
      .select('*')
      .eq('user_id', user.id)
      .order('played_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching game history:', error);
    } else {
      setGameHistory(data);
    }
  };

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
    setCoinAnimation(true);
    coinSound.current.play();
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
    let newFreeSpins = freeSpins;
    let newMultiplier = multiplier;
    
    // Check for wild symbols
    const wildCount = reelSymbols.filter(s => s.symbol === '🌟').length;
    
    if (reelSymbols[0].symbol === reelSymbols[1].symbol && reelSymbols[1].symbol === reelSymbols[2].symbol) {
      if (reelSymbols[0].symbol === '🃏') {
        winAmount = jackpot;
        setResult(`MEGA JACKPOT! You win ${winAmount} coins!`);
        updateJackpot(10000); // Reset jackpot after win
        jackpotSound.current.play();
        confetti();
      } else {
        winAmount = bet * reelSymbols[0].value * 3 * multiplier;
        setResult(`Jackpot! You win ${winAmount} coins!`);
        winSound.current.play();
        confetti();
      }
    } else if (wildCount > 0 || reelSymbols[0].symbol === reelSymbols[1].symbol || reelSymbols[1].symbol === reelSymbols[2].symbol) {
      const maxValue = Math.max(...reelSymbols.map(s => s.value));
      winAmount = bet * maxValue * (wildCount + 1) * multiplier;
      setResult(`Nice! You win ${winAmount} coins!`);
      winSound.current.play();
    } else {
      setResult('Try again!');
    }

    // Check for free spins
    if (reelSymbols.filter(s => s.symbol === '7️⃣').length >= 2) {
      newFreeSpins += 5;
      setResult(prev => `${prev} You won 5 free spins!`);
    }

    // Check for multiplier increase
    if (reelSymbols.filter(s => s.symbol === '💎').length >= 2) {
      newMultiplier = Math.min(multiplier + 1, 5);
      setResult(prev => `${prev} Multiplier increased to ${newMultiplier}x!`);
    }

    // Trigger bonus game
    if (reelSymbols.filter(s => s.symbol === '🔔').length === 3) {
      setBonusGame(true);
    }

    if (winAmount > 0) {
      updateBalance(balance + winAmount);
      playWinAnimation(winAmount);
    }

    setFreeSpins(newFreeSpins);
    setMultiplier(newMultiplier);

    // Record game history
    const newGameHistory = {
      user_id: user.id,
      game_name: slot.name,
      bet_amount: bet,
      win_amount: winAmount,
      result: winAmount > 0 ? `Won ${winAmount}` : 'Lost',
      played_at: new Date().toISOString(),
      balance_after: balance + winAmount - bet,
    };

    supabase.from('game_history').insert(newGameHistory);
    setGameHistory(prevHistory => [newGameHistory, ...prevHistory]);
  };

  useEffect(() => {
    const totalValue = symbols.reduce((sum, symbol) => sum + symbol.value * symbol.weight, 0);
    const averageValue = totalValue / symbols.reduce((sum, symbol) => sum + symbol.weight, 0);
    const theoreticalWinChance = (averageValue * 3) / 100; // Simplified calculation
    setWinChance(theoreticalWinChance * 100);
  }, []);

  const themes = {
    default: {
      background: 'bg-gray-900',
      reelBackground: 'bg-gray-800',
      text: 'text-white',
      button: 'bg-green-500 hover:bg-green-600',
    },
    neon: {
      background: 'bg-black',
      reelBackground: 'bg-gray-900',
      text: 'text-neon-pink',
      button: 'bg-neon-blue hover:bg-neon-purple',
    },
    retro: {
      background: 'bg-retro-beige',
      reelBackground: 'bg-retro-brown',
      text: 'text-retro-red',
      button: 'bg-retro-orange hover:bg-retro-yellow',
    },
  };

  const currentTheme = themes[theme];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[800px] ${currentTheme.background} ${currentTheme.text}`}>
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
          <DialogDescription>
            Experience the thrill of {slot.theme} themed slots!
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="game" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="game">Game</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
          <TabsContent value="game">
          <div className="mb-4">
            <label htmlFor="theme-select" className="block mb-2">Select Theme:</label>
            <select
              id="theme-select"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            >
              <option value="default">Default</option>
              <option value="neon">Neon</option>
              <option value="retro">Retro</option>
            </select>
          </div>
          <div className={`relative w-full h-64 ${currentTheme.reelBackground} rounded-lg overflow-hidden`}>
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
          <animated.div style={coinSpring} className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <span className="text-4xl">🪙</span>
          </animated.div>
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
            <div>Free Spins: {freeSpins}</div>
            <div>Multiplier: {multiplier}x</div>
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
            <Button onClick={spin} disabled={spinning || autoPlay} className={`flex-1 ${currentTheme.button}`}>
              {spinning ? 'Spinning...' : freeSpins > 0 ? `Free Spin (${freeSpins})` : 'Spin'}
            </Button>
            <Button
              onClick={() => {
                setAutoPlay(!autoPlay);
                setAutoPlayCount(autoPlay ? 0 : 10);
              }}
              variant={autoPlay ? "destructive" : "secondary"}
              className={`flex-1 ${autoPlay ? 'bg-red-500 hover:bg-red-600' : currentTheme.button}`}
            >
              {autoPlay ? 'Stop Auto' : 'Auto Play'}
            </Button>
          </div>
          {autoPlay && <p className="text-center text-sm mt-2">Auto spins remaining: {autoPlayCount}</p>}
          {result && <p className="text-center font-bold mt-4 text-xl">{result}</p>}
          </TabsContent>
          <TabsContent value="info">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Game Information</h3>
                <p><strong>Theme:</strong> {slot.theme}</p>
                <p><strong>Volatility:</strong> {slot.volatility}</p>
                <p><strong>Min Bet:</strong> ${slot.min_bet}</p>
                <p><strong>Max Bet:</strong> ${slot.max_bet}</p>
                <p><strong>Paylines:</strong> {slot.paylines}</p>
                <h4 className="text-md font-semibold mt-4 mb-2">Special Features:</h4>
                <ul className="list-disc pl-5">
                  <li>Wild Symbols</li>
                  <li>Scatter Symbols</li>
                  <li>Free Spins</li>
                  <li>Bonus Games</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="stats">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Your Statistics</h3>
                <p><strong>Total Spins:</strong> {gameHistory.length}</p>
                <p><strong>Biggest Win:</strong> {Math.max(...gameHistory.map(game => game.win_amount), 0)} coins</p>
                <p><strong>Win Rate:</strong> {gameHistory.length > 0 ? (gameHistory.filter(game => game.win_amount > 0).length / gameHistory.length * 100).toFixed(2) : 0}%</p>
                <h4 className="text-md font-semibold mt-4 mb-2">Balance History</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={gameHistory.slice().reverse()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="played_at" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
                      <YAxis />
                      <RechartsTooltip />
                      <Line type="monotone" dataKey="balance_after" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <h4 className="text-md font-semibold mt-4 mb-2">Recent Wins:</h4>
                <ul className="list-disc pl-5">
                  {gameHistory.filter(game => game.win_amount > 0).slice(0, 5).map((game, index) => (
                    <li key={index}>{game.win_amount} coins on {new Date(game.played_at).toLocaleDateString()}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {bonusGame && (
          <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Bonus Game!</h3>
            <p>Pick a chest to reveal your prize:</p>
            <div className="flex justify-around mt-4">
              {[1, 2, 3].map((chest) => (
                <Button
                  key={chest}
                  onClick={() => {
                    const prize = Math.floor(Math.random() * 500) + 100;
                    updateBalance(balance + prize);
                    setBonusGame(false);
                    toast.success(`You won ${prize} coins in the bonus game!`);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600"
                >
                  Chest {chest}
                </Button>
              ))}
            </div>
          </div>
        )}
        {showMiniGame && (
          <MiniGame onWin={handleMiniGameWin} />
        )}
        <Button onClick={() => setShowMiniGame(true)} className="mt-4 w-full">
          Play Mini-Game
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SlotMachine;
