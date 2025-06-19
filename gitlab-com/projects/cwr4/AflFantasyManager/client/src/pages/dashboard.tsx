import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ScoreCard from "@/components/dashboard/score-card";
import PerformanceChart, { RoundData } from "@/components/dashboard/performance-chart";
import TeamStructure from "@/components/dashboard/team-structure";
import { formatCurrency } from "@/lib/utils";

interface TeamData {
  id: number;
  userId: number;
  name: string;
  value: number;
  score: number;
  overallRank: number;
  trades: number;
  captainId: number;
}

interface PerformanceData {
  id: number;
  teamId: number;
  round: number;
  score: number;
  projectedScore: number;
  rank: number;
  value: number;
}

export default function Dashboard() {
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["/api/me"],
  });
  
  const { data: team, isLoading: isLoadingTeam } = useQuery<TeamData>({
    queryKey: ["/api/teams/user/1"],
    enabled: !!user,
  });

  const { data: performances, isLoading: isLoadingPerformances } = useQuery<PerformanceData[]>({
    queryKey: ["/api/teams/1/performances"],
    enabled: !!team,
  });

  const [chartData, setChartData] = useState<RoundData[]>([]);
  
  useEffect(() => {
    if (performances && Array.isArray(performances)) {
      const formattedData = performances.map((perf) => ({
        round: perf.round,
        actualScore: perf.score,
        projectedScore: perf.projectedScore,
        rank: perf.rank,
        teamValue: perf.value
      }));
      setChartData(formattedData);
    }
  }, [performances]);

  const isLoading = isLoadingUser || isLoadingTeam || isLoadingPerformances;

  if (isLoading || !team) {
    return <div>Loading dashboard...</div>;
  }

  // Get previous round score for change calculations
  const currentRound = 6; // Assuming current round is 6
  const prevRoundIndex = currentRound - 2;
  const currentRoundIndex = currentRound - 1;
  
  const prevScore = prevRoundIndex >= 0 ? chartData[prevRoundIndex]?.actualScore : 0;
  const currentScore = currentRoundIndex >= 0 ? chartData[currentRoundIndex]?.actualScore : 0;
  const scoreChange = currentScore - prevScore;
  
  const prevRank = prevRoundIndex >= 0 ? chartData[prevRoundIndex]?.rank || 0 : 0;
  const currentRank = currentRoundIndex >= 0 ? chartData[currentRoundIndex]?.rank || 0 : 0;
  const rankChange = prevRank - currentRank;
  
  // Calculate team value change
  const prevValue = prevRoundIndex >= 0 ? chartData[prevRoundIndex]?.teamValue || 0 : 0;
  const valueChange = team.value - prevValue;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Team Value */}
        <ScoreCard 
          title="Team Value"
          value={formatCurrency(team.value)}
          change={`+ ${formatCurrency(valueChange)} from last round`}
          icon="trend-up"
        />
        
        {/* Team Score */}
        <ScoreCard 
          title="Team Score"
          value={team.score.toString()}
          change={`+ ${scoreChange} from last round`}
          icon="chart"
        />
      
        {/* Overall Rank */}
        <ScoreCard 
          title="Overall Rank"
          value={team.overallRank.toString()}
          change={`↑ ${rankChange.toLocaleString()} places`}
          icon="arrow-up"
        />
        
        {/* Captain Score */}
        <ScoreCard 
          title="Captain Score"
          value="138"
          change="↑ 89% of teams"
          icon="award"
          isPositive={true}
        />
      </div>

      {/* Season Performance Chart */}
      <div className="mb-4">
        <PerformanceChart data={chartData} />
      </div>

      {/* Team Value */}
      <TeamStructure 
        midfield={{
          premium: { count: 4, label: "Premiums (3 + 1)" },
          midPricer: { count: 3, label: "Mid-pricers (2 + 1)" },
          rookie: { count: 3, label: "Rookies (1 + 2)" }
        }}
        forward={{
          premium: { count: 2, label: "Premiums (2 + 0)" },
          midPricer: { count: 2, label: "Mid-pricers (1 + 1)" },
          rookie: { count: 2, label: "Rookies (1 + 1)" }
        }}
        defense={{
          premium: { count: 2, label: "Premiums (2 + 0)" },
          midPricer: { count: 2, label: "Mid-pricers (1 + 1)" },
          rookie: { count: 2, label: "Rookies (1 + 1)" }
        }}
        ruck={{
          premium: { count: 1, label: "Premiums (1 + 0)" },
          midPricer: { count: 1, label: "Mid-pricers (0 + 1)" },
          rookie: { count: 0, label: "Rookies (0 + 0)" }
        }}
        teamValue={formatCurrency(team.value)}
      />
    </div>
  );
}
