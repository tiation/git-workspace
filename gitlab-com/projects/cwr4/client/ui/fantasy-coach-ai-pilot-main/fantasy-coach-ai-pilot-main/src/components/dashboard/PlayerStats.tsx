
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Clock, Activity } from "lucide-react";

interface PlayerStatsProps {
  searchQuery: string;
}

export function PlayerStats({ searchQuery }: PlayerStatsProps) {
  const [activeTab, setActiveTab] = useState("all");
  
  const players = [
    {
      id: 1,
      name: "Marcus Bontempelli",
      team: "Western Bulldogs",
      position: "MID",
      price: "$915,000",
      average: 115.8,
      breakeven: 122,
      trend: "up",
      role: "Inside Mid / Forward",
      timeOnGround: "85%",
      ownership: "35%",
      lastScores: [134, 108, 126, 95, 116],
    },
    {
      id: 2,
      name: "Sam Walsh",
      team: "Carlton",
      position: "MID",
      price: "$863,000",
      average: 109.2,
      breakeven: 95,
      trend: "up",
      role: "Outside Mid",
      timeOnGround: "82%",
      ownership: "28%",
      lastScores: [122, 95, 114, 108, 107],
    },
    {
      id: 3,
      name: "Nick Daicos",
      team: "Collingwood",
      position: "MID/DEF",
      price: "$894,000",
      average: 113.5,
      breakeven: 118,
      trend: "down",
      role: "Half Back / Mid",
      timeOnGround: "88%",
      ownership: "42%",
      lastScores: [97, 121, 112, 128, 110],
    },
    {
      id: 4,
      name: "Connor Rozee",
      team: "Port Adelaide",
      position: "MID/FWD",
      price: "$817,000",
      average: 103.4,
      breakeven: 92,
      trend: "up",
      role: "Mid / Forward",
      timeOnGround: "80%",
      ownership: "22%",
      lastScores: [123, 87, 112, 95, 100],
    },
    {
      id: 5,
      name: "Max Gawn",
      team: "Melbourne",
      position: "RUC",
      price: "$871,000",
      average: 110.3,
      breakeven: 125,
      trend: "down",
      role: "Primary Ruck",
      timeOnGround: "92%",
      ownership: "31%",
      lastScores: [98, 114, 121, 105, 114],
    },
  ];

  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayPlayers = activeTab === "all" 
    ? filteredPlayers 
    : filteredPlayers.filter(player => player.position.includes(activeTab.toUpperCase()));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-afl-primary">Player Stats & Roles</h1>
        <p className="text-muted-foreground">Track player performance, roles, and trends.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="animate-slide-up [animation-delay:100ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Users className="h-5 w-5 text-afl-primary" />
              Top Players
            </CardTitle>
            <CardDescription>Most valuable fantasy assets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">Players analyzed</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up [animation-delay:200ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Activity className="h-5 w-5 text-afl-primary" />
              Role Changes
            </CardTitle>
            <CardDescription>Recent role adjustments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">New changes this week</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up [animation-delay:300ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-afl-accent" />
              Price Risers
            </CardTitle>
            <CardDescription>Players increasing in value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43</div>
            <p className="text-xs text-muted-foreground">Players trending up</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up [animation-delay:400ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-afl-secondary" />
              Price Fallers
            </CardTitle>
            <CardDescription>Players decreasing in value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">31</div>
            <p className="text-xs text-muted-foreground">Players trending down</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Player Analysis</CardTitle>
          <CardDescription>
            View detailed stats, roles, and projections for players.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="def">DEF</TabsTrigger>
              <TabsTrigger value="mid">MID</TabsTrigger>
              <TabsTrigger value="ruc">RUC</TabsTrigger>
              <TabsTrigger value="fwd">FWD</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Avg</TableHead>
                      <TableHead>BE</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>TOG</TableHead>
                      <TableHead>Ownership</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayPlayers.length > 0 ? (
                      displayPlayers.map((player) => (
                        <TableRow key={player.id}>
                          <TableCell className="font-medium">
                            <div>
                              {player.name}
                              <div className="text-xs text-muted-foreground">{player.team}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{player.position}</Badge>
                          </TableCell>
                          <TableCell>{player.price}</TableCell>
                          <TableCell className="font-semibold">{player.average}</TableCell>
                          <TableCell className="flex items-center gap-1">
                            {player.breakeven}
                            {player.trend === "up" ? (
                              <TrendingUp className="h-4 w-4 text-afl-accent" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-afl-secondary" />
                            )}
                          </TableCell>
                          <TableCell>{player.role}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              {player.timeOnGround}
                            </div>
                          </TableCell>
                          <TableCell>{player.ownership}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-4">
                          No players found. Try adjusting your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
