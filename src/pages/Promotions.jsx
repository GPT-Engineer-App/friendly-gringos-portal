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
          <h1 className="text-3xl font-bold text-center absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50">Our Promotions</h1>
        </div>
        <PromotionsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Promotions;
