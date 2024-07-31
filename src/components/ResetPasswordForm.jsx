import React, { useState } from 'react';
import { useSupabaseAuth } from '@/integrations/supabase/auth';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ResetPasswordForm = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const { resetPassword } = useSupabaseAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      toast.success('Password reset email sent. Please check your inbox.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">Reset Password</Button>
      <Button variant="link" onClick={onBack} className="w-full">
        Back to Login
      </Button>
    </form>
  );
};

export default ResetPasswordForm;