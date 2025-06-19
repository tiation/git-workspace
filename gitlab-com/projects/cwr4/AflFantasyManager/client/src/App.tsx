import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";
import { useIsMobile } from "@/hooks/use-mobile";
import Dashboard from "@/pages/dashboard";
import Lineup from "@/pages/lineup";
import Leagues from "@/pages/leagues";
import Stats from "@/pages/stats";
import PlayerStats from "@/pages/player-stats";
import Tools from "@/pages/tools";

function MainLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen bg-neutral-lightest">
      {!isMobile && <Sidebar />}
      <div className="flex-1 overflow-auto">
        <Header />
        <div className={`p-4 ${isMobile ? 'pb-20' : ''} bg-blue-50`}>
          {children}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => (
        <MainLayout>
          <Dashboard />
        </MainLayout>
      )} />
      <Route path="/player-stats" component={() => (
        <MainLayout>
          <PlayerStats />
        </MainLayout>
      )} />
      <Route path="/lineup" component={() => (
        <MainLayout>
          <Lineup />
        </MainLayout>
      )} />
      <Route path="/leagues" component={() => (
        <MainLayout>
          <Leagues />
        </MainLayout>
      )} />
      <Route path="/stats" component={() => (
        <MainLayout>
          <Stats />
        </MainLayout>
      )} />
      <Route path="/tools" component={() => (
        <MainLayout>
          <Tools />
        </MainLayout>
      )} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;