import React from "react";
import {
  Home,
  Search,
  MessageSquare,
  Settings,
  LogOut,
  FileText,
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { mockCategories } from "@/services/mockData";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";

const Sidebar = () => {
  const { activeView, setActiveView, setIsAuthenticated } = useAppContext();
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: "Home", id: "home" },
    { icon: MessageSquare, label: "Chat", id: "chat" },
    { icon: Search, label: "Search", id: "search" },
    { icon: Settings, label: "Settings", id: "settings" },
  ];

  const handleNavClick = (id: "chat" | "search" | "home" | "settings") => {
    setActiveView(id);

    if (categoryId) {
      navigate("/"); // Go back to main page when switching from category view
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setActiveView("category");
    navigate(`/category/${categoryName}`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <aside className="flex flex-col bg-sidebar w-64 border-r border-border h-screen p-4">
      <div className="flex items-center gap-3 px-2 py-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-assistant to-assistant-lighter flex items-center justify-center">
          <span className="text-white font-semibold">IA</span>
        </div>
        <h1 className="font-bold text-xl text-assistant">InSight Assistant</h1>
      </div>

      <nav className="mt-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() =>
              handleNavClick(item.id as "chat" | "search" | "home" | "settings")
            }
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md w-full text-left mb-1 transition-colors",
              activeView === item.id && !categoryId
                ? "bg-primary/10 text-primary font-medium"
                : "text-foreground hover:bg-secondary"
            )}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-8">
        <h3 className="text-sm font-medium text-muted-foreground px-3 mb-2">
          Categories
        </h3>
        <div className="space-y-1">
          {mockCategories.map((category) => (
            <div
              key={category.name}
              className={cn(
                "flex items-center justify-between px-3 py-1.5 text-sm rounded-md cursor-pointer",
                categoryId === category.name
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-secondary"
              )}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="flex items-center gap-2">
                <FileText size={15} />
                <span>{category.name}</span>
              </div>
              <span className="bg-secondary text-secondary-foreground text-xs rounded-full px-2 py-0.5">
                {category.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-muted-foreground hover:text-destructive px-3 py-2 w-full rounded-md hover:bg-destructive/10 transition-colors"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
