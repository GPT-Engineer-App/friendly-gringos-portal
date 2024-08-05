import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import SlotMachine from './SlotMachine';
import { supabase } from '@/integrations/supabase';

const SlotMachineSection = ({ onSelectSlot }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    const { data, error } = await supabase
      .from('slots')
      .select('*')
      .order('popularity', { ascending: false });

    if (error) {
      console.error('Error fetching slots:', error);
    } else {
      setSlots(data);
    }
    setLoading(false);
  };

  const filteredSlots = slots.filter(slot =>
    slot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slot.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slot.theme.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="slots" className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">Popular Slots</h2>
        <div className="relative mb-8">
          <Input
            type="text"
            placeholder="Search slots, providers, or themes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full bg-gray-800 text-white border-gray-700"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        {loading ? (
          <div className="text-center text-white">Loading slots...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredSlots.map((slot) => (
              <TooltipProvider key={slot.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div 
                      className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group transform hover:scale-105"
                      onClick={() => onSelectSlot(slot)}
                    >
                      <div className="relative">
                        <img src={slot.image} alt={slot.name} className="w-full h-40 object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={(e) => { e.stopPropagation(); onSelectSlot(slot); }}>Play Now</Button>
                        </div>
                        <Badge className="absolute top-2 right-2 bg-blue-500">{slot.rtp}% RTP</Badge>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-white text-sm truncate">{slot.name}</h3>
                        <p className="text-gray-400 text-xs">{slot.provider}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-400 text-xs mr-1">★</span>
                          <span className="text-gray-300 text-xs">{slot.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Theme: {slot.theme}</p>
                    <p>Volatility: {slot.volatility}</p>
                    <p>Min Bet: ${slot.min_bet}</p>
                    <p>Max Bet: ${slot.max_bet}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SlotMachineSection;
