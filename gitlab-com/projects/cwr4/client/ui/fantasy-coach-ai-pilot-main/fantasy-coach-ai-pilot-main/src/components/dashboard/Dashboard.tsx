
import { useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { PlayerStats } from "./PlayerStats";
import { TeamOverview } from "./TeamOverview";
import { TradeCenter } from "./TradeCenter";
import { StrategyTools } from "./StrategyTools";
import { RiskAnalysis } from "./RiskAnalysis";
import { Button } from "@/components/ui/button";
import { 
  SidebarProvider, 
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarInset
} from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type DashboardView = 'overview' | 'players' | 'trades' | 'strategy' | 'risk';

export function Dashboard() {
  const [activeView, setActiveView] = useState<DashboardView>('overview');
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar activeView={activeView} setActiveView={setActiveView} />
        
        <SidebarInset className="animate-fade-in">
          <header className="border-b bg-card/50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold text-afl-primary">AFL Fantasy Coach</h1>
              </div>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search players, teams..."
                  className="w-full pl-8 bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="text-afl-neutral">
                  My Team
                </Button>
                <Button size="sm" className="bg-afl-primary text-white hover:bg-afl-primary/90">
                  AI Assistant
                </Button>
              </div>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            {activeView === 'overview' && <TeamOverview />}
            {activeView === 'players' && <PlayerStats searchQuery={searchQuery} />}
            {activeView === 'trades' && <TradeCenter />}
            {activeView === 'strategy' && <StrategyTools />}
            {activeView === 'risk' && <RiskAnalysis />}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
