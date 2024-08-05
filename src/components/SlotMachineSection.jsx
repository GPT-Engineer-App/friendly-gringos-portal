import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import SlotMachineModal from './SlotMachineModal';

const SlotMachineSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const slotCategories = ['All', 'Classic', 'Video', 'Progressive', 'Megaways'];
  const slots = [
    { name: 'Starburst', category: 'Video', image: 'https://example.com/starburst.jpg' },
    { name: 'Mega Moolah', category: 'Progressive', image: 'https://example.com/mega-moolah.jpg' },
    { name: 'Book of Dead', category: 'Video', image: 'https://example.com/book-of-dead.jpg' },
    { name: "Gonzo's Quest", category: 'Video', image: 'https://example.com/gonzos-quest.jpg' },
    { name: 'Fruit Fiesta', category: 'Classic', image: 'https://example.com/fruit-fiesta.jpg' },
    { name: 'Bonanza', category: 'Megaways', image: 'https://example.com/bonanza.jpg' },
  ];

  const filteredSlots = slots.filter(slot =>
    slot.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="slots" className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Slot Machines</h2>
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Search slots..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Tabs defaultValue="All">
          <TabsList className="flex justify-center mb-6">
            {slotCategories.map((category) => (
              <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
          </TabsList>
          {slotCategories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredSlots
                  .filter(slot => category === 'All' || slot.category === category)
                  .map((slot, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                      onClick={() => setSelectedSlot(slot)}
                    >
                      <img src={slot.image} alt={slot.name} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold text-center">{slot.name}</h3>
                        <p className="text-sm text-gray-500 text-center mt-1">{slot.category}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <SlotMachineModal 
        slot={selectedSlot} 
        isOpen={!!selectedSlot} 
        onClose={() => setSelectedSlot(null)} 
      />
    </section>
  );
};

export default SlotMachineSection;
