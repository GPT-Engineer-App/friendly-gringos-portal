import React from 'react';
import { Button } from "@/components/ui/button";

const MainBanner = () => {
  return (
    <section className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center" style={{backgroundImage: 'url("/placeholder.svg")'}}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto text-center relative z-10 text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Matrix Slots</h1>
        <p className="text-lg md:text-xl mb-6">Spin to win on your mobile!</p>
        <Button size="lg" className="bg-green-500 hover:bg-green-600">Play Now</Button>
      </div>
    </section>
  );
};

export default MainBanner;
