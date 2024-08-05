import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const VIPSection = () => {
  const vipLevels = [
    { level: 'Bronze', progress: 20, benefits: ['5% Cashback', 'Weekly Bonus'] },
    { level: 'Silver', progress: 40, benefits: ['10% Cashback', 'Daily Bonus', 'Personal Account Manager'] },
    { level: 'Gold', progress: 60, benefits: ['15% Cashback', 'Higher Limits', 'Exclusive Events'] },
    { level: 'Platinum', progress: 80, benefits: ['20% Cashback', 'VIP Support', 'Custom Bonuses'] },
  ];

  return (
    <section id="vip" className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">VIP Program</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vipLevels.map((level, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-center">{level.level}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <Progress value={level.progress} className="mb-4" />
                <ul className="list-disc pl-5 mb-4">
                  {level.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-4 mt-auto">
                <Button className="w-full">Upgrade to {level.level}</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VIPSection;
