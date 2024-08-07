import React, { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase';
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const SlotMachineSection = ({ onSelectSlot, featuredSlots }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const slotsPerPage = 12;

  const [slots, setSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlots = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('slots')
          .select('*')
          .order('popularity', { ascending: false });

        if (error) throw error;

        console.log('Slots fetched:', data);
        setSlots(data || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching slots:', error);
        setIsError(true);
        setError(error);
        setIsLoading(false);
        toast.error('Failed to load slots. Please try again.');
      }
    };

    fetchSlots();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    fetchSlots();
  };

  useEffect(() => {
    if (slots) {
      console.log('Slots data in component:', slots);
    }
  }, [slots]);

  const generateAndStoreImage = async (slot) => {
    console.log('Generating image for slot:', slot.name);
    try {
      const response = await fetch("https://gptengineer.com/api/image-generation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: `A slot machine themed ${slot.theme}` })
      });

      const data = await response.json();

      if (data.status === 'success') {
        const imageUrl = data.imageUrl;

        // Store in database
        const { error } = await supabase
          .from('slots')
          .update({ image: imageUrl })
          .eq('id', slot.id);

        if (error) {
          console.error('Error updating slot image:', error);
          throw error;
        }

        console.log(`Generated image for ${slot.name}`);
        toast.success(`Generated image for ${slot.name}`);
      } else {
        console.error('Error generating image:', data);
        toast.error(`Failed to generate image for ${slot.name}`);
      }
    } catch (error) {
      console.error('Error in image generation process:', error);
      toast.error(`Error in image generation process for ${slot.name}`);
    }
  };

  useEffect(() => {
    if (isError) {
      console.error('Error fetching slots:', error);
      toast.error('Failed to load slots. Please try again.');
    }
  }, [isError, error]);

  const handleRetrySlots = () => {
    console.log('Retrying slot fetch...');
    refetch();
    toast.info('Retrying to load slots...');
  };

  const filteredSlots = slots?.filter(slot =>
    slot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slot.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slot.theme.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const paginatedSlots = filteredSlots.slice(
    (currentPage - 1) * slotsPerPage,
    currentPage * slotsPerPage
  );

  const totalPages = Math.ceil(filteredSlots.length / slotsPerPage);

  const renderSlotGrid = (slotList) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <AnimatePresence>
        {slotList.map((slot) => (
          <motion.div
            key={slot.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <TooltipProvider>
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
                        <span className="text-gray-300 text-xs">{slot.rating?.toFixed(1) || 'N/A'}</span>
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
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  return (
    <section id="slots" className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">Our Slots</h2>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="featured">Featured Slots</TabsTrigger>
            <TabsTrigger value="all">All Slots</TabsTrigger>
          </TabsList>
          <TabsContent value="featured">
            {renderSlotGrid(featuredSlots)}
          </TabsContent>
          <TabsContent value="all">
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
            {isLoading ? (
              <div className="text-center text-white">Loading slots...</div>
            ) : isError ? (
              <div className="text-center text-white">
                <p>Failed to load slots. Please try again.</p>
                <p className="text-sm text-red-400 mt-2">Error: {error.message}</p>
                <Button onClick={handleRetrySlots} className="mt-4">
                  Retry
                </Button>
              </div>
            ) : !slots || slots.length === 0 ? (
              <div className="text-center text-white">
                <p>No slots available at the moment. Please check back later.</p>
              </div>
            ) : filteredSlots.length === 0 ? (
              <div className="text-center text-white">
                <p>No slots available matching your search.</p>
              </div>
            ) : (
              <>
                {renderSlotGrid(paginatedSlots)}
                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="mr-2"
                  >
                    Previous
                  </Button>
                  <span className="mx-4 text-white">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="ml-2"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default SlotMachineSection;
