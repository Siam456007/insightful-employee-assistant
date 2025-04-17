
import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { 
  Bot, 
  Search, 
  MessageSquare, 
  BookOpen, 
  ArrowRight, 
  FileQuestion, 
  Lightbulb, 
  BarChart3, 
  Clock
} from 'lucide-react';
import { mockCategories } from '@/services/mockData';
import { Progress } from '@/components/ui/progress';

const HomeContent = () => {
  const { setActiveView, addMessage } = useAppContext();
  const [progress, setProgress] = useState(76);
  
  // Quick access actions
  const quickActions = [
    "How do I request time off?",
    "What are the IT support hours?",
    "How do I reset my password?",
    "When is the next company meeting?"
  ];

  const handleQuickAction = (question: string) => {
    addMessage(question, 'user');
    setActiveView('chat');
  };
  
  return (
    <div className="flex flex-col h-full px-4 md:px-8 overflow-y-auto pb-8">
      <div className="max-w-6xl mx-auto w-full space-y-10 py-8">
        {/* Welcome Hero */}
        <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl p-6 md:p-10 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute left-0 bottom-0 w-48 h-48 bg-gradient-to-tr from-blue-500/20 to-teal-500/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
          
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Welcome back, Alex</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Your personalized AI-powered workplace assistant is ready to help with company knowledge, policies, and support.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setActiveView('chat')} className="gap-2">
                <MessageSquare size={18} /> Start Conversation
              </Button>
              <Button variant="outline" onClick={() => setActiveView('search')} className="gap-2">
                <Search size={18} /> Search Knowledge Base
              </Button>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border p-6 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Knowledge Base</p>
                <h3 className="text-2xl font-bold mt-1">1,542</h3>
                <p className="text-sm text-muted-foreground mt-1">Documents available</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <BookOpen className="text-primary" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border p-6 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Your Learning</p>
                <h3 className="text-2xl font-bold mt-1">{progress}%</h3>
                <Progress value={progress} className="h-2 mt-2 w-32" />
                <p className="text-sm text-muted-foreground mt-2">Onboarding progress</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <BarChart3 className="text-primary" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border p-6 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Recent Activity</p>
                <h3 className="text-2xl font-bold mt-1">24</h3>
                <p className="text-sm text-muted-foreground mt-1">Queries this week</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Clock className="text-primary" size={24} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Popular Categories */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Popular Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockCategories.map((category) => (
              <div 
                key={category.name}
                onClick={() => setActiveView('category')}
                className="bg-card border border-border rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{category.count} documents</p>
                  </div>
                  <div className="bg-secondary p-2 rounded-full">
                    <FileQuestion size={18} />
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full justify-between mt-4">
                  Browse <ArrowRight size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={18} className="text-primary" />
            <h2 className="text-xl font-semibold">Quick Actions</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action)}
                className="bg-secondary/50 border border-border rounded-md p-3 text-left hover:bg-secondary transition-colors flex justify-between items-center"
              >
                <span>{action}</span>
                <ArrowRight size={16} className="text-primary" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
