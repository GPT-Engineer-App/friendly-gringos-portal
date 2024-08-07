import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useSupabaseAuth } from '@/integrations/supabase/auth';

const MainBanner = ({ onPlayNow, featuredSlot }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useSupabaseAuth();
  
  const slides = [
    {
      title: "Welcome to Matrix Slots",
      subtitle: user ? `Welcome back, ${user.user_metadata.name || user.email}!` : "Sign up now and get a welcome bonus!",
      image: "/images/main-banner.jpg"
    },
    {
      title: featuredSlot ? `Featured Game: ${featuredSlot.name}` : "Huge Jackpots Await",
      subtitle: featuredSlot ? `Try our popular ${featuredSlot.theme} themed slot!` : "Win life-changing prizes!",
      image: featuredSlot?.image || "/images/jackpots-banner.jpg"
    },
    {
      title: "New Games Added Weekly",
      subtitle: "Experience the latest in slot technology!",
      image: "/images/new-games-banner.jpg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[300px] md:h-[400px] overflow-hidden">
      <AnimatePresence mode="wait">
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center flex items-center"
          style={{ backgroundImage: `url(${slide.image})` }}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: index === currentSlide ? 1 : 0, x: index === currentSlide ? 0 : 300 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container mx-auto text-center relative z-10 text-white px-4">
            <motion.h1
              className="text-3xl md:text-5xl font-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {slide.title}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {slide.subtitle}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button size="lg" className="bg-green-500 hover:bg-green-600" onClick={onPlayNow}>
                {user ? 'Play Now' : 'Sign Up'}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      ))}
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default MainBanner;
