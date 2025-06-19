
import { useState } from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { 
  BarChart2, 
  Users, 
  TrendingUp, 
  ShieldAlert, 
  Activity,
  Star, 
  Calendar, 
  ArrowRightLeft, 
  BarChart, 
  Brain,
  Settings,
  Bell,
  Eye,
  Clock
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  activeView: 'overview' | 'players' | 'trades' | 'strategy' | 'risk';
  setActiveView: (view: 'overview' | 'players' | 'trades' | 'strategy' | 'risk') => void;
}

export function DashboardSidebar({ activeView, setActiveView }: DashboardSidebarProps) {
  const [notifications, setNotifications] = useState(3);

  const menuItems = [
    {
      label: "Overview",
      value: "overview",
      icon: <BarChart2 className="text-afl-primary" />,
    },
    {
      label: "Player Stats",
      value: "players",
      icon: <Users className="text-afl-primary" />,
    },
    {
      label: "Trade Center",
      value: "trades",
      icon: <ArrowRightLeft className="text-afl-primary" />,
    },
    {
      label: "Strategy Tools",
      value: "strategy",
      icon: <Activity className="text-afl-primary" />,
    },
    {
      label: "Risk Analysis",
      value: "risk",
      icon: <ShieldAlert className="text-afl-primary" />,
    },
  ];

  const featureItems = [
    {
      label: "Captain Tools",
      icon: <Star className="text-afl-secondary" />,
    },
    {
      label: "Bye Planner",
      icon: <Calendar className="text-afl-secondary" />,
    },
    {
      label: "Watchlist",
      icon: <Eye className="text-afl-secondary" />,
    },
    {
      label: "Alerts",
      icon: <Bell className="text-afl-secondary" />,
      badge: notifications,
    },
    {
      label: "AI Coach",
      icon: <Brain className="text-afl-secondary" />,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-0">
        <div className="flex h-16 items-center border-b px-4">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-afl-primary p-1.5">
              <BarChart className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-afl-primary">AFL Fantasy</span>
              <span className="text-xs text-muted-foreground">Coach Assistant</span>
            </div>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton 
                    data-active={activeView === item.value}
                    onClick={() => setActiveView(item.value as any)}
                    className={cn(
                      activeView === item.value 
                        ? "bg-sidebar-accent text-afl-primary font-medium" 
                        : "text-sidebar-foreground"
                    )}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <Separator className="mx-2 my-2" />
        
        <SidebarGroup>
          <SidebarGroupLabel>Key Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {featureItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton className="relative">
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                    {item.badge && (
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-afl-secondary text-xs font-medium text-white">
                        {item.badge}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="mt-auto border-t p-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-afl-primary text-primary-foreground">FC</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Fantasy Coach</span>
            <span className="text-xs text-muted-foreground">Pro Account</span>
          </div>
          <Settings className="ml-auto h-4 w-4 text-muted-foreground" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
