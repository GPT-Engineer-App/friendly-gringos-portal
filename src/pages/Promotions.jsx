import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PromotionsSection from '../components/PromotionsSection';

const Promotions = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="relative">
          <img src="/images/promotions-banner.jpg" alt="Promotions" className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-center text-white">Our Promotions</h1>
          </div>
        </div>
        <PromotionsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Promotions;
