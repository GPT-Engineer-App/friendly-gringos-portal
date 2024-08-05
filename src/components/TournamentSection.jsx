import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase';
import { useSupabaseAuth } from '@/integrations/supabase/auth';
import { toast } from "sonner";

const TournamentSection = () => {
  const [tournaments, setTournaments] = useState([]);
  const { user } = useSupabaseAuth();

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    const { data, error } = await supabase
      .from('tournaments')
      .select('*')
      .order('start_date', { ascending: true });

    if (error) {
      console.error('Error fetching tournaments:', error);
    } else {
      setTournaments(data);
    }
  };

  const joinTournament = async (tournamentId) => {
    if (!user) {
      toast.error('Please log in to join tournaments');
      return;
    }

    const { data, error } = await supabase
      .from('tournament_participants')
      .insert({ user_id: user.id, tournament_id: tournamentId });

    if (error) {
      toast.error('Failed to join tournament');
    } else {
      toast.success('Successfully joined the tournament');
      fetchTournaments(); // Refresh the tournament list
    }
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Upcoming Tournaments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => (
            <Card key={tournament.id}>
              <CardHeader>
                <CardTitle>{tournament.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Start Date:</strong> {new Date(tournament.start_date).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(tournament.end_date).toLocaleDateString()}</p>
                <p><strong>Prize Pool:</strong> {tournament.prize_pool} coins</p>
                <p><strong>Entry Fee:</strong> {tournament.entry_fee} coins</p>
                <Button 
                  onClick={() => joinTournament(tournament.id)} 
                  className="mt-4 w-full"
                >
                  Join Tournament
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TournamentSection;
