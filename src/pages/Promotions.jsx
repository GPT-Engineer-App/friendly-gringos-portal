import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PromotionsSection from '../components/PromotionsSection';

const Promotions = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <h1 className="text-3xl font-bold text-center my-8">Our Promotions</h1>
        <PromotionsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Promotions;
