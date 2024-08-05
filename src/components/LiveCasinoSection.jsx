import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const LiveCasinoSection = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const liveGames = [
    { name: 'Live Roulette', image: 'https://example.com/live-roulette.jpg', description: 'Experience the thrill of real-time roulette with our professional dealers.' },
    { name: 'Live Blackjack', image: 'https://example.com/live-blackjack.jpg', description: 'Play the classic card game with live dealers and other players from around the world.' },
    { name: 'Live Baccarat', image: 'https://example.com/live-baccarat.jpg', description: 'Enjoy the sophistication of baccarat with our live streaming technology.' },
    { name: 'Live Poker', image: 'https://example.com/live-poker.jpg', description: 'Test your poker skills against other players in our live poker rooms.' },
  ];

  return (
    <section id="live-casino" className="py-12 bg-gray-800 text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Live Casino</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {liveGames.map((game, index) => (
            <div key={index} className="bg-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img src={game.image} alt={game.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-xl mb-2">{game.name}</h3>
                <p className="text-sm mb-4">{game.description}</p>
                <Button onClick={() => setSelectedGame(game)} className="w-full">Play Now</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedGame && (
        <Dialog open={!!selectedGame} onOpenChange={() => setSelectedGame(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedGame.name}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <img src={selectedGame.image} alt={selectedGame.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <p>{selectedGame.description}</p>
              <Button className="w-full mt-4">Start Playing</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default LiveCasinoSection;
