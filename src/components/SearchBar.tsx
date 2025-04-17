
import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { searchDocuments } from '@/services/mockData';

const SearchBar = () => {
  const { searchQuery, setSearchQuery, setSearchResults, setIsLoading } = useAppContext();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  
  // Debounce search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (localQuery !== searchQuery) {
        setSearchQuery(localQuery);
        
        if (localQuery.trim()) {
          setIsLoading(true);
          searchDocuments(localQuery)
            .then(results => {
              setSearchResults(results);
              setIsLoading(false);
            })
            .catch(() => {
              setSearchResults([]);
              setIsLoading(false);
            });
        } else {
          setSearchResults([]);
        }
      }
    }, 500);
    
    return () => clearTimeout(delayDebounceFn);
  }, [localQuery, searchQuery, setSearchQuery, setSearchResults, setIsLoading]);
  
  const clearSearch = () => {
    setLocalQuery('');
    setSearchQuery('');
    setSearchResults([]);
  };
  
  return (
    <div className="relative">
      <div className="relative flex items-center">
        <SearchIcon size={18} className="absolute left-3 text-muted-foreground" />
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Search knowledge base..."
          className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        {localQuery && (
          <button 
            onClick={clearSearch}
            className="absolute right-3 text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
