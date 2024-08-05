import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const SlotMachine = ({ slot, onClose }) => {
  const [reels, setReels] = useState([0, 0, 0]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState('');

  const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣'];

  const spin = () => {
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
      }
    }, intervalDuration);
  };

  const checkResult = () => {
    if (reels[0] === reels[1] && reels[1] === reels[2]) {
      setResult('Jackpot! You win!');
    } else if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) {
      setResult('Two of a kind! Small win!');
    } else {
      setResult('Try again!');
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{slot.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="flex justify-center space-x-4 text-6xl mb-4">
            {reels.map((reel, index) => (
              <div key={index} className="w-20 h-20 border-2 border-gray-300 rounded flex items-center justify-center">
                {symbols[reel]}
              </div>
            ))}
          </div>
          <Button onClick={spin} disabled={spinning} className="w-full mb-4">
            {spinning ? 'Spinning...' : 'Spin'}
          </Button>
          {result && <p className="text-center font-bold">{result}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SlotMachine;
