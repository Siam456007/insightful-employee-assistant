
import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import SearchBar from './SearchBar';
import ResultCard from './ResultCard';
import { mockRecentSearches, mockRecentDocument } from '@/services/mockData';
import { History, Loader2, Search, Eye } from 'lucide-react';

const SearchView = () => {
  const { searchResults, searchQuery, isLoading, setSelectedDocument } = useAppContext();
  const [viewingRecentDocument, setViewingRecentDocument] = useState(false);
  
  const handleResultClick = (result: any) => {
    setSelectedDocument(result);
  };

  const handleRecentSearchClick = (search: string) => {
    // In a real app, this would fetch the actual document
    // For now, we'll just show the mock document
    setViewingRecentDocument(true);
    setSelectedDocument(mockRecentDocument);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Knowledge Search</h2>
          <SearchBar />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-assistant" size={32} />
            </div>
          ) : searchQuery && searchResults.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {searchResults.length} results for "{searchQuery}"
                </h3>
              </div>
              <div className="grid gap-4">
                {searchResults.map((result) => (
                  <div onClick={() => handleResultClick(result)} key={result.id}>
                    <ResultCard {...result} />
                  </div>
                ))}
              </div>
            </div>
          ) : searchQuery ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-muted-foreground" size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try using different keywords or check your spelling
              </p>
            </div>
          ) : (
            <div className="py-8">
              <div className="flex items-center gap-2 mb-4">
                <History size={16} className="text-muted-foreground" />
                <h3 className="text-sm font-medium">Recent searches</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {mockRecentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(search)}
                    className="text-sm text-left bg-secondary/50 hover:bg-secondary px-3 py-2 rounded-md truncate flex items-center justify-between group"
                  >
                    <span>{search}</span>
                    <Eye size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchView;
