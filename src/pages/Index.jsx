import React from 'react';
import Header from '../components/Header';
import MainBanner from '../components/MainBanner';
import JackpotSection from '../components/JackpotSection';
import SlotMachineSection from '../components/SlotMachineSection';
import LiveCasinoSection from '../components/LiveCasinoSection';
import VIPSection from '../components/VIPSection';
import TournamentSection from '../components/TournamentSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <MainBanner />
        <JackpotSection />
        <SlotMachineSection />
        <TournamentSection />
        <LiveCasinoSection />
        <VIPSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
