
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, PlusCircle, MessageCircle, User, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Browse Listings",
      path: "/listings",
      icon: Search,
    },
    {
      name: "Create Listing",
      path: "/create-listing",
      icon: PlusCircle,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: MessageCircle,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <>
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-sidebar border-r border-gray-200 transition-all duration-300 flex flex-col",
          isOpen ? "w-64" : "w-0 md:w-16"
        )}
      >
        {/* Sidebar Content */}
        <div className="p-4 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <span className="font-bold text-primary-foreground">FF</span>
              </div>
              {isOpen && (
                <h2 className="ml-3 text-lg font-semibold transition-opacity">Flatmate Finder</h2>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className="hidden md:flex"
            >
              {isOpen ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </Button>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-1 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-2 py-2.5 rounded-lg transition-all",
                  isActive(item.path) 
                    ? "bg-primary text-primary-foreground font-medium" 
                    : "text-gray-700 hover:bg-gray-100",
                  !isOpen && "justify-center"
                )}
              >
                <item.icon size={20} className={cn(!isOpen && "mx-auto")} />
                {isOpen && <span className="ml-3">{item.name}</span>}
              </Link>
            ))}
          </nav>
          
          {/* User Section */}
          <div className="pt-2 mt-6 border-t border-gray-200">
            <div className="flex items-center py-2">
              <div className="h-8 w-8 rounded-full bg-gray-200"></div>
              {isOpen && (
                <div className="ml-3">
                  <p className="text-sm font-medium">Guest User</p>
                  <Link to="/auth" className="text-xs text-blue-500">Sign in</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile overlay for sidebar */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed z-50 bottom-4 right-4 bg-primary rounded-full p-3 shadow-lg"
        onClick={toggleSidebar}
      >
        {isOpen ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
      </button>
    </>
  );
}

export default Sidebar;
