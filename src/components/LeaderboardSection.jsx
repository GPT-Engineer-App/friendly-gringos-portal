import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from '@/integrations/supabase';

const LeaderboardSection = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching leaderboard:', error);
    } else {
      setLeaderboard(data);
    }
  };

  return (
    <section className="py-12 bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Top Players</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Rank</TableHead>
              <TableHead className="text-white">Player</TableHead>
              <TableHead className="text-white">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((player, index) => (
              <TableRow key={player.id}>
                <TableCell className="text-white">{index + 1}</TableCell>
                <TableCell className="text-white">{player.username}</TableCell>
                <TableCell className="text-white">{player.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default LeaderboardSection;
