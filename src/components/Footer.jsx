import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Matrix Slots</h3>
            <p className="text-sm">Experience the thrill of mobile slots!</p>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 text-center md:text-left">
            <a href="#" className="hover:text-gray-300 mb-2 md:mb-0">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 mb-2 md:mb-0">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 mb-2 md:mb-0">Responsible Gaming</a>
            <a href="#" className="hover:text-gray-300">Contact Us</a>
          </div>
        </div>
        <div className="mt-6 text-center text-sm">
          <p>&copy; 2024 Matrix Slots. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
