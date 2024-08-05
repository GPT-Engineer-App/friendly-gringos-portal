import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const MainBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Welcome to Matrix Slots",
      subtitle: "Spin to win on your mobile!",
      image: "/images/main-banner.jpg"
    },
    {
      title: "Huge Jackpots Await",
      subtitle: "Win life-changing prizes!",
      image: "/images/jackpots-banner.jpg"
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
  }, []);

  return (
    <section className="relative h-[300px] md:h-[400px] overflow-hidden">
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center flex items-center"
          style={{ backgroundImage: `url(${slide.image})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentSlide ? 1 : 0 }}
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
              <Button size="lg" className="bg-green-500 hover:bg-green-600">
                Play Now
              </Button>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default MainBanner;
