
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from '@/context/AppContext';
import { generateChatResponse } from '@/services/mockData';

const ChatInput = () => {
  const { addMessage, isLoading, setIsLoading, isVoiceMode, setIsVoiceMode } = useAppContext();
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-focus the textarea when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);
  
  const handleSendMessage = async () => {
    const message = inputValue.trim();
    if (!message || isLoading) return;
    
    addMessage(message, 'user');
    setInputValue('');
    setIsLoading(true);
    
    try {
      const response = await generateChatResponse(message);
      setTimeout(() => {
        addMessage(response, 'assistant');
        setIsLoading(false);
      }, 500);
    } catch (error) {
      addMessage("I'm sorry, I encountered an error. Please try again later.", 'assistant');
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
    // In a real implementation, we would initialize voice recognition here
  };
  
  return (
    <div className="border-t border-border p-4 bg-background/90 backdrop-blur-sm sticky bottom-0">
      <div className="max-w-3xl mx-auto relative">
        {isVoiceMode ? (
          <div className="border rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-slow">
                <Mic className="text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Listening... Say something</p>
            <Button variant="outline" size="sm" onClick={toggleVoiceMode} className="gap-2">
              <MicOff size={16} />
              Stop Listening
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about company policies, IT support, or HR procedures..."
              className="min-h-[52px] resize-none bg-background"
              rows={1}
            />
            <div className="flex flex-col gap-2">
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="rounded-full"
              >
                <Send size={18} />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={toggleVoiceMode}
                className="rounded-full"
              >
                <Mic size={18} />
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <div>
            <span className="inline-flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
              Connected to company knowledge
            </span>
          </div>
          <button className="hover:underline flex items-center gap-1" onClick={() => {}}>
            <X size={12} /> Clear conversation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
