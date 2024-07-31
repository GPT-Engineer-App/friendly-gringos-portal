import React from 'react';
import { Button } from "@/components/ui/button";

const Header = () => {
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
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-800">Login</Button>
          <Button className="bg-green-500 hover:bg-green-600">Register</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;