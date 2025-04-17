
import React from 'react';
import { User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/context/AppContext';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant' | 'system';
  isLatest?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, role, isLatest }) => {
  const { isLoading } = useAppContext();
  
  const isAssistant = role === 'assistant' || role === 'system';
  
  return (
    <div 
      className={cn(
        'flex gap-4 p-4 animate-fade-in',
        isAssistant ? 'bg-secondary/50' : '',
        isLoading && isLatest && isAssistant ? 'opacity-70' : ''
      )}
    >
      <div className={cn(
        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
        isAssistant 
          ? 'bg-gradient-to-br from-assistant to-assistant-lighter text-white'
          : 'bg-secondary border border-border text-foreground'
      )}>
        {isAssistant ? <Bot size={16} /> : <User size={16} />}
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center">
          <h4 className="font-medium text-sm">
            {isAssistant ? 'InSight Assistant' : 'You'}
          </h4>
        </div>
        
        <div className="prose prose-sm max-w-none text-foreground">
          {isLoading && isLatest && isAssistant ? (
            <div className="flex gap-1 h-6 items-end">
              <span className="typing-dot" style={{"--dot-index": 0} as React.CSSProperties}></span>
              <span className="typing-dot" style={{"--dot-index": 1} as React.CSSProperties}></span>
              <span className="typing-dot" style={{"--dot-index": 2} as React.CSSProperties}></span>
            </div>
          ) : (
            <ReactMarkdown>{content}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
