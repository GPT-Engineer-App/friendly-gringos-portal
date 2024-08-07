import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SupabaseTest = () => {
  const [testResult, setTestResult] = useState(null);

  const testConnection = async () => {
    try {
      setTestResult('Testing connection...');
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_PROJECT_URL);
      console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_API_KEY ? 'Set' : 'Not set');

      const { data, error } = await supabase.from('slots').select('name').limit(1);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setTestResult('Connection successful! Retrieved slot: ' + data[0].name);
        toast.success('Supabase connection test passed!');
      } else {
        setTestResult('Connection successful, but no slots found.');
        toast.warning('Supabase connected, but no data retrieved.');
      }
    } catch (error) {
      console.error('Supabase connection error:', error);
      setTestResult(`Connection failed: ${error.message}\nError details: ${JSON.stringify(error, null, 2)}`);
      toast.error('Supabase connection test failed. Check console for details.');
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg">
      <h3 className="text-xl font-bold mb-2">Supabase Connection Test</h3>
      <Button onClick={testConnection}>Test Connection</Button>
      {testResult && (
        <pre className="mt-2 whitespace-pre-wrap">{testResult}</pre>
      )}
    </div>
  );
};

export default SupabaseTest;
