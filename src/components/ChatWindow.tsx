
import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { useAppContext } from '@/context/AppContext';
import { ScrollArea } from '@/components/ui/scroll-area';

const ChatWindow = () => {
  const { messages, isLoading } = useAppContext();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);
  
  return (
    <ScrollArea className="flex-1 chat-scrollbar px-4 md:px-6 lg:px-8 h-full">
      <div className="max-w-3xl mx-auto py-4">
        {messages.map((message, index) => (
          <ChatMessage 
            key={message.id} 
            content={message.content} 
            role={message.role} 
            isLatest={index === messages.length - 1}
          />
        ))}
        <div ref={endOfMessagesRef} />
      </div>
    </ScrollArea>
  );
};

export default ChatWindow;
