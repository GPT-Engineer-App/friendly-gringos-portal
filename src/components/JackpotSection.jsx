import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const JackpotSection = () => {
  const jackpots = [
    { name: 'Mega Moolah', amount: 5000000 },
    { name: 'Jackpot Giant', amount: 3500000 },
    { name: 'Age of the Gods', amount: 2000000 },
    { name: 'Beach Life', amount: 1500000 },
  ];

  return (
    <section className="py-12 bg-gray-800 text-white" style={{backgroundImage: 'url("/images/jackpot-background.jpg")', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="container mx-auto relative z-10">
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <h2 className="text-3xl font-bold text-center mb-8">Current Jackpots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jackpots.map((jackpot, index) => (
            <Card key={index} className="bg-gray-700 border-none">
              <CardHeader>
                <CardTitle className="text-center text-xl">{jackpot.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-3xl font-bold text-green-400">
                  ${jackpot.amount.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JackpotSection;
