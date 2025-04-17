
import React from 'react';
import { Bell, HelpCircle, User, Settings, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppContext } from '@/context/AppContext';

const Header = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setActiveView } = useAppContext();
  
  const handleLogout = () => {
    // In a real app, this would call an API to log the user out
    setIsAuthenticated(false);
    navigate('/login');
  };
  
  const handleSettingsClick = () => {
    setActiveView('settings');
  };
  
  return (
    <header className="h-16 border-b border-border px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="font-semibold text-lg">Employee Assistant</h2>
        <Badge variant="outline" className="bg-secondary">Beta</Badge>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-secondary relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 rounded-full hover:bg-secondary">
          <HelpCircle size={20} />
        </button>
        
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-2 pl-4 border-l cursor-pointer">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                <User size={16} />
              </div>
              <div className="text-sm">
                <p className="font-medium">Alex Morgan</p>
                <p className="text-muted-foreground text-xs">Product Designer</p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="end">
            <div className="flex flex-col space-y-1">
              <button 
                onClick={handleSettingsClick}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary text-sm w-full text-left transition-colors"
              >
                <Settings size={16} />
                Settings
              </button>
              <hr className="my-1 border-border" />
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-destructive/10 text-destructive text-sm w-full text-left transition-colors"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
