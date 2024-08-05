import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SlotMachine from './SlotMachine';

const SlotMachineSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState('All');

  const slotProviders = ['All', 'NetEnt', 'Microgaming', 'Play\'n GO', 'Pragmatic Play', 'Yggdrasil'];
  const slots = [
    { name: 'Starburst', provider: 'NetEnt', image: 'https://example.com/starburst.jpg' },
    { name: 'Mega Moolah', provider: 'Microgaming', image: 'https://example.com/mega-moolah.jpg' },
    { name: 'Book of Dead', provider: 'Play\'n GO', image: 'https://example.com/book-of-dead.jpg' },
    { name: "Gonzo's Quest", provider: 'NetEnt', image: 'https://example.com/gonzos-quest.jpg' },
    { name: 'Wolf Gold', provider: 'Pragmatic Play', image: 'https://example.com/wolf-gold.jpg' },
    { name: 'Vikings Go Berzerk', provider: 'Yggdrasil', image: 'https://example.com/vikings-go-berzerk.jpg' },
    { name: 'Reactoonz', provider: 'Play\'n GO', image: 'https://example.com/reactoonz.jpg' },
    { name: 'Dead or Alive 2', provider: 'NetEnt', image: 'https://example.com/dead-or-alive-2.jpg' },
    { name: 'Sweet Bonanza', provider: 'Pragmatic Play', image: 'https://example.com/sweet-bonanza.jpg' },
    { name: 'Immortal Romance', provider: 'Microgaming', image: 'https://example.com/immortal-romance.jpg' },
    { name: 'Valley of the Gods', provider: 'Yggdrasil', image: 'https://example.com/valley-of-the-gods.jpg' },
    { name: 'Fire Joker', provider: 'Play\'n GO', image: 'https://example.com/fire-joker.jpg' },
  ];

  const filteredSlots = slots.filter(slot =>
    slot.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedProvider === 'All' || slot.provider === selectedProvider)
  );

  return (
    <section id="slots" className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Slot Machines</h2>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
            <Input
              type="text"
              placeholder="Search slots..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {slotProviders.map((provider) => (
              <Button
                key={provider}
                variant={selectedProvider === provider ? "default" : "outline"}
                onClick={() => setSelectedProvider(provider)}
              >
                {provider}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredSlots.map((slot, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedSlot(slot)}
            >
              <img src={slot.image} alt={slot.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-center truncate">{slot.name}</h3>
                <p className="text-sm text-gray-500 text-center mt-1">{slot.provider}</p>
                <Button className="w-full mt-2" size="sm" onClick={() => setSelectedSlot(slot)}>Play Now</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedSlot && (
        <SlotMachine
          slot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
        />
      )}
    </section>
  );
};

export default SlotMachineSection;
