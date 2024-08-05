import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const PromotionsSection = () => {
  const promotions = [
    { title: 'Welcome Bonus', description: 'Get 100% bonus on your first deposit', image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-ct6DYdHBdpbG6s5cIJ3TGKNP/user-nUCao1VfJu8jHUdtqLgTHGvk/img-Wd0Ow0Ov3Eo9Nh3Gu4Tz6Ixd.png?st=2024-03-19T14%3A39%3A13Z&se=2024-03-19T16%3A39%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-19T15%3A39%3A13Z&ske=2024-03-20T15%3A39%3A13Z&sks=b&skv=2021-08-06&sig=Aq%2BXrVmLMHNQXVZRPXCGGXGOZHXGFXLXXXXXXXXXXXX%3D' },
    { title: 'Free Spins', description: '50 free spins on selected slots', image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-ct6DYdHBdpbG6s5cIJ3TGKNP/user-nUCao1VfJu8jHUdtqLgTHGvk/img-Wd0Ow0Ov3Eo9Nh3Gu4Tz6Ixd.png?st=2024-03-19T14%3A39%3A13Z&se=2024-03-19T16%3A39%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-19T15%3A39%3A13Z&ske=2024-03-20T15%3A39%3A13Z&sks=b&skv=2021-08-06&sig=Aq%2BXrVmLMHNQXVZRPXCGGXGOZHXGFXLXXXXXXXXXXXX%3D' },
    { title: 'Cashback', description: '10% cashback on your losses', image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-ct6DYdHBdpbG6s5cIJ3TGKNP/user-nUCao1VfJu8jHUdtqLgTHGvk/img-Wd0Ow0Ov3Eo9Nh3Gu4Tz6Ixd.png?st=2024-03-19T14%3A39%3A13Z&se=2024-03-19T16%3A39%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-19T15%3A39%3A13Z&ske=2024-03-20T15%3A39%3A13Z&sks=b&skv=2021-08-06&sig=Aq%2BXrVmLMHNQXVZRPXCGGXGOZHXGFXLXXXXXXXXXXXX%3D' },
    { title: 'Reload Bonus', description: '50% bonus on your weekend deposits', image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-ct6DYdHBdpbG6s5cIJ3TGKNP/user-nUCao1VfJu8jHUdtqLgTHGvk/img-Wd0Ow0Ov3Eo9Nh3Gu4Tz6Ixd.png?st=2024-03-19T14%3A39%3A13Z&se=2024-03-19T16%3A39%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-19T15%3A39%3A13Z&ske=2024-03-20T15%3A39%3A13Z&sks=b&skv=2021-08-06&sig=Aq%2BXrVmLMHNQXVZRPXCGGXGOZHXGFXLXXXXXXXXXXXX%3D' },
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
                  <img src={promo.image} alt={promo.title} className="w-full h-40 object-cover rounded-t-lg" />
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
