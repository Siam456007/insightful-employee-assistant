
import React, { useState } from "react";
import { Search } from "lucide-react";
import { SearchResult } from "@/types/search";
import { mockSearchResults } from "@/services/mockData";
import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
      // In a real app, this would trigger an API call
      // For now, we're just using mock data
      const results = mockSearchResults as SearchResult[];
      console.log("Search results:", results);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full max-w-3xl items-center space-x-2"
    >
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search documents, chats, and more..."
          className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-12 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchBar;
