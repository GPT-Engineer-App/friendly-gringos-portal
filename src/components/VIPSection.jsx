import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const VIPSection = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const vipLevels = [
    { level: 'Bronze', progress: 20, benefits: ['5% Cashback', 'Weekly Bonus'], pointsNeeded: 1000 },
    { level: 'Silver', progress: 40, benefits: ['10% Cashback', 'Daily Bonus', 'Personal Account Manager'], pointsNeeded: 5000 },
    { level: 'Gold', progress: 60, benefits: ['15% Cashback', 'Higher Limits', 'Exclusive Events'], pointsNeeded: 10000 },
    { level: 'Platinum', progress: 80, benefits: ['20% Cashback', 'VIP Support', 'Custom Bonuses'], pointsNeeded: 25000 },
  ];

  return (
    <section id="vip" className="py-12 bg-gray-100" style={{backgroundImage: 'url("/images/vip-background.jpg")', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="container mx-auto relative z-10">
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
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
                <p className="text-sm text-gray-600 mb-4">Points needed: {level.pointsNeeded}</p>
              </CardContent>
              <div className="p-4 mt-auto">
                <Button onClick={() => setSelectedLevel(level)} className="w-full">Learn More</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      {selectedLevel && (
        <Dialog open={!!selectedLevel} onOpenChange={() => setSelectedLevel(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedLevel.level} VIP Level</DialogTitle>
              <DialogDescription>
                Unlock exclusive benefits and rewards
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Benefits:</h4>
              <ul className="list-disc pl-5 mb-4">
                {selectedLevel.benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
              <p className="mb-4">Points needed to reach this level: {selectedLevel.pointsNeeded}</p>
              <Button className="w-full">Start Earning Points</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default VIPSection;
