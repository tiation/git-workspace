
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShieldAlert, 
  AlertTriangle, 
  AlertCircle, 
  Check, 
  XCircle,
  Clock,
  CloudRain,
  UserX
} from "lucide-react";

export function RiskAnalysis() {
  const [riskView, setRiskView] = useState("injuries");
  
  const injuryData = [
    {
      id: 1,
      player: "Zach Merrett",
      team: "Essendon",
      position: "MID",
      injury: "Ankle",
      status: "Test",
      returnEstimate: "Round 6-7",
      ownership: "42%",
      riskLevel: "medium"
    },
    {
      id: 2,
      player: "Tom Stewart",
      team: "Geelong",
      position: "DEF",
      injury: "Concussion",
      status: "Out",
      returnEstimate: "Round 7",
      ownership: "38%",
      riskLevel: "high"
    },
    {
      id: 3,
      player: "Harry McKay",
      team: "Carlton",
      position: "FWD",
      injury: "Knee",
      status: "Test",
      returnEstimate: "Round 6",
      ownership: "24%",
      riskLevel: "medium"
    },
    {
      id: 4,
      player: "Sam Taylor",
      team: "GWS",
      position: "DEF",
      injury: "Hamstring",
      status: "Out",
      returnEstimate: "Round 8-9",
      ownership: "17%",
      riskLevel: "high"
    },
    {
      id: 5,
      player: "Caleb Daniel",
      team: "Western Bulldogs",
      position: "DEF/MID",
      injury: "Foot",
      status: "Test",
      returnEstimate: "Round 6",
      ownership: "12%",
      riskLevel: "low"
    }
  ];
  
  const lateOutRisks = [
    {
      id: 1,
      player: "Isaac Heeney",
      team: "Sydney",
      position: "MID/FWD",
      concern: "Managed (Knee)",
      riskPercentage: 35,
      status: "Named",
      riskLevel: "medium"
    },
    {
      id: 2,
      player: "Jordan De Goey",
      team: "Collingwood",
      position: "MID/FWD",
      concern: "Soreness",
      riskPercentage: 25,
      status: "Named",
      riskLevel: "medium"
    },
    {
      id: 3,
      player: "Patrick Cripps",
      team: "Carlton",
      position: "MID",
      concern: "Managed (Load)",
      riskPercentage: 15,
      status: "Named",
      riskLevel: "low"
    }
  ];
  
  const roleRisks = [
    {
      id: 1,
      player: "Tim English",
      team: "Western Bulldogs",
      position: "RUC",
      concern: "Forward time increasing",
      impact: "Less center bounces",
      riskLevel: "high"
    },
    {
      id: 2,
      player: "Zak Butters",
      team: "Port Adelaide",
      position: "MID/FWD",
      concern: "Forward rotation",
      impact: "Fewer midfield minutes",
      riskLevel: "medium"
    },
    {
      id: 3,
      player: "Andrew Brayshaw",
      team: "Fremantle",
      position: "MID",
      concern: "Tagging role",
      impact: "Reduced scoring output",
      riskLevel: "medium"
    }
  ];
  
  const vestRisks = [
    {
      id: 1,
      player: "Harry Sharp",
      team: "Brisbane",
      position: "MID",
      concern: "Substitute risk",
      pastVests: 2,
      riskLevel: "high"
    },
    {
      id: 2,
      player: "Noah Anderson",
      team: "Gold Coast",
      position: "MID",
      concern: "Managed minutes",
      pastVests: 1,
      riskLevel: "medium"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-afl-primary">Risk Analysis</h1>
        <p className="text-muted-foreground">Monitor and manage risks in your fantasy team</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="animate-slide-up [animation-delay:100ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-afl-secondary" />
              Injuries
            </CardTitle>
            <CardDescription>Current injury concerns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 high risk injuries</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up [animation-delay:200ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <UserX className="h-5 w-5 text-afl-warning" />
              Late Out Risk
            </CardTitle>
            <CardDescription>Potential late withdrawals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 player at high risk</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up [animation-delay:300ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Clock className="h-5 w-5 text-afl-warning" />
              Vest Risk
            </CardTitle>
            <CardDescription>Potential substitute players</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">1 player at high risk</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up [animation-delay:400ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <CloudRain className="h-5 w-5 text-afl-primary" />
              Weather Impact
            </CardTitle>
            <CardDescription>Conditions affecting scoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Low</div>
            <p className="text-xs text-muted-foreground">Clear conditions forecast</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risk Tracker</CardTitle>
          <CardDescription>
            Analyze and manage risks in your fantasy team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="injuries" value={riskView} onValueChange={setRiskView}>
            <TabsList className="mb-4 grid grid-cols-1 md:grid-cols-4">
              <TabsTrigger value="injuries">Injury Status</TabsTrigger>
              <TabsTrigger value="lateOuts">Late Out Risk</TabsTrigger>
              <TabsTrigger value="roles">Role Changes</TabsTrigger>
              <TabsTrigger value="vest">Vest Risk</TabsTrigger>
            </TabsList>
            
            <TabsContent value="injuries">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Injury</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expected Return</TableHead>
                      <TableHead>Ownership</TableHead>
                      <TableHead>Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {injuryData.map((player) => (
                      <TableRow key={player.id}>
                        <TableCell className="font-medium">
                          <div>
                            {player.player}
                            <div className="text-xs text-muted-foreground">{player.team}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{player.position}</Badge>
                        </TableCell>
                        <TableCell>{player.injury}</TableCell>
                        <TableCell>
                          <Badge variant={player.status === "Out" ? "destructive" : "outline"}>
                            {player.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{player.returnEstimate}</TableCell>
                        <TableCell>{player.ownership}</TableCell>
                        <TableCell>
                          <Badge variant={
                            player.riskLevel === "low" 
                              ? "outline" 
                              : player.riskLevel === "medium" 
                                ? "secondary" 
                                : "destructive"
                          }>
                            {player.riskLevel}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="lateOuts">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Concern</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Risk Percentage</TableHead>
                      <TableHead>Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lateOutRisks.map((player) => (
                      <TableRow key={player.id}>
                        <TableCell className="font-medium">
                          <div>
                            {player.player}
                            <div className="text-xs text-muted-foreground">{player.team}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{player.position}</Badge>
                        </TableCell>
                        <TableCell>{player.concern}</TableCell>
                        <TableCell>
                          <Badge variant={player.status === "Named" ? "outline" : "destructive"}>
                            {player.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={player.riskPercentage} className="h-2 w-24" />
                            <span className="text-sm">{player.riskPercentage}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            player.riskLevel === "low" 
                              ? "outline" 
                              : player.riskLevel === "medium" 
                                ? "secondary" 
                                : "destructive"
                          }>
                            {player.riskLevel}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 rounded-md bg-muted/50 p-4 flex items-center gap-2 text-sm">
                <AlertCircle className="h-5 w-5 text-afl-warning" />
                <div>
                  <span className="font-medium">Risk Alert:</span> Always check team sheets before lockout to confirm selections.
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="roles">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Role Concern</TableHead>
                      <TableHead>Potential Impact</TableHead>
                      <TableHead>Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roleRisks.map((player) => (
                      <TableRow key={player.id}>
                        <TableCell className="font-medium">
                          <div>
                            {player.player}
                            <div className="text-xs text-muted-foreground">{player.team}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{player.position}</Badge>
                        </TableCell>
                        <TableCell>{player.concern}</TableCell>
                        <TableCell>{player.impact}</TableCell>
                        <TableCell>
                          <Badge variant={
                            player.riskLevel === "low" 
                              ? "outline" 
                              : player.riskLevel === "medium" 
                                ? "secondary" 
                                : "destructive"
                          }>
                            {player.riskLevel}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="vest">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Concern</TableHead>
                      <TableHead>Past Vests</TableHead>
                      <TableHead>Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vestRisks.map((player) => (
                      <TableRow key={player.id}>
                        <TableCell className="font-medium">
                          <div>
                            {player.player}
                            <div className="text-xs text-muted-foreground">{player.team}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{player.position}</Badge>
                        </TableCell>
                        <TableCell>{player.concern}</TableCell>
                        <TableCell>{player.pastVests}</TableCell>
                        <TableCell>
                          <Badge variant={
                            player.riskLevel === "low" 
                              ? "outline" 
                              : player.riskLevel === "medium" 
                                ? "secondary" 
                                : "destructive"
                          }>
                            {player.riskLevel}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 rounded-md bg-muted/50 p-4 flex items-center gap-2 text-sm">
                <ShieldAlert className="h-5 w-5 text-afl-secondary" />
                <div>
                  <span className="font-medium">Vest Risk Analysis:</span> Based on past substitution patterns and player roles.
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
