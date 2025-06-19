import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/player-stats?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="bg-white border-b border-neutral-light px-4 py-2 flex items-center">
      {/* Search Bar */}
      <form className="relative flex-1 max-w-xl" onSubmit={handleSearch}>
        <Input 
          type="text" 
          placeholder="Search players, teams..." 
          className="w-full pl-10 pr-4 py-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute left-3 top-2.5 text-neutral">
          <Search className="h-5 w-5" />
        </div>
      </form>
      
      {/* Notifications */}
      <div className="ml-4 relative">
        <button className="text-neutral-dark hover:text-gray-900 focus:outline-none">
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
      
      {/* User Profile */}
      <div className="ml-4">
        <button className="flex items-center focus:outline-none">
          <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center">
            <span className="font-medium">JD</span>
          </div>
        </button>
      </div>
    </div>
  );
}
