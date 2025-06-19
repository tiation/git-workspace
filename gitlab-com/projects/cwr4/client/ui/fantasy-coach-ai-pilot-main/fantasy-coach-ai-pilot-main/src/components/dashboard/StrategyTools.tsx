
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Star, 
  Calendar, 
  TrendingUp, 
  Map, 
  Cloud, 
  BarChart,
  RefreshCw
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function StrategyTools() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-afl-primary">Strategy Tools</h1>
        <p className="text-muted-foreground">Optimization tools for advanced fantasy strategy</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="animate-slide-up [animation-delay:100ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Star className="h-5 w-5 text-afl-warning" />
              Captain Optimizer
            </CardTitle>
            <CardDescription>Maximize your captain points</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="font-medium">Top Captain Pick</div>
              <div className="text-2xl font-bold">Marcus Bontempelli</div>
              <div className="text-sm text-muted-foreground">Projected: 134 points</div>
              <Button variant="outline" size="sm" className="w-full">View Rankings</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-slide-up [animation-delay:200ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-afl-primary" />
              Loop Planner
            </CardTitle>
            <CardDescription>VC/C looping strategy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="font-medium">Suggested Loop</div>
              <div className="text-2xl font-bold">VC → Darcy Parish</div>
              <div className="text-sm text-muted-foreground">Success Rate: 68%</div>
              <Button variant="outline" size="sm" className="w-full">Generate Plan</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-slide-up [animation-delay:300ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Calendar className="h-5 w-5 text-afl-secondary" />
              Bye Planner
            </CardTitle>
            <CardDescription>Manage bye round coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="font-medium">Bye Round Risk</div>
              <div className="text-2xl font-bold">Round 13</div>
              <div className="text-sm text-muted-foreground">7 players on bye</div>
              <Button variant="outline" size="sm" className="w-full">View Breakdown</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Forecasting & Strategy Tools</CardTitle>
              <CardDescription>
                Advanced tools to plan and optimize your team
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="round">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Round" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="round">This Round</SelectItem>
                  <SelectItem value="season">Full Season</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="captain">
            <TabsList className="mb-4 grid grid-cols-1 md:grid-cols-4">
              <TabsTrigger value="captain">Captain Tools</TabsTrigger>
              <TabsTrigger value="fixture">Fixture Analyzer</TabsTrigger>
              <TabsTrigger value="bye">Bye Planner</TabsTrigger>
              <TabsTrigger value="weather">Weather Impact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="captain">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Captain Rankings</CardTitle>
                    <CardDescription>Top projected captains</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-afl-primary text-xs font-bold text-white">1</div>
                        <div>
                          <div className="font-medium">Marcus Bontempelli</div>
                          <div className="text-xs text-muted-foreground">Western Bulldogs</div>
                        </div>
                      </div>
                      <div className="text-afl-primary font-bold">134</div>
                    </div>
                    
                    <div className="flex items-center justify-between pb-2 border-b">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-afl-primary/80 text-xs font-bold text-white">2</div>
                        <div>
                          <div className="font-medium">Max Gawn</div>
                          <div className="text-xs text-muted-foreground">Melbourne</div>
                        </div>
                      </div>
                      <div className="text-afl-primary font-bold">127</div>
                    </div>
                    
                    <div className="flex items-center justify-between pb-2 border-b">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-afl-primary/60 text-xs font-bold text-white">3</div>
                        <div>
                          <div className="font-medium">Sam Walsh</div>
                          <div className="text-xs text-muted-foreground">Carlton</div>
                        </div>
                      </div>
                      <div className="text-afl-primary font-bold">125</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-afl-primary/40 text-xs font-bold text-white">4</div>
                        <div>
                          <div className="font-medium">Nick Daicos</div>
                          <div className="text-xs text-muted-foreground">Collingwood</div>
                        </div>
                      </div>
                      <div className="text-afl-primary font-bold">120</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">VC Loop Options</CardTitle>
                    <CardDescription>Thursday/Friday players</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-afl-secondary text-xs font-bold text-white">VC</div>
                        <div>
                          <div className="font-medium">Darcy Parish</div>
                          <div className="text-xs text-muted-foreground">Essendon</div>
                        </div>
                      </div>
                      <div className="text-afl-secondary font-bold">118</div>
                    </div>
                    
                    <div className="flex items-center justify-between pb-2 border-b">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-afl-secondary/80 text-xs font-bold text-white">VC</div>
                        <div>
                          <div className="font-medium">Jordan Dawson</div>
                          <div className="text-xs text-muted-foreground">Adelaide</div>
                        </div>
                      </div>
                      <div className="text-afl-secondary font-bold">112</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-afl-secondary/60 text-xs font-bold text-white">VC</div>
                        <div>
                          <div className="font-medium">Touk Miller</div>
                          <div className="text-xs text-muted-foreground">Gold Coast</div>
                        </div>
                      </div>
                      <div className="text-afl-secondary font-bold">106</div>
                    </div>
                    
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">Generate Loop Plan</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Captain Risk Matrix</CardTitle>
                    <CardDescription>Risk vs. reward analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-48 w-full bg-muted rounded-md grid place-items-center text-sm text-muted-foreground">
                        Risk Matrix Chart
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Highest Ceiling:</span>
                          <span className="font-medium">Bontempelli (156)</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Lowest Risk:</span>
                          <span className="font-medium">Daicos (4.2%)</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>POD Captain:</span>
                          <span className="font-medium">Darcy (8% owned)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="fixture">
              <div className="flex items-center justify-center p-12 border rounded-md">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Fixture Difficulty Matrix</h3>
                  <p className="text-muted-foreground">Analyze the difficulty of upcoming matches</p>
                  <div className="flex justify-center gap-2 mt-4">
                    <Map className="h-5 w-5 text-afl-primary" />
                    <TrendingUp className="h-5 w-5 text-afl-accent" />
                    <BarChart className="h-5 w-5 text-afl-secondary" />
                  </div>
                  <Button className="mt-4">View Fixtures</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="bye">
              <div className="flex items-center justify-center p-12 border rounded-md">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Bye Round Planner</h3>
                  <p className="text-muted-foreground">Strategy for navigating the bye rounds</p>
                  <Button className="mt-4">Plan Byes</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="weather">
              <div className="flex items-center justify-center p-12 border rounded-md">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Weather Impact Analysis</h3>
                  <p className="text-muted-foreground">How weather affects player scoring</p>
                  <div className="flex justify-center mt-2">
                    <Cloud className="h-6 w-6 text-afl-warning" />
                  </div>
                  <Button className="mt-4">Check Forecast</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
