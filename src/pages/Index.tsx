
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
import { useParams, useNavigate } from 'react-router-dom';

const MainContent = () => {
  const { activeView, selectedDocument, setSelectedDocument, setActiveView } = useAppContext();
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  // Update active view based on route
  useEffect(() => {
    if (categoryId) {
      setActiveView('category');
    }
  }, [categoryId, setActiveView]);

  // Handle navigation to RBAC Admin when that view is selected
  useEffect(() => {
    if (activeView === 'rbac_admin') {
      navigate('/rbac-admin');
    }
  }, [activeView, navigate]);

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
        ) : activeView === 'rbac_admin' ? (
          // This was causing the TS error, we need an explicit check for 'rbac_admin'
          <div className="p-4">Redirecting to RBAC Admin...</div>
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
    <div className="flex h-screen w-full">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Index;
