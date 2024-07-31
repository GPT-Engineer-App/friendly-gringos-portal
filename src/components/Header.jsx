import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase/auth';
import AuthModal from './AuthModal';

const Header = () => {
  const { user, logout } = useSupabaseAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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
        <div className="text-2xl font-bold">5Gringos</div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#home" className="hover:text-gray-300">Home</a></li>
            <li><a href="#games" className="hover:text-gray-300">Games</a></li>
            <li><a href="#promotions" className="hover:text-gray-300">Promotions</a></li>
            <li><a href="#vip" className="hover:text-gray-300">VIP</a></li>
            <li><a href="#support" className="hover:text-gray-300">Support</a></li>
          </ul>
        </nav>
        <div className="space-x-2">
          {user ? (
            <>
              <span>Welcome, {user.email}</span>
              <Button onClick={handleLogout} variant="outline" className="text-white border-white hover:bg-white hover:text-gray-800">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsAuthModalOpen(true)} variant="outline" className="text-white border-white hover:bg-white hover:text-gray-800">
                Login
              </Button>
              <Button onClick={() => setIsAuthModalOpen(true)} className="bg-green-500 hover:bg-green-600">
                Register
              </Button>
            </>
          )}
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
};

export default Header;