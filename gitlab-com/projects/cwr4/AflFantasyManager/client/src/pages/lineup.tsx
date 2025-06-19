import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import TeamSummaryNew from "@/components/lineup/team-summary-new";
import TeamLineup from "@/components/lineup/team-lineup";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Player as BasePlayer } from "@/components/player-stats/player-table";
import { Card } from "@/components/ui/card";

// Extend Player type for lineup view
type Player = BasePlayer & {
  isCaptain?: boolean;
};

export default function Lineup() {
  const { toast } = useToast();
  const [view, setView] = useState<"cards" | "list">("cards");
  
  // Define types for our API responses
  type Team = {
    id: number;
    userId: number;
    name: string;
    value: number;
    score: number;
    overallRank: number;
    trades: number;
    captainId: number;
  };

  type TeamPlayer = {
    teamId: number;
    playerId: number;
    position: string;
    player: BasePlayer;
  };

  const { data: team, isLoading: isLoadingTeam } = useQuery<Team>({
    queryKey: ["/api/teams/user/1"],
  });

  const { data: teamPlayers, isLoading: isLoadingPlayers } = useQuery<TeamPlayer[]>({
    queryKey: ["/api/teams/1/players"],
    enabled: !!team,
  });
  
  // Enhanced players with full stats
  const [enhancedPlayers, setEnhancedPlayers] = useState<Player[]>([]);
  
  // When teamPlayers data is loaded, process it to get enhanced player info
  useEffect(() => {
    if (teamPlayers && Array.isArray(teamPlayers)) {
      // Map the teamPlayers data to match the Player type needed for TeamLineup
      const players = teamPlayers.map((tp: any, index) => {
        // Add on bench status for some players
        const isOnBench = index % 4 === 3; // Every 4th player is on bench
        
        // Add secondary positions for some players
        const secondaryMap: {[key: string]: string[]} = {
          "MID": ["F"],  // Midfielders can play as Forwards
          "FWD": ["M"],  // Forwards can play as Midfielders
          "DEF": ["M"],  // Defenders can play as Midfielders
          "RUCK": ["F"]  // Rucks can play as Forwards
        };
        
        // Only some players have secondary positions
        const secondaryPositions = (tp.player.id % 3 === 0)
          ? secondaryMap[tp.position] || []
          : undefined;
          
        // Add live score simulation for demo
        const liveScore = Math.floor(Math.random() * 100);
        
        // Add team abbreviation (for display purposes)
        const teamAbbrevs = ["COL", "HAW", "GWS", "CAR", "NTH", "WCE", "ESS", "RIC", "SYD", "STK", "ADE", "MEL", "GEE", "PTA", "BRL", "WBD", "GCS"];
        const teamAbbr = teamAbbrevs[tp.player.id % teamAbbrevs.length];
        
        return {
          ...tp.player,
          position: tp.position,
          isCaptain: team?.captainId === tp.player.id,
          isOnBench,
          secondaryPositions,
          liveScore,
          team: teamAbbr
        };
      });
      
      setEnhancedPlayers(players);
    }
  }, [teamPlayers, team]);

  const handleMakeTrade = () => {
    toast({
      title: "Trade Feature",
      description: "Trade functionality will be implemented in a future update.",
      duration: 3000,
    });
  };

  const isLoading = isLoadingTeam || isLoadingPlayers;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Define a helper function to add isOnBench flag (alternating players for demonstration)
  const assignBenchStatus = (players: any[], mainCount: number, benchCount: number) => {
    return players.map((p, index) => ({
      ...p,
      isOnBench: index >= mainCount
    })).slice(0, mainCount + benchCount);
  };

  // Add secondary positions to some players (for demonstration)
  const addSecondaryPositions = (player: any) => {
    const secondaryMap: {[key: string]: string[]} = {
      "MID": ["F"],  // Midfielders can play as Forwards
      "FWD": ["M"],  // Forwards can play as Midfielders
      "DEF": ["M"],  // Defenders can play as Midfielders
      "RUCK": ["F"]  // Rucks can play as Forwards
    };
    
    // Randomly assign secondary positions to some players
    if (player.id % 3 === 0) {
      return {
        ...player,
        secondaryPositions: secondaryMap[player.position] || []
      };
    }
    
    return player;
  };
  
  // Function to add team information
  const addTeamInfo = (player: any) => {
    const teamAbbrevs = ["COL", "HAW", "GWS", "CAR", "NTH", "WCE", "ESS", "RIC", "SYD", "STK", "ADE", "MEL", "GEE", "PTA", "BRL", "WBD", "GCS"];
    return {
      ...player,
      team: teamAbbrevs[player.id % teamAbbrevs.length]
    };
  };

  // Organize players by position for traditional view with all necessary stats
  const midfielders = assignBenchStatus(
    (teamPlayers || [])
      .filter((tp: any) => tp.position === "MID")
      .map((tp: any) => addTeamInfo(addSecondaryPositions({
        id: tp.player.id,
        name: tp.player.name,
        position: tp.position,
        price: tp.player.price,
        breakEven: tp.player.breakEven,
        lastScore: tp.player.lastScore,
        averagePoints: tp.player.averagePoints,
        liveScore: Math.floor(Math.random() * 100), // Simulated live score
        isCaptain: team?.captainId === tp.player.id
      }))),
    8, // 8 on field
    2  // 2 on bench
  );

  const forwards = assignBenchStatus(
    (teamPlayers || [])
      .filter((tp: any) => tp.position === "FWD")
      .map((tp: any) => addTeamInfo(addSecondaryPositions({
        id: tp.player.id,
        name: tp.player.name,
        position: tp.position,
        price: tp.player.price,
        breakEven: tp.player.breakEven,
        lastScore: tp.player.lastScore,
        averagePoints: tp.player.averagePoints,
        liveScore: Math.floor(Math.random() * 100), // Simulated live score
        isCaptain: team?.captainId === tp.player.id
      }))),
    6, // 6 on field
    2  // 2 on bench
  );

  const defenders = assignBenchStatus(
    (teamPlayers || [])
      .filter((tp: any) => tp.position === "DEF")
      .map((tp: any) => addTeamInfo(addSecondaryPositions({
        id: tp.player.id,
        name: tp.player.name,
        position: tp.position,
        price: tp.player.price,
        breakEven: tp.player.breakEven,
        lastScore: tp.player.lastScore,
        averagePoints: tp.player.averagePoints,
        liveScore: Math.floor(Math.random() * 100), // Simulated live score
        isCaptain: team?.captainId === tp.player.id
      }))),
    6, // 6 on field
    2  // 2 on bench
  );

  const rucks = assignBenchStatus(
    (teamPlayers || [])
      .filter((tp: any) => tp.position === "RUCK")
      .map((tp: any) => addTeamInfo(addSecondaryPositions({
        id: tp.player.id,
        name: tp.player.name,
        position: tp.position,
        price: tp.player.price,
        breakEven: tp.player.breakEven,
        lastScore: tp.player.lastScore,
        averagePoints: tp.player.averagePoints,
        liveScore: Math.floor(Math.random() * 100), // Simulated live score
        isCaptain: team?.captainId === tp.player.id
      }))),
    2, // 2 on field
    1  // 1 on bench
  );

  return (
    <div className="container mx-auto px-3 py-6 max-w-4xl">
      <div className="mb-4">
        <Card className="bg-white shadow-sm">
          <div className="p-4">
            <h1 className="text-xl font-bold mb-4">My Lineup</h1>
            
            <TeamSummaryNew 
              midfielders={midfielders}
              forwards={forwards}
              defenders={defenders}
              rucks={rucks}
              tradesAvailable={team?.trades || 0}
              onMakeTrade={handleMakeTrade}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
