import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, formatScore, getPositionColor } from "@/lib/utils";
import { Player as BasePlayer } from "../player-stats/player-table";

// Extend the Player type to include isCaptain and secondary positions
type Player = BasePlayer & {
  isCaptain?: boolean;
  secondaryPositions?: string[];
  isOnBench?: boolean;
}

interface TeamLineupProps {
  players: Player[];
  isLoading: boolean;
}

export default function TeamLineup({ players, isLoading }: TeamLineupProps) {
  // Function to create team logo badge
  const renderTeamLogo = (team: string) => (
    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
      {team.substring(0, 2).toUpperCase()}
    </div>
  );

  // Function to render a player card
  const renderPlayerCard = (player: Player) => (
    <Card className={`h-full overflow-hidden ${player.isOnBench ? 'bg-gray-50' : ''}`} key={player.id}>
      <div className={`h-1 w-full ${getPositionColor(player.position)}`}></div>
      <CardContent className="p-4 pt-3">
        <div className="flex items-center gap-3 mb-3">
          {renderTeamLogo(player.team)}
          <div className="truncate flex-1">
            <div className="text-sm font-semibold truncate">
              {player.name}
              {player.isOnBench && <span className="ml-1 text-xs text-gray-500">(Bench)</span>}
            </div>
            <div className="text-xs text-neutral-dark flex items-center flex-wrap gap-1">
              <span className={`inline-block px-1 rounded text-white ${getPositionColor(player.position)}`}>
                {player.position.charAt(0)}
              </span>
              {player.secondaryPositions?.map((pos, idx) => (
                <span key={idx} className="px-1 rounded bg-gray-200 text-gray-600">{pos}</span>
              ))}
              {player.isCaptain && (
                <span className="px-1 py-0.5 text-xs bg-yellow-500 text-white rounded-sm">C</span>
              )}
              {player.secondaryPositions && player.secondaryPositions.length > 0 && (
                <span className="px-1 text-xs bg-gray-100 text-gray-600 rounded">DPP</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-neutral-dark">Price:</span> 
            <span className="font-medium">{formatCurrency(player.price)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-dark">Avg:</span> 
            <span className="font-medium">{player.averagePoints?.toFixed(1) || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-dark">BE:</span> 
            <span className={`font-medium ${player.breakEven < 0 ? 'text-red-500' : ''}`}>{player.breakEven}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-dark">Last:</span> 
            <span className="font-medium">{formatScore(player.lastScore)}</span>
          </div>
          {player.l3Average && (
            <div className="flex justify-between">
              <span className="text-neutral-dark">L3 Avg:</span> 
              <span className="font-medium">{player.l3Average.toFixed(1)}</span>
            </div>
          )}
          {player.selectionPercentage && (
            <div className="flex justify-between">
              <span className="text-neutral-dark">Sel %:</span> 
              <span className="font-medium">{player.selectionPercentage.toFixed(1)}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // Group players by position
  const midfielders = players.filter(p => p.position === "MID");
  const forwards = players.filter(p => p.position === "FWD");
  const defenders = players.filter(p => p.position === "DEF");
  const rucks = players.filter(p => p.position === "RUCK");

  // Render loading state
  if (isLoading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Loading your team...</p>
      </div>
    );
  }
  
  // Render empty state
  if (players.length === 0) {
    return (
      <Card className="text-center p-8">
        <CardContent>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">No Players in Lineup</h3>
            <p className="text-neutral-dark">Your team is empty. Start adding players to your lineup.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Your Lineup</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Tabs defaultValue="mid">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="mid">MID ({midfielders.length})</TabsTrigger>
              <TabsTrigger value="fwd">FWD ({forwards.length})</TabsTrigger>
              <TabsTrigger value="def">DEF ({defenders.length})</TabsTrigger>
              <TabsTrigger value="ruck">RUCK ({rucks.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="mid" className="mt-4">
              <div className="grid grid-cols-2 gap-3">
                {midfielders.map(renderPlayerCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="fwd" className="mt-4">
              <div className="grid grid-cols-2 gap-3">
                {forwards.map(renderPlayerCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="def" className="mt-4">
              <div className="grid grid-cols-2 gap-3">
                {defenders.map(renderPlayerCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="ruck" className="mt-4">
              <div className="grid grid-cols-2 gap-3">
                {rucks.map(renderPlayerCard)}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Trade Analysis</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center mb-3">
                <div className="w-full bg-neutral-lightest h-10 rounded-md p-2 flex items-center">
                  <span className="text-sm">Select players to trade...</span>
                </div>
              </div>
              
              <div className="text-sm font-medium mb-2">Trade Impact Analysis</div>
              <div className="text-sm text-neutral-dark mb-2">
                The trade analysis tool helps you compare players and make data-driven decisions about potential trades.
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span>Suggested Trade Targets:</span>
              </div>
              <div className="text-sm px-2 py-1 bg-neutral-lightest rounded-md">
                Use statistical analysis to identify underpriced players with potential for improved performance.
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Captain Selection</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                  {players.length > 0 && players.find(p => p.isCaptain)?.team.substring(0, 2).toUpperCase() || 'N/A'}
                </div>
                <div>
                  <div className="font-medium">{players.length > 0 && players.find(p => p.isCaptain)?.name || 'No captain selected'}</div>
                  <div className="text-xs text-neutral-dark">Current Captain</div>
                </div>
              </div>
              
              <div className="text-sm text-neutral-dark mb-2">
                Select a captain based on statistical analysis of upcoming matchups, player form, and historical performance.
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium">Matchup Analysis:</div>
                <div className="text-sm px-2 py-1 bg-neutral-lightest rounded-md">
                  Compare player statistics against specific opponents to find favorable matchups.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}