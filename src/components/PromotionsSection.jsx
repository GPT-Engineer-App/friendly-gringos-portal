import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const PromotionsSection = () => {
  const promotions = [
    { title: 'Welcome Bonus', description: 'Get 100% bonus on your first deposit' },
    { title: 'Free Spins', description: '50 free spins on selected slots' },
    { title: 'Cashback', description: '10% cashback on your losses' },
    { title: 'Reload Bonus', description: '50% bonus on your weekend deposits' },
  ];

  return (
    <section id="promotions" className="py-12 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Promotions</h2>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {promotions.map((promo, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card>
                  <CardHeader>
                    <CardTitle>{promo.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{promo.description}</CardDescription>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default PromotionsSection;