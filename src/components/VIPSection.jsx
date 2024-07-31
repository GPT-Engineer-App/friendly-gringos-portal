import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VIPSection = () => {
  const vipBenefits = [
    { title: 'Exclusive Bonuses', description: 'Get access to special VIP-only bonuses' },
    { title: 'Personal Account Manager', description: 'Dedicated support from your own account manager' },
    { title: 'Higher Limits', description: 'Enjoy higher deposit and withdrawal limits' },
    { title: 'Faster Withdrawals', description: 'Get your winnings faster with priority processing' },
  ];

  return (
    <section id="vip" className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">VIP Program</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vipBenefits.map((benefit, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VIPSection;