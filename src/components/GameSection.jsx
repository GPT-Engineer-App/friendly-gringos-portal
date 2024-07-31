import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GameSection = () => {
  const gameCategories = ['All', 'Slots', 'Table Games', 'Live Casino'];
  const games = [
    { name: 'Game 1', image: '/placeholder.svg' },
    { name: 'Game 2', image: '/placeholder.svg' },
    { name: 'Game 3', image: '/placeholder.svg' },
    { name: 'Game 4', image: '/placeholder.svg' },
    { name: 'Game 5', image: '/placeholder.svg' },
    { name: 'Game 6', image: '/placeholder.svg' },
  ];

  return (
    <section id="games" className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Games</h2>
        <Tabs defaultValue="All">
          <TabsList className="flex justify-center mb-6">
            {gameCategories.map((category) => (
              <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
          </TabsList>
          {gameCategories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {games.map((game, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <img src={game.image} alt={game.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-center">{game.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default GameSection;