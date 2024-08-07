import React, { useState, Suspense, lazy } from 'react';
import Header from '../components/Header';
import MainBanner from '../components/MainBanner';
import Footer from '../components/Footer';
import SlotMachine from '../components/SlotMachine';
import { useSupabaseAuth } from '@/integrations/supabase/auth';
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from '../components/LoadingSpinner';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase';

const JackpotSection = lazy(() => import('../components/JackpotSection'));
const SlotMachineSection = lazy(() => import('../components/SlotMachineSection'));
const VIPSection = lazy(() => import('../components/VIPSection'));
const TournamentSection = lazy(() => import('../components/TournamentSection'));
const PromotionsSection = lazy(() => import('../components/PromotionsSection'));
const NewsSection = lazy(() => import('../components/NewsSection'));
const LeaderboardSection = lazy(() => import('../components/LeaderboardSection'));
const LiveChatWidget = lazy(() => import('../components/LiveChatWidget'));

const Index = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { user } = useSupabaseAuth();

  const fetchFeaturedSlots = async () => {
    const { data, error } = await supabase
      .from('slots')
      .select('*')
      .order('popularity', { ascending: false })
      .limit(5);

    if (error) throw error;
    return data;
  };

  const { data: featuredSlots, isLoading, isError } = useQuery({
    queryKey: ['featuredSlots'],
    queryFn: fetchFeaturedSlots,
    retry: 3,
    onError: (error) => {
      console.error('Error fetching featured slots:', error);
      toast.error('Failed to load featured slots. Please try again later.');
    },
  });

  const handlePlayNow = () => {
    if (!user) {
      toast.error("Please log in to play");
      return;
    }
    if (featuredSlots && featuredSlots.length > 0) {
      setSelectedSlot(featuredSlots[0]);
    } else {
      toast.error("No slots available at the moment");
    }
  };

  const handleSelectSlot = (slot) => {
    if (!user) {
      toast.error("Please log in to play");
      return;
    }
    setSelectedSlot(slot);
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
          <MainBanner onPlayNow={handlePlayNow} featuredSlot={featuredSlots && featuredSlots[0]} />
          <JackpotSection />
          <Tabs defaultValue="slots" className="w-full mt-8">
            <TabsList className="w-full justify-center">
              <TabsTrigger value="slots">Slots</TabsTrigger>
              <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
              <TabsTrigger value="promotions">Promotions</TabsTrigger>
              <TabsTrigger value="vip">VIP</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>
            <TabsContent value="slots">
              <SlotMachineSection onSelectSlot={handleSelectSlot} featuredSlots={featuredSlots || []} />
            </TabsContent>
            <TabsContent value="tournaments">
              <TournamentSection />
            </TabsContent>
            <TabsContent value="promotions">
              <PromotionsSection />
            </TabsContent>
            <TabsContent value="vip">
              <VIPSection />
            </TabsContent>
            <TabsContent value="news">
              <NewsSection />
            </TabsContent>
            <TabsContent value="leaderboard">
              <LeaderboardSection />
            </TabsContent>
          </Tabs>
        </Suspense>
      </main>
      <Footer />
      <AnimatePresence>
        {selectedSlot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <SlotMachine
              slot={selectedSlot}
              onClose={() => setSelectedSlot(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Suspense fallback={null}>
        <LiveChatWidget />
      </Suspense>
      <Button
        className="fixed bottom-4 right-4 z-40"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑ Top
      </Button>
    </motion.div>
  );
};

export default Index;
