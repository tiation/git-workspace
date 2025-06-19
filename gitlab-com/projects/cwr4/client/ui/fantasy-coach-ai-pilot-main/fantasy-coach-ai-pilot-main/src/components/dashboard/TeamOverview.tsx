
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  ArrowUp, 
  ArrowDown, 
  DollarSign, 
  TrendingUp, 
  BarChart2,
  ShieldAlert,
  AlertCircle,
  Calendar
} from "lucide-react";

export function TeamOverview() {
  const teamStats = {
    teamValue: "$13.21M",
    rank: 4287,
    totalPoints: 1642,
    tradesRemaining: 18,
    captainPoints: 238,
    viceCaptainPoints: 202,
    loopSuccesses: 3,
    cash: "$342K",
    projectedScore: 1825,
    riskScore: "Medium",
    injuries: 2,
    byeMax: 7
  };

  const positionStatus = [
    { label: "DEF", filled: 6, total: 6, rookies: 2, premiums: 3, midPricers: 1, value: "$2.85M" },
    { label: "MID", filled: 10, total: 10, rookies: 4, premiums: 4, midPricers: 2, value: "$5.74M" },
    { label: "RUC", filled: 2, total: 2, rookies: 0, premiums: 1, midPricers: 1, value: "$1.28M" },
    { label: "FWD", filled: 6, total: 6, rookies: 3, premiums: 2, midPricers: 1, value: "$3.34M" },
  ];

  const roundPerformance = [
    { round: 1, points: 1642, rank: 4287, change: "initial" },
    { round: 2, points: 1589, rank: 8234, change: "down" },
    { round: 3, points: 1732, rank: 3211, change: "up" },
    { round: 4, points: 1803, rank: 1872, change: "up" },
    { round: 5, points: 1652, rank: 2341, change: "down" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-afl-primary">Team Overview</h1>
        <p className="text-muted-foreground">Your team's performance at a glance</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="animate-slide-up [animation-delay:100ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Team Value
            </CardTitle>
            <CardDescription>Current team value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.teamValue}</div>
            <p className="text-xs text-muted-foreground">{teamStats.cash} remaining</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up [animation-delay:200ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-afl-primary" />
              Overall Rank
            </CardTitle>
            <CardDescription>Position in competition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.rank}</div>
            <div className="flex items-center gap-1 text-xs">
              {roundPerformance[roundPerformance.length - 1].change === "up" ? (
                <>
                  <ArrowUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">Improved</span>
                </>
              ) : (
                <>
                  <ArrowDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">Dropped</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-slide-up [animation-delay:300ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-afl-accent" />
              Points
            </CardTitle>
            <CardDescription>Total points scored</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.totalPoints}</div>
            <p className="text-xs text-muted-foreground">Proj. {teamStats.projectedScore} next round</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up [animation-delay:400ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-afl-warning" />
              Risk Level
            </CardTitle>
            <CardDescription>Team vulnerability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.riskScore}</div>
            <p className="text-xs text-muted-foreground">{teamStats.injuries} injuries</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Position Breakdown</CardTitle>
            <CardDescription>Player distribution by position</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {positionStatus.map((position) => (
                <div key={position.label} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{position.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {position.filled}/{position.total} players
                      </span>
                    </div>
                    <span className="text-sm font-medium">{position.value}</span>
                  </div>
                  <Progress value={(position.filled / position.total) * 100} />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{position.rookies} Rookies</span>
                    <span>{position.midPricers} Mid-pricers</span>
                    <span>{position.premiums} Premiums</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full">View Details</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Performance</CardTitle>
            <CardDescription>Team performance by round</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roundPerformance.map((round) => (
                <div key={round.round} className="flex items-center space-x-4">
                  <div className="bg-muted rounded-md p-2 w-10 text-center font-bold">
                    R{round.round}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{round.points} points</div>
                      <div className="flex items-center text-sm">
                        Rank: {round.rank}
                        {round.change === "up" && (
                          <ArrowUp className="ml-1 h-3 w-3 text-green-500" />
                        )}
                        {round.change === "down" && (
                          <ArrowDown className="ml-1 h-3 w-3 text-red-500" />
                        )}
                      </div>
                    </div>
                    <Progress 
                      value={Math.min(Math.max(round.points / 20, 50), 100)} 
                      className={
                        round.change === "up" 
                          ? "bg-muted/50 [&>div]:bg-green-500" 
                          : round.change === "down" 
                            ? "bg-muted/50 [&>div]:bg-red-500" 
                            : "bg-muted/50"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4 text-afl-warning" />
              <span>Captain success rate: 60%</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-afl-secondary" />
              <span>Max bye players: {teamStats.byeMax}</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
