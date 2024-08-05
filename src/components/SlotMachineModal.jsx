import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SlotMachineModal = ({ slot, isOpen, onClose }) => {
  if (!slot) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{slot.name}</DialogTitle>
          <DialogDescription>{slot.category} Slot</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <img src={slot.image} alt={slot.name} className="w-full h-48 object-cover rounded-md" />
          <p className="mt-4">Spin the reels of {slot.name}! This exciting slot machine offers great entertainment and the chance to win big.</p>
          <div className="mt-6 flex justify-between">
            <Button onClick={onClose}>Close</Button>
            <Button className="bg-green-500 hover:bg-green-600">Play Now</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SlotMachineModal;
