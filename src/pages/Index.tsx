
import React, { useEffect } from 'react';
import { AppProvider } from '@/context/AppContext';
import { useAppContext } from '@/context/AppContext';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ChatWindow from '@/components/ChatWindow';
import ChatInput from '@/components/ChatInput';
import SearchView from '@/components/SearchView';
import ChatHistory from '@/components/ChatHistory';
import HomeContent from '@/components/HomeContent';
import SettingsView from '@/components/SettingsView';
import CategoryView from '@/components/CategoryView';
import DocumentModal from '@/components/DocumentModal';
import { useParams } from 'react-router-dom';

const MainContent = () => {
  const { activeView, selectedDocument, setSelectedDocument, setActiveView } = useAppContext();
  const { categoryId } = useParams<{ categoryId: string }>();
  
  // Update active view based on route
  useEffect(() => {
    if (categoryId) {
      setActiveView('category');
    }
  }, [categoryId, setActiveView]);

  return (
    <div className="flex flex-col flex-1 h-screen">
      <Header />
      <div className="flex-1 overflow-hidden">
        {activeView === 'chat' ? (
          <div className="flex h-full">
            <div className="flex-1 flex flex-col">
              <ChatWindow />
              <ChatInput />
            </div>
            <div className="hidden md:block w-64 lg:w-72 border-l border-border bg-secondary/30">
              <ChatHistory />
            </div>
          </div>
        ) : activeView === 'search' ? (
          <SearchView />
        ) : activeView === 'settings' ? (
          <SettingsView />
        ) : activeView === 'category' ? (
          <CategoryView />
        ) : (
          <HomeContent />
        )}
      </div>
      
      {selectedDocument && (
        <DocumentModal 
          document={selectedDocument} 
          isOpen={!!selectedDocument} 
          onClose={() => setSelectedDocument(null)} 
        />
      )}
    </div>
  );
};

const Index = () => {
  return (
    <AppProvider>
      <div className="flex h-screen w-full">
        <Sidebar />
        <MainContent />
      </div>
    </AppProvider>
  );
};

export default Index;
