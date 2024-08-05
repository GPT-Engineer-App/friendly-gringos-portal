import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GameStats = ({ gameHistory }) => {
  const balanceData = gameHistory.map((game, index) => ({
    spin: index + 1,
    balance: game.balance_after,
  }));

  const winRate = gameHistory.filter(game => game.result.includes('win')).length / gameHistory.length * 100;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Game Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-lg font-semibold">Win Rate: {winRate.toFixed(2)}%</p>
          <p className="text-sm text-gray-500">Based on your last {gameHistory.length} spins</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={balanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="spin" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="balance" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameStats;
