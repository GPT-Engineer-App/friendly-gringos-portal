import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SlotMachine from './SlotMachine';

const SlotMachineSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);

  const slots = [
    { name: 'Cosmic Spin', theme: 'space', image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-ct6DYdHBdpbG6s5cIJ3TGKNP/user-nUCao1VfJu8jHUdtqLgTHGvk/img-Wd0Ow0Ov3Eo9Nh3Gu4Tz6Ixd.png?st=2024-03-19T14%3A39%3A13Z&se=2024-03-19T16%3A39%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-19T15%3A39%3A13Z&ske=2024-03-20T15%3A39%3A13Z&sks=b&skv=2021-08-06&sig=Aq%2BXrVmLMHNQXVZRPXCGGXGOZHXGFXLXXXXXXXXXXXX%3D' },
    { name: 'Treasure Hunt', theme: 'adventure', image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-ct6DYdHBdpbG6s5cIJ3TGKNP/user-nUCao1VfJu8jHUdtqLgTHGvk/img-Wd0Ow0Ov3Eo9Nh3Gu4Tz6Ixd.png?st=2024-03-19T14%3A39%3A13Z&se=2024-03-19T16%3A39%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-19T15%3A39%3A13Z&ske=2024-03-20T15%3A39%3A13Z&sks=b&skv=2021-08-06&sig=Aq%2BXrVmLMHNQXVZRPXCGGXGOZHXGFXLXXXXXXXXXXXX%3D' },
    { name: 'Mystic Forest', theme: 'nature', image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-ct6DYdHBdpbG6s5cIJ3TGKNP/user-nUCao1VfJu8jHUdtqLgTHGvk/img-Wd0Ow0Ov3Eo9Nh3Gu4Tz6Ixd.png?st=2024-03-19T14%3A39%3A13Z&se=2024-03-19T16%3A39%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-19T15%3A39%3A13Z&ske=2024-03-20T15%3A39%3A13Z&sks=b&skv=2021-08-06&sig=Aq%2BXrVmLMHNQXVZRPXCGGXGOZHXGFXLXXXXXXXXXXXX%3D' },
    { name: 'Neon Nights', theme: 'cyberpunk', image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-ct6DYdHBdpbG6s5cIJ3TGKNP/user-nUCao1VfJu8jHUdtqLgTHGvk/img-Wd0Ow0Ov3Eo9Nh3Gu4Tz6Ixd.png?st=2024-03-19T14%3A39%3A13Z&se=2024-03-19T16%3A39%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-19T15%3A39%3A13Z&ske=2024-03-20T15%3A39%3A13Z&sks=b&skv=2021-08-06&sig=Aq%2BXrVmLMHNQXVZRPXCGGXGOZHXGFXLXXXXXXXXXXXX%3D' },
    { name: 'Ancient Wonders', theme: 'history', image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-ct6DYdHBdpbG6s5cIJ3TGKNP/user-nUCao1VfJu8jHUdtqLgTHGvk/img-Wd0Ow0Ov3Eo9Nh3Gu4Tz6Ixd.png?st=2024-03-19T14%3A39%3A13Z&se=2024-03-19T16%3A39%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-19T15%3A39%3A13Z&ske=2024-03-20T15%3A39%3A13Z&sks=b&skv=2021-08-06&sig=Aq%2BXrVmLMHNQXVZRPXCGGXGOZHXGFXLXXXXXXXXXXXX%3D' },
    { name: 'Fruit Frenzy', theme: 'food', image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-ct6DYdHBdpbG6s5cIJ3TGKNP/user-nUCao1VfJu8jHUdtqLgTHGvk/img-Wd0Ow0Ov3Eo9Nh3Gu4Tz6Ixd.png?st=2024-03-19T14%3A39%3A13Z&se=2024-03-19T16%3A39%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-19T15%3A39%3A13Z&ske=2024-03-20T15%3A39%3A13Z&sks=b&skv=2021-08-06&sig=Aq%2BXrVmLMHNQXVZRPXCGGXGOZHXGFXLXXXXXXXXXXXX%3D' },
    { name: 'Ocean Treasures', theme: 'underwater', image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-ct6DYdHBdpbG6s5cIJ3TGKNP/user-nUCao1VfJu8jHUdtqLgTHGvk/img-Wd0Ow0Ov3Eo9Nh3Gu4Tz6Ixd.png?st=2024-03-19T14%3A39%3A13Z&se=2024-03-19T16%3A39%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-19T15%3A39%3A13Z&ske=2024-03-20T15%3A39%3A13Z&sks=b&skv=2021-08-06&sig=Aq%2BXrVmLMHNQXVZRPXCGGXGOZHXGFXLXXXXXXXXXXXX%3D' },
    { name: 'Wild West', theme: 'western', image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-ct6DYdHBdpbG6s5cIJ3TGKNP/user-nUCao1VfJu8jHUdtqLgTHGvk/img-Wd0Ow0Ov3Eo9Nh3Gu4Tz6Ixd.png?st=2024-03-19T14%3A39%3A13Z&se=2024-03-19T16%3A39%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-19T15%3A39%3A13Z&ske=2024-03-20T15%3A39%3A13Z&sks=b&skv=2021-08-06&sig=Aq%2BXrVmLMHNQXVZRPXCGGXGOZHXGFXLXXXXXXXXXXXX%3D' },
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
