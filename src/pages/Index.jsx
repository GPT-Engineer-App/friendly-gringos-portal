import React, { useState } from 'react';
import Header from '../components/Header';
import MainBanner from '../components/MainBanner';
import JackpotSection from '../components/JackpotSection';
import SlotMachineSection from '../components/SlotMachineSection';
import VIPSection from '../components/VIPSection';
import TournamentSection from '../components/TournamentSection';
import Footer from '../components/Footer';
import SlotMachine from '../components/SlotMachine';

const Index = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handlePlayNow = () => {
    // Select a default slot or the first available slot
    const defaultSlot = {
      id: 'default',
      name: 'Default Slot',
      rtp: 96,
      min_bet: 1,
      max_bet: 100
    };
    setSelectedSlot(defaultSlot);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <MainBanner onPlayNow={handlePlayNow} />
        <JackpotSection />
        <SlotMachineSection onSelectSlot={setSelectedSlot} />
        <TournamentSection />
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
