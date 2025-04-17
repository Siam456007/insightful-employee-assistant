
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Calendar, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const ChatHistory = () => {
  const { messages } = useAppContext();
  
  // Group messages by "conversation" - this is a simplified version
  // In a real application, you'd have actual conversation IDs and timestamps
  const conversations = [
    {
      id: 'today',
      title: 'Today',
      icon: Calendar,
      messages: messages.filter(m => m.role === 'user').slice(0, 3),
    },
    {
      id: 'yesterday',
      title: 'Yesterday',
      icon: Calendar,
      messages: [
        { id: 'past1', content: 'How do I request time off?', role: 'user' },
        { id: 'past2', content: 'What is the VPN policy?', role: 'user' },
      ],
    },
    {
      id: 'earlier',
      title: 'Earlier this week',
      icon: Calendar,
      messages: [
        { id: 'past3', content: 'Who is the IT director?', role: 'user' },
        { id: 'past4', content: 'How do I reset my password?', role: 'user' },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h3 className="font-medium text-sm text-foreground">Chat History</h3>
      </div>
      
      <div className="relative p-3">
        <div className="flex items-center rounded-md bg-background text-muted-foreground px-3 py-2 text-sm">
          <Search size={16} className="mr-2" />
          <span>Search history...</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {conversations.map((conversation) => (
          <div key={conversation.id} className="mb-4">
            <div className="flex items-center gap-2 px-2 mb-2">
              <conversation.icon size={14} className="text-muted-foreground" />
              <h4 className="text-xs font-medium text-muted-foreground">{conversation.title}</h4>
            </div>
            
            <div className="space-y-1">
              {conversation.messages.map((message) => (
                <div 
                  key={message.id}
                  className="px-3 py-2 rounded-md text-sm hover:bg-secondary cursor-pointer"
                >
                  <p className="truncate text-foreground">{message.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
