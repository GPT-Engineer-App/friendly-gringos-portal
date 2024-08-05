import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const LiveCasinoSection = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const liveGames = [
    { name: 'Live Roulette', image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-ct6DYdHBdpbG6s5cIJ3TGKNP/user-nUCao1VfJu8jHUdtqLgTHGvk/img-Wd0Ow0Ov3Eo9Nh3Gu4Tz6Ixd.png?st=2024-03-19T14%3A39%3A13Z&se=2024-03-19T16%3A39%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-19T15%3A39%3A13Z&ske=2024-03-20T15%3A39%3A13Z&sks=b&skv=2021-08-06&sig=Aq%2BXrVmLMHNQXVZRPXCGGXGOZHXGFXLXXXXXXXXXXXX%3D', description: 'Experience the thrill of real-time roulette with our professional dealers.' },
    { name: 'Live Blackjack', image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-ct6DYdHBdpbG6s5cIJ3TGKNP/user-nUCao1VfJu8jHUdtqLgTHGvk/img-Wd0Ow0Ov3Eo9Nh3Gu4Tz6Ixd.png?st=2024-03-19T14%3A39%3A13Z&se=2024-03-19T16%3A39%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-19T15%3A39%3A13Z&ske=2024-03-20T15%3A39%3A13Z&sks=b&skv=2021-08-06&sig=Aq%2BXrVmLMHNQXVZRPXCGGXGOZHXGFXLXXXXXXXXXXXX%3D', description: 'Play the classic card game with live dealers and other players from around the world.' },
    { name: 'Live Baccarat', image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-ct6DYdHBdpbG6s5cIJ3TGKNP/user-nUCao1VfJu8jHUdtqLgTHGvk/img-Wd0Ow0Ov3Eo9Nh3Gu4Tz6Ixd.png?st=2024-03-19T14%3A39%3A13Z&se=2024-03-19T16%3A39%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-19T15%3A39%3A13Z&ske=2024-03-20T15%3A39%3A13Z&sks=b&skv=2021-08-06&sig=Aq%2BXrVmLMHNQXVZRPXCGGXGOZHXGFXLXXXXXXXXXXXX%3D', description: 'Enjoy the sophistication of baccarat with our live streaming technology.' },
    { name: 'Live Poker', image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-ct6DYdHBdpbG6s5cIJ3TGKNP/user-nUCao1VfJu8jHUdtqLgTHGvk/img-Wd0Ow0Ov3Eo9Nh3Gu4Tz6Ixd.png?st=2024-03-19T14%3A39%3A13Z&se=2024-03-19T16%3A39%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-19T15%3A39%3A13Z&ske=2024-03-20T15%3A39%3A13Z&sks=b&skv=2021-08-06&sig=Aq%2BXrVmLMHNQXVZRPXCGGXGOZHXGFXLXXXXXXXXXXXX%3D', description: 'Test your poker skills against other players in our live poker rooms.' },
  ];

  return (
    <section id="live-casino" className="py-12 bg-gray-800 text-white" style={{backgroundImage: 'url("/images/live-casino-background.jpg")', backgroundSize: 'cover', backgroundPosition: 'center'}}>
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
