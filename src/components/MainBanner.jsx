import React from 'react';
import { Button } from "@/components/ui/button";

const MainBanner = () => {
  return (
    <section className="relative h-[500px] bg-cover bg-center flex items-center" style={{backgroundImage: 'url("/placeholder.svg")'}}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto text-center relative z-10 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Matrix Casino</h1>
        <p className="text-xl mb-8">Experience the thrill of our virtual casino!</p>
        <Button size="lg" className="bg-green-500 hover:bg-green-600">Play Now</Button>
      </div>
    </section>
  );
};

export default MainBanner;
