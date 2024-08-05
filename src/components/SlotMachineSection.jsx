import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SlotMachine from './SlotMachine';

const SlotMachineSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);

  const slots = [
    { name: 'Cosmic Spin', theme: 'space', colors: ['#1E3A8A', '#3B82F6', '#93C5FD'] },
    { name: 'Treasure Hunt', theme: 'adventure', colors: ['#92400E', '#F59E0B', '#FDE68A'] },
    { name: 'Mystic Forest', theme: 'nature', colors: ['#064E3B', '#10B981', '#A7F3D0'] },
    { name: 'Neon Nights', theme: 'cyberpunk', colors: ['#4C1D95', '#8B5CF6', '#DDD6FE'] },
    { name: 'Ancient Wonders', theme: 'history', colors: ['#78350F', '#D97706', '#FDE68A'] },
    { name: 'Fruit Frenzy', theme: 'food', colors: ['#DC2626', '#FBBF24', '#34D399'] },
    { name: 'Ocean Treasures', theme: 'underwater', colors: ['#1E40AF', '#3B82F6', '#BFDBFE'] },
    { name: 'Wild West', theme: 'western', colors: ['#92400E', '#F59E0B', '#FDE68A'] },
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
              <div className="w-full h-32 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect width="100" height="100" fill={slot.colors[0]} />
                  <circle cx="50" cy="50" r="30" fill={slot.colors[1]} />
                  <path d="M50 20 L80 80 L20 80 Z" fill={slot.colors[2]} />
                </svg>
              </div>
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
