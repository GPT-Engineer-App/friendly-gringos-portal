import React from 'react';
import { Button } from "@/components/ui/button";

const MainBanner = () => {
  return (
    <section className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center" style={{backgroundImage: 'url("https://oaidalleapiprodscus.blob.core.windows.net/private/org-ct6DYdHBdpbG6s5cIJ3TGKNP/user-nUCao1VfJu8jHUdtqLgTHGvk/img-Wd0Ow0Ov3Eo9Nh3Gu4Tz6Ixd.png?st=2024-03-19T14%3A39%3A13Z&se=2024-03-19T16%3A39%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-19T15%3A39%3A13Z&ske=2024-03-20T15%3A39%3A13Z&sks=b&skv=2021-08-06&sig=Aq%2BXrVmLMHNQXVZRPXCGGXGOZHXGFXLXXXXXXXXXXXX%3D")'}}>
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
