import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MainBanner from '../components/MainBanner';
import JackpotSection from '../components/JackpotSection';
import SlotMachineSection from '../components/SlotMachineSection';
import VIPSection from '../components/VIPSection';
import TournamentSection from '../components/TournamentSection';
import PromotionsSection from '../components/PromotionsSection';
import Footer from '../components/Footer';
import SlotMachine from '../components/SlotMachine';
import { supabase } from '@/integrations/supabase';
import { useSupabaseAuth } from '@/integrations/supabase/auth';
import { toast } from "sonner";

const Index = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [featuredSlots, setFeaturedSlots] = useState([]);
  const { user } = useSupabaseAuth();

  useEffect(() => {
    fetchFeaturedSlots();
  }, []);

  const fetchFeaturedSlots = async () => {
    const { data, error } = await supabase
      .from('slots')
      .select('*')
      .order('popularity', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching featured slots:', error);
    } else {
      setFeaturedSlots(data);
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
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow">
        <MainBanner onPlayNow={handlePlayNow} featuredSlot={featuredSlots[0]} />
        <JackpotSection />
        <SlotMachineSection onSelectSlot={setSelectedSlot} featuredSlots={featuredSlots} />
        <TournamentSection />
        <PromotionsSection />
        <VIPSection />
      </main>
      <Footer />
      {selectedSlot && (
        <SlotMachine
          slot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
        />
      )}
    </div>
  );
};

export default Index;
