import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase/auth';
import AuthModal from './AuthModal';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navItems } from '@/nav-items';
import { supabase } from '@/integrations/supabase';

const Header = () => {
  const { user, logout } = useSupabaseAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (user) {
      fetchBalance();
    }
  }, [user, fetchBalance]);

  const fetchBalance = useCallback(async () => {
    const { data, error } = await supabase
      .from('user_balance')
      .select('balance')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching balance:', error);
    } else {
      setBalance(data.balance);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl md:text-2xl font-bold">Matrix Slots</div>
        <div className="flex items-center space-x-4">
          {user && (
            <div className="text-sm md:text-base">
              Balance: {balance} coins
            </div>
          )}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer w-8 h-8 md:w-10 md:h-10">
                  <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.name} />
                  <AvatarFallback>{user.user_metadata?.name?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => setIsAuthModalOpen(true)} className="bg-green-500 hover:bg-green-600 text-sm md:text-base">
              Login / Register
            </Button>
          )}
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
};

export default Header;
