import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SlotMachine from './SlotMachine';

const SlotMachineSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);

  const slots = [
    { name: 'Quantum Quandary', theme: 'science', image: '/images/slot-quantum.jpg', description: 'A slot machine with quantum physics symbols, swirling atoms, and mathematical equations as reel symbols.' },
    { name: 'Mythical Menagerie', theme: 'fantasy', image: '/images/slot-mythical.jpg', description: 'Features mythical creatures like dragons, unicorns, and phoenixes on a magical forest background.' },
    { name: 'Retro Reboot', theme: 'technology', image: '/images/slot-retro.jpg', description: 'Old-school computer parts and retro gaming icons on a circuit board backdrop.' },
    { name: 'Culinary Chaos', theme: 'food', image: '/images/slot-culinary.jpg', description: 'Whimsical kitchen utensils and ingredients flying around in a cartoon kitchen setting.' },
    { name: 'Cosmic Carnival', theme: 'space', image: '/images/slot-cosmic.jpg', description: 'Alien circus performers and bizarre space attractions on a colorful asteroid field.' },
    { name: 'Steampunk Spins', theme: 'steampunk', image: '/images/slot-steampunk.jpg', description: 'Brass gears, clockwork creatures, and Victorian-era inventors on a sepia-toned background.' },
    { name: 'Enchanted Emojis', theme: 'modern', image: '/images/slot-emojis.jpg', description: 'Popular emojis reimagined as magical creatures in a smartphone-shaped slot machine.' },
    { name: 'Jurassic Jackpot', theme: 'prehistoric', image: '/images/slot-jurassic.jpg', description: 'Various dinosaurs and prehistoric plants in a lush, primordial jungle setting.' },
  ];

  const filteredSlots = slots.filter(slot =>
    slot.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="slots" className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Our Slot Machines</h2>
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Search slots..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredSlots.map((slot, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedSlot(slot)}
            >
              <img src={slot.image} alt={slot.name} className="w-full h-32 object-cover rounded-t-lg" />
              <div className="p-2">
                <h3 className="font-semibold text-center text-sm truncate">{slot.name}</h3>
                <Button className="w-full mt-2" size="sm" onClick={() => setSelectedSlot(slot)}>Play</Button>
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
