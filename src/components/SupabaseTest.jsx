import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SupabaseTest = () => {
  const [testResult, setTestResult] = useState(null);
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');

  useEffect(() => {
    setSupabaseUrl(import.meta.env.VITE_SUPABASE_PROJECT_URL || '');
    setSupabaseKey(import.meta.env.VITE_SUPABASE_API_KEY || '');
  }, []);

  const testConnection = async () => {
    try {
      setTestResult('Testing connection...');
      console.log('Supabase URL:', supabaseUrl);
      console.log('Supabase Key:', supabaseKey ? 'Set' : 'Not set');

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase URL or API key is missing. Please check your environment variables.');
      }

      console.log('Attempting to fetch a slot...');
      const { data, error } = await supabase.from('slots').select('name').limit(1);
    
      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }
    
      console.log('Supabase query result:', data);
    
      if (data && data.length > 0) {
        setTestResult('Connection successful! Retrieved slot: ' + data[0].name);
        toast.success('Supabase connection test passed!');
      } else {
        setTestResult('Connection successful, but no slots found. Check if the "slots" table exists and has data.');
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
      <div className="mb-2">
        <p>Supabase URL: {supabaseUrl ? 'Set' : 'Not set'}</p>
        <p>Supabase Key: {supabaseKey ? 'Set' : 'Not set'}</p>
      </div>
      <Button onClick={testConnection}>Test Connection</Button>
      {testResult && (
        <pre className="mt-2 whitespace-pre-wrap overflow-auto max-h-60">{testResult}</pre>
      )}
    </div>
  );
};

export default SupabaseTest;
