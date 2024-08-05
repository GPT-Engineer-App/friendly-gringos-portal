import React, { useEffect } from 'react';
import Header from '../components/Header';
import MainBanner from '../components/MainBanner';
import SlotMachineSection from '../components/SlotMachineSection';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    console.log('Index component mounted');
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <MainBanner />
        <SlotMachineSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
