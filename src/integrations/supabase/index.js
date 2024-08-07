import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### slots

| name       | type   | format | required |
|------------|--------|--------|----------|
| id         | int8   | number | true     |
| name       | text   | string | true     |
| provider   | text   | string | true     |
| theme      | text   | string | true     |
| rtp        | float8 | number | true     |
| volatility | text   | string | true     |
| min_bet    | float8 | number | true     |
| max_bet    | float8 | number | true     |
| popularity | int4   | number | true     |
| paylines   | int4   | number | true     |
| image      | text   | string | false    |

### user_balance

| name     | type   | format | required |
|----------|--------|--------|----------|
| id       | int8   | number | true     |
| user_id  | uuid   | string | true     |
| balance  | float8 | number | true     |

### jackpot

| name   | type   | format | required |
|--------|--------|--------|----------|
| id     | int8   | number | true     |
| amount | float8 | number | true     |

### game_history

| name          | type                     | format | required |
|---------------|--------------------------|--------|----------|
| id            | int8                     | number | true     |
| user_id       | uuid                     | string | true     |
| game_name     | text                     | string | true     |
| bet_amount    | float8                   | number | true     |
| win_amount    | float8                   | number | true     |
| result        | text                     | string | true     |
| played_at     | timestamp with time zone | string | true     |
| balance_after | float8                   | number | true     |

### leaderboard

| name     | type   | format | required |
|----------|--------|--------|----------|
| id       | int8   | number | true     |
| user_id  | uuid   | string | true     |
| username | text   | string | true     |
| score    | int8   | number | true     |

### news

| name       | type                     | format | required |
|------------|--------------------------|--------|----------|
| id         | int8                     | number | true     |
| title      | text                     | string | true     |
| content    | text                     | string | true     |
| created_at | timestamp with time zone | string | true     |

### tournaments

| name        | type                     | format | required |
|-------------|--------------------------|--------|----------|
| id          | int8                     | number | true     |
| name        | text                     | string | true     |
| start_date  | timestamp with time zone | string | true     |
| end_date    | timestamp with time zone | string | true     |
| prize_pool  | float8                   | number | true     |
| entry_fee   | float8                   | number | true     |

### tournament_participants

| name          | type | format | required |
|---------------|------|--------|----------|
| id            | int8 | number | true     |
| user_id       | uuid | string | true     |
| tournament_id | int8 | number | true     |

*/

// Slots
export const useSlots = () => useQuery({
    queryKey: ['slots'],
    queryFn: () => fromSupabase(supabase.from('slots').select('*')),
});

export const useAddSlot = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newSlot) => fromSupabase(supabase.from('slots').insert([newSlot])),
        onSuccess: () => {
            queryClient.invalidateQueries('slots');
        },
    });
};

export const useUpdateSlot = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updates }) => fromSupabase(supabase.from('slots').update(updates).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('slots');
        },
    });
};

export const useDeleteSlot = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('slots').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('slots');
        },
    });
};

// User Balance
export const useUserBalance = (userId) => useQuery({
    queryKey: ['userBalance', userId],
    queryFn: () => fromSupabase(supabase.from('user_balance').select('*').eq('user_id', userId).single()),
});

export const useUpdateUserBalance = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, balance }) => fromSupabase(supabase.from('user_balance').upsert({ user_id: userId, balance })),
        onSuccess: (_, { userId }) => {
            queryClient.invalidateQueries(['userBalance', userId]);
        },
    });
};

// Jackpot
export const useJackpot = () => useQuery({
    queryKey: ['jackpot'],
    queryFn: () => fromSupabase(supabase.from('jackpot').select('*').single()),
});

export const useUpdateJackpot = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (amount) => fromSupabase(supabase.from('jackpot').update({ amount }).eq('id', 1)),
        onSuccess: () => {
            queryClient.invalidateQueries('jackpot');
        },
    });
};

// Game History
export const useGameHistory = (userId) => useQuery({
    queryKey: ['gameHistory', userId],
    queryFn: () => fromSupabase(supabase.from('game_history').select('*').eq('user_id', userId).order('played_at', { ascending: false })),
});

export const useAddGameHistory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newGameHistory) => fromSupabase(supabase.from('game_history').insert([newGameHistory])),
        onSuccess: (_, { user_id }) => {
            queryClient.invalidateQueries(['gameHistory', user_id]);
        },
    });
};

// Leaderboard
export const useLeaderboard = () => useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => fromSupabase(supabase.from('leaderboard').select('*').order('score', { ascending: false })),
});

export const useUpdateLeaderboard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, username, score }) => fromSupabase(supabase.from('leaderboard').upsert({ user_id: userId, username, score })),
        onSuccess: () => {
            queryClient.invalidateQueries('leaderboard');
        },
    });
};

// News
export const useNews = () => useQuery({
    queryKey: ['news'],
    queryFn: () => fromSupabase(supabase.from('news').select('*').order('created_at', { ascending: false })),
});

export const useAddNews = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newNews) => fromSupabase(supabase.from('news').insert([newNews])),
        onSuccess: () => {
            queryClient.invalidateQueries('news');
        },
    });
};

// Tournaments
export const useTournaments = () => useQuery({
    queryKey: ['tournaments'],
    queryFn: () => fromSupabase(supabase.from('tournaments').select('*').order('start_date', { ascending: true })),
});

export const useAddTournament = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTournament) => fromSupabase(supabase.from('tournaments').insert([newTournament])),
        onSuccess: () => {
            queryClient.invalidateQueries('tournaments');
        },
    });
};

// Tournament Participants
export const useTournamentParticipants = (tournamentId) => useQuery({
    queryKey: ['tournamentParticipants', tournamentId],
    queryFn: () => fromSupabase(supabase.from('tournament_participants').select('*').eq('tournament_id', tournamentId)),
});

export const useAddTournamentParticipant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, tournamentId }) => fromSupabase(supabase.from('tournament_participants').insert([{ user_id: userId, tournament_id: tournamentId }])),
        onSuccess: (_, { tournamentId }) => {
            queryClient.invalidateQueries(['tournamentParticipants', tournamentId]);
        },
    });
};