import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SlotMachine from './SlotMachine';

const SlotMachineSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);

  const slots = [
    { name: 'Book of Dead', theme: 'ancient', image: '/images/slots/book-of-dead.jpg', provider: 'Play\'n GO' },
    { name: 'Starburst', theme: 'space', image: '/images/slots/starburst.jpg', provider: 'NetEnt' },
    { name: 'Gonzo\'s Quest', theme: 'adventure', image: '/images/slots/gonzos-quest.jpg', provider: 'NetEnt' },
    { name: 'Mega Moolah', theme: 'safari', image: '/images/slots/mega-moolah.jpg', provider: 'Microgaming' },
    { name: 'Reactoonz', theme: 'alien', image: '/images/slots/reactoonz.jpg', provider: 'Play\'n GO' },
    { name: 'Dead or Alive 2', theme: 'western', image: '/images/slots/dead-or-alive-2.jpg', provider: 'NetEnt' },
    { name: 'Sweet Bonanza', theme: 'candy', image: '/images/slots/sweet-bonanza.jpg', provider: 'Pragmatic Play' },
    { name: 'Wolf Gold', theme: 'wildlife', image: '/images/slots/wolf-gold.jpg', provider: 'Pragmatic Play' },
    { name: 'Immortal Romance', theme: 'vampire', image: '/images/slots/immortal-romance.jpg', provider: 'Microgaming' },
    { name: 'Jammin\' Jars', theme: 'fruit', image: '/images/slots/jammin-jars.jpg', provider: 'Push Gaming' },
    { name: 'Bonanza', theme: 'mining', image: '/images/slots/bonanza.jpg', provider: 'Big Time Gaming' },
    { name: 'Fire Joker', theme: 'classic', image: '/images/slots/fire-joker.jpg', provider: 'Play\'n GO' },
  ];

  const filteredSlots = slots.filter(slot =>
    slot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slot.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="slots" className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">Popular Slots</h2>
        <div className="relative mb-8">
          <Input
            type="text"
            placeholder="Search slots or providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full bg-gray-800 text-white border-gray-700"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredSlots.map((slot, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group transform hover:scale-105"
              onClick={() => setSelectedSlot(slot)}
            >
              <div className="relative">
                <img src={slot.image} alt={slot.name} className="w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={() => setSelectedSlot(slot)}>Play Now</Button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-white text-sm truncate">{slot.name}</h3>
                <p className="text-gray-400 text-xs">{slot.provider}</p>
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
