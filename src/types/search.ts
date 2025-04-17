
export interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  url: string;
  date?: string;
  category?: string;
  source?: string;
  confidence?: number;
}

export interface SearchFilters {
  category?: string;
  date?: string;
  source?: string;
}

export interface SearchQuery {
  term: string;
  filters?: SearchFilters;
}
