import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const GameModal = ({ game, isOpen, onClose }) => {
  if (!game) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{game.name}</DialogTitle>
          <DialogDescription>{game.category}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <img src={game.image} alt={game.name} className="w-full h-48 object-cover rounded-md" />
          <p className="mt-4">Experience the thrill of {game.name}! This exciting game offers great entertainment and the chance to win big.</p>
          <div className="mt-6 flex justify-between">
            <Button onClick={onClose}>Close</Button>
            <Button className="bg-green-500 hover:bg-green-600">Play Now</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameModal;
