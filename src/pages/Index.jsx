import React, { useState, useEffect, Suspense } from 'react';
import Header from '../components/Header';
import MainBanner from '../components/MainBanner';
import JackpotSection from '../components/JackpotSection';
import SlotMachineSection from '../components/SlotMachineSection';
import VIPSection from '../components/VIPSection';
import TournamentSection from '../components/TournamentSection';
import PromotionsSection from '../components/PromotionsSection';
import Footer from '../components/Footer';
import SlotMachine from '../components/SlotMachine';
import NewsSection from '../components/NewsSection';
import LeaderboardSection from '../components/LeaderboardSection';
import { supabase } from '@/integrations/supabase';
import { useSupabaseAuth } from '@/integrations/supabase/auth';
import { toast } from "sonner";
import { motion } from "framer-motion";
import LoadingSpinner from '../components/LoadingSpinner';

const Index = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [featuredSlots, setFeaturedSlots] = useState([]);
  const { user } = useSupabaseAuth();

  useEffect(() => {
    fetchFeaturedSlots();
  }, []);

  const fetchFeaturedSlots = async () => {
    try {
      const { data, error } = await supabase
        .from('slots')
        .select('*')
        .order('popularity', { ascending: false })
        .limit(5);

      if (error) {
        throw error;
      }

      setFeaturedSlots(data || []);
    } catch (error) {
      console.error('Error fetching featured slots:', error);
      toast.error('Failed to load featured slots. Please try again later.');
    }
  };

  const handlePlayNow = () => {
    if (!user) {
      toast.error("Please log in to play");
      return;
    }
    if (featuredSlots.length > 0) {
      setSelectedSlot(featuredSlots[0]);
    } else {
      toast.error("No slots available at the moment");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen bg-gray-900 text-white"
    >
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <MainBanner onPlayNow={handlePlayNow} featuredSlot={featuredSlots[0]} />
          <JackpotSection />
          <SlotMachineSection onSelectSlot={setSelectedSlot} featuredSlots={featuredSlots} />
          <TournamentSection />
          <PromotionsSection />
          <VIPSection />
          <NewsSection />
          <LeaderboardSection />
        </Suspense>
      </main>
      <Footer />
      {selectedSlot && (
        <SlotMachine
          slot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
        />
      )}
    </motion.div>
  );
};

export default Index;
