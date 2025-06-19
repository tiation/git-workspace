
import { 
  Activity, 
  AlertTriangle, 
  BarChart2, 
  Brain, 
  LineChart, 
  Coins, 
  Search, 
  Star, 
  Trophy, 
  Users 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isNew?: boolean;
}

const Feature = ({ icon, title, description, isNew }: FeatureProps) => {
  return (
    <Card className="bg-card/60 backdrop-blur-sm hover:shadow-md transition-shadow overflow-hidden border border-border/50 h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
          {isNew && <Badge className="bg-accent text-accent-foreground">NEW</Badge>}
        </div>
        <CardTitle className="text-xl mt-3">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-foreground/70 text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

const FeatureSection = () => {
  const features = [
    {
      icon: <BarChart2 className="h-5 w-5" />,
      title: "Complete Player Dashboard",
      description: "Track every player's role, price movement, breakeven, and projected score — all in one clean, searchable dashboard."
    },
    {
      icon: <Search className="h-5 w-5" />,
      title: "Advanced Search & Filters",
      description: "Filter players by any stat, trend, or metric to find the perfect additions to your fantasy team."
    },
    {
      icon: <LineChart className="h-5 w-5" />,
      title: "Price Projection",
      description: "Forecast player price movements to buy low and sell high, maximizing your team value throughout the season."
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      title: "Captain Optimizer",
      description: "Identifies your optimal captain choices each round based on form, matchup, and historical performance."
    },
    {
      icon: <Activity className="h-5 w-5" />,
      title: "Loop Planner",
      description: "Plan your trades and moves weeks in advance with our intuitive loop planning tool.",
      isNew: true
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "Instant Alerts",
      description: "Get crucial notifications for injuries, subs, role changes, and breakout rookies before your competition."
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: "AI-Powered Advice",
      description: "Receive personalized team advice powered by advanced AI that learns your preferences and league format."
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "League Domination",
      description: "Special tools for head-to-head leagues help you counter opponent strategies and exploit weaknesses."
    },
    {
      icon: <Coins className="h-5 w-5" />,
      title: "Value Tracking",
      description: "Monitor ROI on every player to maximize value and help you climb the rankings."
    }
  ];

  return (
    <section id="features" className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4" variant="outline">FEATURES</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Everything You Need in One App</h2>
          <p className="text-foreground/70 text-lg">
            Packed with powerful features designed specifically for serious AFL Fantasy coaches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              isNew={feature.isNew}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
