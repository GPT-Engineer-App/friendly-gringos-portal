import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const SlotMachine = ({ slot, onClose }) => {
  const [reels, setReels] = useState([0, 0, 0]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState('');

  const symbols = ['♠', '♥', '♦', '♣', '★', '7'];
  const colors = {
    space: ['#1a237e', '#283593', '#3f51b5'],
    adventure: ['#33691e', '#558b2f', '#7cb342'],
    nature: ['#1b5e20', '#2e7d32', '#43a047'],
    cyberpunk: ['#b71c1c', '#c62828', '#d32f2f'],
    history: ['#4e342e', '#5d4037', '#6d4c41'],
    food: ['#e65100', '#ef6c00', '#f57c00'],
    underwater: ['#01579b', '#0277bd', '#0288d1'],
    western: ['#bf360c', '#d84315', '#e64a19'],
  };

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
          <div className="relative w-full h-64 bg-gray-800 rounded-lg overflow-hidden">
            <svg viewBox="0 0 300 200" className="w-full h-full">
              {/* Slot machine body */}
              <rect width="300" height="200" fill={slot.colors[0]} />
              <rect x="20" y="20" width="260" height="160" fill={slot.colors[1]} rx="10" />
              
              {/* Reels */}
              {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(${70 + i * 60}, 50)`}>
                  <rect width="50" height="100" fill="white" stroke={slot.colors[2]} strokeWidth="4" />
                  <text x="25" y="65" fontSize="40" textAnchor="middle" fill={slot.colors[2]}>
                    {symbols[reels[i]]}
                  </text>
                </g>
              ))}

              {/* Lever */}
              <rect x="260" y="80" width="20" height="100" fill={slot.colors[2]} rx="10" />
              <circle cx="270" cy="70" r="15" fill="red" />
            </svg>
          </div>
          <Button onClick={spin} disabled={spinning} className="w-full mt-4 mb-2">
            {spinning ? 'Spinning...' : 'Spin'}
          </Button>
          {result && <p className="text-center font-bold">{result}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SlotMachine;
