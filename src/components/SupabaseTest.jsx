import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SupabaseTest = () => {
  const [testResult, setTestResult] = useState(null);

  const testConnection = async () => {
    try {
      const { data, error } = await supabase.from('slots').select('name').limit(1);
      
      if (error) throw error;
      
      setTestResult('Connection successful! Retrieved slot: ' + data[0].name);
      toast.success('Supabase connection test passed!');
    } catch (error) {
      setTestResult('Connection failed: ' + error.message);
      toast.error('Supabase connection test failed.');
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg">
      <h3 className="text-xl font-bold mb-2">Supabase Connection Test</h3>
      <Button onClick={testConnection}>Test Connection</Button>
      {testResult && (
        <p className="mt-2">{testResult}</p>
      )}
    </div>
  );
};

export default SupabaseTest;
