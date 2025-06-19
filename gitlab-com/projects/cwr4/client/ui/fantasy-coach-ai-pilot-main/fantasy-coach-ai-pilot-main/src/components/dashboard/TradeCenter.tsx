
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftRight, TrendingUp, TrendingDown, AlertCircle, AlertTriangle } from "lucide-react";

export function TradeCenter() {
  const [tradeView, setTradeView] = useState("suggestions");
  
  const tradeSuggestions = [
    {
      id: 1,
      tradeOut: {
        name: "Tim English",
        team: "Western Bulldogs",
        position: "RUC",
        price: "$892,000",
        breakeven: 145,
        ownership: "28%",
        risk: "high",
        reason: "Very high BE, fixtures getting tough"
      },
      tradeIn: {
        name: "Brodie Grundy",
        team: "Sydney",
        position: "RUC",
        price: "$751,000",
        breakeven: 84,
        ownership: "13%",
        risk: "low",
        reason: "Low BE, excellent upcoming fixtures"
      },
      impact: "+$141,000",
      riskLevel: "medium",
      priorityLevel: "high"
    },
    {
      id: 2,
      tradeOut: {
        name: "Isaac Heeney",
        team: "Sydney",
        position: "MID/FWD",
        price: "$814,000",
        breakeven: 126,
        ownership: "33%",
        risk: "medium",
        reason: "High BE, role uncertainty"
      },
      tradeIn: {
        name: "Nick Daicos",
        team: "Collingwood",
        position: "MID/DEF",
        price: "$894,000",
        breakeven: 118,
        ownership: "42%",
        risk: "low",
        reason: "Consistent scorer, position flexibility"
      },
      impact: "-$80,000",
      riskLevel: "low",
      priorityLevel: "medium"
    },
    {
      id: 3,
      tradeOut: {
        name: "Harry Sharp",
        team: "Brisbane",
        position: "MID",
        price: "$374,000",
        breakeven: 67,
        ownership: "18%",
        risk: "high",
        reason: "Role diminishing, likely selection pressure"
      },
      tradeIn: {
        name: "Darcy Wilson",
        team: "St Kilda",
        position: "MID/FWD",
        price: "$242,000",
        breakeven: -21,
        ownership: "5%",
        risk: "low",
        reason: "Cash cow, role increasing, good JS"
      },
      impact: "+$132,000",
      riskLevel: "low",
      priorityLevel: "high"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-afl-primary">Trade Center</h1>
        <p className="text-muted-foreground">Analyze and plan trades with AI-powered insights</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="animate-slide-up [animation-delay:100ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <ArrowLeftRight className="h-5 w-5 text-afl-primary" />
              Trades Remaining
            </CardTitle>
            <CardDescription>Trades left for the season</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Used 12 of 30 trades</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up [animation-delay:200ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-afl-warning" />
              Trade Targets
            </CardTitle>
            <CardDescription>Priority moves this round</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 high priority trades</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up [animation-delay:300ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-afl-secondary" />
              Risk Assessment
            </CardTitle>
            <CardDescription>Trade risk analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Medium</div>
            <p className="text-xs text-muted-foreground">1 high risk trade identified</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Trade Analysis</CardTitle>
              <CardDescription>
                AI-powered trade suggestions based on your team
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="round6">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Round" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="round6">Round 6</SelectItem>
                  <SelectItem value="round7">Round 7</SelectItem>
                  <SelectItem value="round8">Round 8</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="suggestions" value={tradeView} onValueChange={setTradeView}>
            <TabsList className="mb-4">
              <TabsTrigger value="suggestions">Trade Suggestions</TabsTrigger>
              <TabsTrigger value="planner">Trade Planner</TabsTrigger>
              <TabsTrigger value="targets">Value Targets</TabsTrigger>
            </TabsList>
            <TabsContent value="suggestions">
              <div className="space-y-6">
                {tradeSuggestions.map((trade) => (
                  <Card key={trade.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex-1 border-r-0 sm:border-r p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-semibold text-afl-secondary">Trade Out</div>
                          <Badge variant="outline" className="bg-red-50">
                            {trade.tradeOut.position}
                          </Badge>
                        </div>
                        <div className="mt-2 space-y-2">
                          <div className="text-xl font-bold">{trade.tradeOut.name}</div>
                          <div className="text-sm text-muted-foreground">{trade.tradeOut.team}</div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Price:</span>
                              <span>{trade.tradeOut.price}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">BE:</span>
                              <span>{trade.tradeOut.breakeven}</span>
                              <TrendingUp className="h-4 w-4 text-red-500" />
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Reason: </span>
                            <span className="text-muted-foreground">{trade.tradeOut.reason}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-semibold text-afl-accent">Trade In</div>
                          <Badge variant="outline" className="bg-green-50">
                            {trade.tradeIn.position}
                          </Badge>
                        </div>
                        <div className="mt-2 space-y-2">
                          <div className="text-xl font-bold">{trade.tradeIn.name}</div>
                          <div className="text-sm text-muted-foreground">{trade.tradeIn.team}</div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Price:</span>
                              <span>{trade.tradeIn.price}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">BE:</span>
                              <span>{trade.tradeIn.breakeven}</span>
                              <TrendingDown className="h-4 w-4 text-green-500" />
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Reason: </span>
                            <span className="text-muted-foreground">{trade.tradeIn.reason}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-muted/30 p-3 border-t">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">Cash Impact:</span>
                          <span className={trade.impact.includes("+") ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                            {trade.impact}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">Risk:</span>
                          <Badge variant={
                            trade.riskLevel === "low" 
                              ? "outline" 
                              : trade.riskLevel === "medium" 
                                ? "secondary" 
                                : "destructive"
                          }>
                            {trade.riskLevel}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">Priority:</span>
                          <Badge variant={
                            trade.priorityLevel === "low" 
                              ? "outline" 
                              : trade.priorityLevel === "medium" 
                                ? "secondary" 
                                : "default"
                          }>
                            {trade.priorityLevel}
                          </Badge>
                        </div>
                      </div>
                      <Button>Execute Trade</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="planner">
              <div className="flex items-center justify-center p-12 border rounded-md">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Trade Planner</h3>
                  <p className="text-muted-foreground">Plan your trades for upcoming rounds</p>
                  <Button className="mt-4">Create New Plan</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="targets">
              <div className="flex items-center justify-center p-12 border rounded-md">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Value Targets</h3>
                  <p className="text-muted-foreground">Players with high value potential</p>
                  <Button className="mt-4">View Targets</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
