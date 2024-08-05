import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import GameModal from './GameModal';

const GameSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const gameCategories = ['All', 'Slots', 'Table Games', 'Live Casino', 'Jackpots'];
  const games = [
    { name: 'Starburst', category: 'Slots', image: 'https://example.com/starburst.jpg' },
    { name: 'Blackjack', category: 'Table Games', image: 'https://example.com/blackjack.jpg' },
    { name: 'Roulette Live', category: 'Live Casino', image: 'https://example.com/roulette-live.jpg' },
    { name: 'Mega Moolah', category: 'Jackpots', image: 'https://example.com/mega-moolah.jpg' },
    { name: 'Book of Dead', category: 'Slots', image: 'https://example.com/book-of-dead.jpg' },
    { name: 'Poker', category: 'Table Games', image: 'https://example.com/poker.jpg' },
    { name: 'Gonzo's Quest', category: 'Slots', image: 'https://example.com/gonzos-quest.jpg' },
    { name: 'Baccarat Live', category: 'Live Casino', image: 'https://example.com/baccarat-live.jpg' },
  ];

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="games" className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Games</h2>
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Tabs defaultValue="All">
          <TabsList className="flex justify-center mb-6">
            {gameCategories.map((category) => (
              <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
          </TabsList>
          {gameCategories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredGames
                  .filter(game => category === 'All' || game.category === category)
                  .map((game, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                      onClick={() => setSelectedGame(game)}
                    >
                      <img src={game.image} alt={game.name} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold text-center">{game.name}</h3>
                        <p className="text-sm text-gray-500 text-center mt-1">{game.category}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <GameModal 
        game={selectedGame} 
        isOpen={!!selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />
    </section>
  );
};

export default GameSection;
