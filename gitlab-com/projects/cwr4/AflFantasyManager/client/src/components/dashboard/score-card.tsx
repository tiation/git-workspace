import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, Award, BarChart2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export type ScoreCardProps = {
  title: string;
  value: string;
  change?: string;
  icon?: "chart" | "award" | "trend-up" | "arrow-up";
  isPositive?: boolean;
  className?: string;
};

export default function ScoreCard({ 
  title, 
  value, 
  change, 
  icon = "trend-up",
  isPositive = true,
  className 
}: ScoreCardProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-medium">{title}</h2>
          <div className="text-secondary">
            {icon === "chart" && <BarChart2 className="h-5 w-5" />}
            {icon === "award" && <Award className="h-5 w-5" />}
            {icon === "trend-up" && <TrendingUp className="h-5 w-5" />}
            {icon === "arrow-up" && <ArrowUp className="h-5 w-5" />}
          </div>
        </div>
        <div className="text-3xl font-bold">{value}</div>
        {change && (
          <div className={cn(
            "text-sm mt-1", 
            isPositive ? "text-status-positive" : "text-status-negative"
          )}>
            {change}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
