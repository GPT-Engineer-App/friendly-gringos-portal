import React from 'react';
import Header from '../components/Header';
import MainBanner from '../components/MainBanner';
import GameSection from '../components/GameSection';
import PromotionsSection from '../components/PromotionsSection';
import VIPSection from '../components/VIPSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <MainBanner />
        <GameSection />
        <PromotionsSection />
        <VIPSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;