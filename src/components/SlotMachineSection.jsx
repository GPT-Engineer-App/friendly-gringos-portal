import React, { useState, useEffect, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase';
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const SlotMachineSection = ({ onSelectSlot, featuredSlots }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const slotsPerPage = 12;

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching slots...');
      const { data, error } = await supabase
        .from('slots')
        .select('*')
        .order('popularity', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        console.error('Error details:', error.message, error.details, error.hint);
        throw error;
      }

      console.log('Raw response:', data);

      if (!data) {
        console.error('No data returned from Supabase');
        throw new Error('No data returned from the server');
      }

      console.log('Data type:', typeof data);
      console.log('Data structure:', JSON.stringify(data, null, 2));

      if (data.length === 0) {
        console.warn('No slots data available');
        setSlots([]);
        toast.warning('No slots available at the moment.');
      } else {
        console.log('Fetched slots:', data);
        setSlots(data);
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
      setError('Failed to load slots. Please try again.');
      toast.error('Failed to load slots. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleRetry = () => {
    fetchSlots();
  };

  const filteredSlots = useMemo(() => {
    return slots.filter(slot =>
      slot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slot.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slot.theme.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [slots, searchTerm]);

  const paginatedSlots = useMemo(() => {
    const startIndex = (currentPage - 1) * slotsPerPage;
    return filteredSlots.slice(startIndex, startIndex + slotsPerPage);
  }, [filteredSlots, currentPage]);

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
            {loading ? (
              <div className="text-center text-white">Loading slots...</div>
            ) : error ? (
              <div className="text-center text-white">
                <p>{error}</p>
                <Button onClick={handleRetry} className="mt-4">
                  Retry
                </Button>
              </div>
            ) : slots.length === 0 ? (
              <div className="text-center text-white">
                <p>No slots available at the moment.</p>
                <Button onClick={handleRetry} className="mt-4">
                  Refresh
                </Button>
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
