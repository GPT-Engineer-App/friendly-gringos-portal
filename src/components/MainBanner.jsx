import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useSupabaseAuth } from '@/integrations/supabase/auth';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MainBanner = ({ onPlayNow, featuredSlot, isLoading }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useSupabaseAuth();
  
  const slides = [
    {
      title: "Welcome to Matrix Slots",
      subtitle: user ? `Welcome back, ${user.user_metadata?.name || user.email}!` : "Sign up now and get a welcome bonus!",
      image: placeholderImages.mainBanner
    },
    {
      title: isLoading ? "Loading..." : (featuredSlot ? `Featured Game: ${featuredSlot.name}` : "Exciting Slots Await"),
      subtitle: isLoading ? "Please wait..." : (featuredSlot ? `Try our popular ${featuredSlot.theme} themed slot!` : "Discover a world of thrilling games!"),
      image: isLoading ? placeholderImages.slotsBanner : (featuredSlot?.image || placeholderImages.slotsBanner)
    },
    {
      title: "New Games Added Weekly",
      subtitle: "Experience the latest in slot technology!",
      image: placeholderImages.newGamesBanner
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
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
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {slide.title}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8"
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
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-xl py-6 px-8" onClick={onPlayNow}>
                {user ? 'Play Now' : 'Sign Up'}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      ))}
      </AnimatePresence>
      <Button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default MainBanner;
