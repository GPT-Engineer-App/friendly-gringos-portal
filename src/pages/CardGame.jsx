import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabaseAuth } from '@/integrations/supabase/auth';
import { supabase } from '@/integrations/supabase';
import { toast } from "sonner";

const CardGame = () => {
  const [playerDeck, setPlayerDeck] = useState([]);
  const [opponentDeck, setOpponentDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [opponentHand, setOpponentHand] = useState([]);
  const [playerField, setPlayerField] = useState([]);
  const [opponentField, setOpponentField] = useState([]);
  const [playerResources, setPlayerResources] = useState(0);
  const [opponentResources, setOpponentResources] = useState(0);
  const [currentTurn, setCurrentTurn] = useState('player');
  const { user } = useSupabaseAuth();

  useEffect(() => {
    if (user) {
      initializeGame();
    }
  }, [user]);

  const initializeGame = async () => {
    // Fetch cards from the database or use predefined cards
    const { data: cards, error } = await supabase.from('cards').select('*');
    if (error) {
      console.error('Error fetching cards:', error);
      return;
    }

    // Shuffle and distribute cards
    const shuffledCards = shuffleArray(cards);
    setPlayerDeck(shuffledCards.slice(0, 30));
    setOpponentDeck(shuffledCards.slice(30, 60));

    // Draw initial hands
    drawCards(5, 'player');
    drawCards(5, 'opponent');

    // Set initial resources
    setPlayerResources(1);
    setOpponentResources(1);
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const drawCards = (count, player) => {
    if (player === 'player') {
      const drawnCards = playerDeck.slice(0, count);
      setPlayerHand([...playerHand, ...drawnCards]);
      setPlayerDeck(playerDeck.slice(count));
    } else {
      const drawnCards = opponentDeck.slice(0, count);
      setOpponentHand([...opponentHand, ...drawnCards]);
      setOpponentDeck(opponentDeck.slice(count));
    }
  };

  const playCard = (card, player) => {
    if (player === 'player' && playerResources >= card.cost) {
      setPlayerHand(playerHand.filter(c => c.id !== card.id));
      setPlayerField([...playerField, card]);
      setPlayerResources(playerResources - card.cost);
    } else if (player === 'opponent' && opponentResources >= card.cost) {
      setOpponentHand(opponentHand.filter(c => c.id !== card.id));
      setOpponentField([...opponentField, card]);
      setOpponentResources(opponentResources - card.cost);
    }
  };

  const endTurn = () => {
    if (currentTurn === 'player') {
      setCurrentTurn('opponent');
      setOpponentResources(opponentResources + 1);
      drawCards(1, 'opponent');
      // Implement AI logic for opponent's turn
      // ...
    } else {
      setCurrentTurn('player');
      setPlayerResources(playerResources + 1);
      drawCards(1, 'player');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Card Battling Game</h1>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Opponent</h2>
          <p>Hand: {opponentHand.length} cards</p>
          <p>Resources: {opponentResources}</p>
          <div className="mt-4">
            <h3 className="font-semibold">Field</h3>
            {opponentField.map(card => (
              <Card key={card.id} className="mb-2">
                <CardHeader>
                  <CardTitle>{card.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Attack: {card.attack}</p>
                  <p>Defense: {card.defense}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <Button onClick={endTurn} disabled={currentTurn !== 'player'}>End Turn</Button>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Player</h2>
          <p>Resources: {playerResources}</p>
          <div className="mt-4">
            <h3 className="font-semibold">Hand</h3>
            {playerHand.map(card => (
              <Card key={card.id} className="mb-2 cursor-pointer" onClick={() => playCard(card, 'player')}>
                <CardHeader>
                  <CardTitle>{card.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Cost: {card.cost}</p>
                  <p>Attack: {card.attack}</p>
                  <p>Defense: {card.defense}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Field</h3>
            {playerField.map(card => (
              <Card key={card.id} className="mb-2">
                <CardHeader>
                  <CardTitle>{card.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Attack: {card.attack}</p>
                  <p>Defense: {card.defense}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGame;
