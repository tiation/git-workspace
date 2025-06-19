
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bell, ChevronRight, MessageSquare, TrendingUp, UserCheck } from "lucide-react";

const AlertCard = ({ icon, title, description, index }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  index: number;
}) => {
  // Create a staggered animation effect
  const delay = `${index * 150}ms`;
  
  return (
    <div 
      className="bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 p-5 flex items-start gap-4 animate-fade-in"
      style={{ animationDelay: delay }}
    >
      <div className="h-10 w-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-foreground/70 text-sm">{description}</p>
      </div>
    </div>
  );
};

const AlertsSection = () => {
  const alerts = [
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "Injury Alerts",
      description: "Instant notifications when a player in your team gets injured or is a late withdrawal."
    },
    {
      icon: <UserCheck className="h-5 w-5" />,
      title: "Team Selection Alerts",
      description: "Be first to know when teams are announced and if your players are named or rested."
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Breakout Rookie Alerts",
      description: "Get notified about emerging rookies before their price skyrockets."
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: "Role Change Alerts",
      description: "Know immediately when a player's role changes to affect their scoring potential."
    }
  ];

  return (
    <section id="alerts" className="py-20 px-4 md:px-6 bg-gradient-to-b from-transparent to-secondary/20 relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Badge className="mb-4" variant="outline">LIVE ALERTS</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">Never Miss Critical Information</h2>
            <p className="text-foreground/70 text-lg mb-8">
              Get alerts for injuries, subs, role changes, and breakout rookies before the competition 
              even sees them. Our real-time notification system keeps you two steps ahead.
            </p>
            
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <AlertCard 
                  key={index}
                  icon={alert.icon}
                  title={alert.title}
                  description={alert.description}
                  index={index}
                />
              ))}
            </div>
            
            <Button className="mt-10 gap-2">
              Enable Smart Alerts <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Phone Notification Mockup */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-[300px]">
              {/* Phone Frame */}
              <div className="w-[280px] h-[570px] bg-primary/5 rounded-[40px] border-4 border-foreground/10 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 w-40 h-6 bg-foreground/10 rounded-b-xl left-1/2 transform -translate-x-1/2"></div>
                
                {/* Screen Content */}
                <div className="absolute inset-3 bg-background rounded-[32px] overflow-hidden shadow-inner p-4">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-xs">9:41</div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 rounded-full bg-foreground/20"></div>
                      <div className="w-4 h-4 rounded-full bg-foreground/20"></div>
                      <div className="w-4 h-4 rounded-full bg-foreground/20"></div>
                    </div>
                  </div>
                  
                  {/* Notification Title */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-sm font-medium">AFL Fantasy Coach</div>
                    </div>
                    <div className="text-xs text-foreground/50 ml-10">now</div>
                  </div>
                  
                  {/* Notification Content */}
                  <div className="bg-primary/10 rounded-xl p-4 mb-3 shadow-sm">
                    <h4 className="font-medium mb-1 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-primary" />
                      Late Withdrawal Alert
                    </h4>
                    <p className="text-xs text-foreground/70 mb-2">
                      Patrick Dangerfield (MID) has been withdrawn from tonight's game due to hamstring tightness.
                    </p>
                    <div className="bg-primary/20 rounded-md p-2 text-xs">
                      <strong>Suggested action:</strong> Move to bench and replace with Sam Walsh (84% owned).
                    </div>
                  </div>
                  
                  {/* Additional Notifications */}
                  <div className="bg-secondary/30 rounded-xl p-3 mb-3">
                    <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      Rookie Watch
                    </h4>
                    <p className="text-xs text-foreground/70">
                      Harley Reid's role has changed to inside mid. Projected score: 85-95
                    </p>
                  </div>
                  
                  <div className="bg-secondary/30 rounded-xl p-3 opacity-70">
                    <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      Captain Advice
                    </h4>
                    <p className="text-xs text-foreground/70">
                      Max Gawn has averaged 124 against this opponent in last 3 games.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-1/4 -right-10 h-20 w-20 bg-accent/30 rounded-full blur-xl"></div>
              <div className="absolute bottom-1/4 -left-10 h-16 w-16 bg-primary/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlertsSection;
