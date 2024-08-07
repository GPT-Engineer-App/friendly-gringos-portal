import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const MiniGame = ({ onWin }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣', '🃏'];
    const gameCards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol, isFlipped: false }));
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setIsGameOver(false);
  };

  const handleCardClick = (clickedCard) => {
    if (flippedCards.length === 2 || matchedPairs.includes(clickedCard.symbol)) return;

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      if (newFlippedCards[0].symbol === newFlippedCards[1].symbol) {
        setMatchedPairs([...matchedPairs, clickedCard.symbol]);
        setFlippedCards([]);
        if (matchedPairs.length + 1 === symbols.length / 2) {
          setIsGameOver(true);
          onWin();
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Memory Mini-Game</h3>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={`w-16 h-16 flex items-center justify-center text-2xl bg-blue-500 rounded-lg cursor-pointer ${
              flippedCards.includes(card) || matchedPairs.includes(card.symbol) ? 'bg-green-500' : ''
            }`}
            onClick={() => handleCardClick(card)}
            animate={{ rotateY: flippedCards.includes(card) || matchedPairs.includes(card.symbol) ? 180 : 0 }}
          >
            {(flippedCards.includes(card) || matchedPairs.includes(card.symbol)) && card.symbol}
          </motion.div>
        ))}
      </div>
      {isGameOver && (
        <div className="mt-4">
          <p className="text-lg font-bold text-green-500">Congratulations! You've won the mini-game!</p>
          <Button onClick={initializeGame} className="mt-2">Play Again</Button>
        </div>
      )}
    </div>
  );
};

export default MiniGame;
