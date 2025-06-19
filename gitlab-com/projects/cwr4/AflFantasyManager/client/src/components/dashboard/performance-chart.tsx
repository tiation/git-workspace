import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  TooltipProps 
} from "recharts";
import { 
  NameType, 
  ValueType 
} from "recharts/types/component/DefaultTooltipContent";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type RoundData = {
  round: number;
  actualScore: number;
  projectedScore: number;
  rank?: number;
  teamValue?: number;
};

type PerformanceChartProps = {
  data: RoundData[];
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded p-2 text-sm">
        <div className="font-medium mb-1">R{label}</div>
        <div className="flex items-center text-secondary">
          <div className="w-2 h-2 rounded-full bg-secondary mr-2"></div>
          <span>Actual Score : {payload[0].value}</span>
        </div>
        <div className="flex items-center text-accent">
          <div className="w-2 h-2 rounded-full bg-accent mr-2"></div>
          <span>Projected : {payload[1].value}</span>
        </div>
      </div>
    );
  }

  return null;
};

const RankTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded p-2 text-sm">
        <div className="font-medium mb-1">R{label}</div>
        <div className="flex items-center text-purple-500">
          <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
          <span>Overall Rank : {payload[0].value}</span>
        </div>
      </div>
    );
  }

  return null;
};

const ValueTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded p-2 text-sm">
        <div className="font-medium mb-1">R{label}</div>
        <div className="flex items-center text-amber-500">
          <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
          <span>Team Value : ${(payload[0].value as number / 1000).toFixed(1)}k</span>
        </div>
      </div>
    );
  }

  return null;
};

export default function PerformanceChart({ data }: PerformanceChartProps) {
  const [chartType, setChartType] = useState<"score" | "rank" | "value">("score");

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Season Performance</h2>
          <Select 
            value={chartType} 
            onValueChange={(value) => setChartType(value as "score" | "rank" | "value")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score">Team Score</SelectItem>
              <SelectItem value="rank">Overall Rank</SelectItem>
              <SelectItem value="value">Team Value</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="h-[250px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "score" ? (
              <LineChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="round" tickFormatter={(round) => `R${round}`} />
                <YAxis 
                  domain={[(dataMin: number) => Math.max(dataMin * 0.85, 0), (dataMax: number) => dataMax * 1.05]} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actualScore"
                  name="Actual Score"
                  stroke="#3366cc"
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="projectedScore" 
                  name="Projected" 
                  stroke="#4caf50" 
                />
              </LineChart>
            ) : chartType === "rank" ? (
              <LineChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="round" tickFormatter={(round) => `R${round}`} />
                <YAxis reversed/>
                <Tooltip content={<RankTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rank"
                  name="Overall Rank"
                  stroke="#9c27b0"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            ) : (
              <LineChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="round" tickFormatter={(round) => `R${round}`} />
                <YAxis 
                  tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                />
                <Tooltip content={<ValueTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="teamValue"
                  name="Team Value"
                  stroke="#f59e0b"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
