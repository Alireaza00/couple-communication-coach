
import { useState, useEffect } from 'react';
import { Settings, Key, Check, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from 'sonner';
import { callOpenRouter } from '@/services/api';

const AISettings = () => {
  const [apiKey, setApiKey] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTestingKey, setIsTestingKey] = useState(false);
  
  useEffect(() => {
    const storedKey = localStorage.getItem('openrouter_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);
  
  const handleSaveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openrouter_api_key', apiKey.trim());
      toast.success('API key saved successfully');
      setIsOpen(false);
    } else {
      toast.error('Please enter a valid API key');
    }
  };
  
  const handleTestKey = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter an API key first');
      return;
    }
    
    setIsTestingKey(true);
    try {
      // Store key temporarily for the test
      localStorage.setItem('openrouter_api_key', apiKey.trim());
      
      // Simple test call
      const result = await callOpenRouter([
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Please respond with "OpenRouter connection successful" if you can receive this message.' }
      ]);
      
      if (result.text.includes('successful')) {
        toast.success('API key is valid!');
      } else {
        toast.warning('API key test completed, but unexpected response.');
      }
    } catch (error) {
      console.error('API key test failed:', error);
      toast.error('API key test failed. Please check your key and try again.');
    } finally {
      setIsTestingKey(false);
    }
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          aria-label="AI Settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">AI Settings</h3>
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary flex items-center gap-1"
            >
              <Info className="h-3 w-3" /> Get API Key
            </a>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="api-key" className="text-sm">
              OpenRouter API Key
            </label>
            <div className="flex gap-2">
              <Input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your OpenRouter API key"
                className="flex-1"
              />
            </div>
            <p className="text-xs text-gray-500">
              Your API key is stored locally and never sent to our servers.
            </p>
          </div>
          
          <div className="flex justify-between">
            <Button
              size="sm"
              variant="outline"
              onClick={handleTestKey}
              disabled={isTestingKey || !apiKey.trim()}
              className="flex items-center gap-1"
            >
              <Check className="h-3 w-3" />
              {isTestingKey ? 'Testing...' : 'Test Key'}
            </Button>
            
            <Button 
              size="sm"
              onClick={handleSaveKey}
              className="flex items-center gap-1"
            >
              <Key className="h-3 w-3" />
              Save Key
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AISettings;
