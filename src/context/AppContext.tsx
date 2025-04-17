import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  timestamp: Date;
};

type SearchResult = {
  id: string;
  title: string;
  content: string;
  source: string;
  tags: string[];
  relevance: number;
};

export type ThemeColor = "blue" | "purple" | "green" | "orange" | "red";

type AppContextType = {
  messages: Message[];
  addMessage: (content: string, role: "user" | "assistant" | "system") => void;
  clearMessages: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  searchResults: SearchResult[];
  setSearchResults: (results: SearchResult[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeView: "chat" | "search" | "home" | "settings" | "category";
  setActiveView: (
    view: "chat" | "search" | "home" | "settings" | "category"
  ) => void;
  isVoiceMode: boolean;
  setIsVoiceMode: (isVoice: boolean) => void;
  currentCategory: string | null;
  setCurrentCategory: (category: string | null) => void;
  selectedDocument: SearchResult | null;
  setSelectedDocument: (doc: SearchResult | null) => void;
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  isDarkMode: boolean;
  setIsDarkMode: (darkMode: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  user: {
    name: string;
    email: string;
    role: string;
  } | null;
  setUser: (user: { name: string; email: string; role: string } | null) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your employee assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState<
    "chat" | "search" | "home" | "settings" | "category"
  >("home");
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<SearchResult | null>(
    null
  );
  const [themeColor, setThemeColor] = useState<ThemeColor>("blue");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);

  // Apply theme color and dark mode changes to CSS variables
  useEffect(() => {
    const root = document.documentElement;

    // Reset all theme-related classes
    root.classList.remove(
      "theme-blue",
      "theme-purple",
      "theme-green",
      "theme-orange",
      "theme-red"
    );

    // Add the selected theme class
    root.classList.add(`theme-${themeColor}`);

    // Update CSS variables based on the selected theme
    switch (themeColor) {
      case "blue":
        root.style.setProperty("--primary", "210 100% 50%");
        root.style.setProperty("--assistant", "#3b82f6");
        break;
      case "purple":
        root.style.setProperty("--primary", "270 100% 60%");
        root.style.setProperty("--assistant", "#8b5cf6");
        break;
      case "green":
        root.style.setProperty("--primary", "142 76% 36%");
        root.style.setProperty("--assistant", "#10b981");
        break;
      case "orange":
        root.style.setProperty("--primary", "24 95% 53%");
        root.style.setProperty("--assistant", "#f97316");
        break;
      case "red":
        root.style.setProperty("--primary", "0 84% 60%");
        root.style.setProperty("--assistant", "#ef4444");
        break;
    }
  }, [themeColor]);

  // Apply dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const addMessage = useCallback(
    (content: string, role: "user" | "assistant" | "system") => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content,
          role,
          timestamp: new Date(),
        },
      ]);
    },
    []
  );

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: "1",
        content:
          "Hello! I'm your employee assistant. How can I help you today?",
        role: "assistant",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const value = {
    messages,
    addMessage,
    clearMessages,
    isLoading,
    setIsLoading,
    searchResults,
    setSearchResults,
    searchQuery,
    setSearchQuery,
    activeView,
    setActiveView,
    isVoiceMode,
    setIsVoiceMode,
    currentCategory,
    setCurrentCategory,
    selectedDocument,
    setSelectedDocument,
    themeColor,
    setThemeColor,
    isDarkMode,
    setIsDarkMode,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
