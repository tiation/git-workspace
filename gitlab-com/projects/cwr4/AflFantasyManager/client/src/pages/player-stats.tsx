import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import PlayerTable, { Player } from "@/components/player-stats/player-table";

export default function PlayerStats() {
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [location] = useLocation();
  
  // Extract search query from URL if present
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get("q");
    if (q) {
      setSearchQuery(q);
    }
  }, [location]);

  // Player data fetching
  const { data: players, isLoading } = useQuery<Player[]>({
    queryKey: [`/api/players${searchQuery ? `?q=${searchQuery}` : ""}${positionFilter ? `?position=${positionFilter}` : ""}`],
  });

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle position filter
  const handleFilter = (position: string) => {
    setPositionFilter(position === "all" ? "" : position);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Player Stats</h1>
      
      <PlayerTable 
        players={players || []}
        isLoading={isLoading}
        onSearch={handleSearch}
        onFilter={handleFilter}
        searchQuery={searchQuery}
        positionFilter={positionFilter}
      />
    </div>
  );
}
