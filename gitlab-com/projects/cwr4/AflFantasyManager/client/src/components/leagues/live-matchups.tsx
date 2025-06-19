import { Card, CardContent } from "@/components/ui/card";

export type Matchup = {
  id: number;
  round: number;
  team1: {
    id: number;
    name: string;
    score: number;
  };
  team2: {
    id: number;
    name: string;
    score: number;
  };
};

type LiveMatchupsProps = {
  matchups: Matchup[];
  round: number;
  isLoading: boolean;
};

export default function LiveMatchups({ matchups, round, isLoading }: LiveMatchupsProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-lg font-medium mb-4">Current Round Matchups</h2>
        
        {isLoading ? (
          <div className="text-center py-4">Loading matchups...</div>
        ) : matchups.length === 0 ? (
          <div className="text-center py-4">No matchups scheduled for round {round}.</div>
        ) : (
          <div className="space-y-4">
            {matchups.map((matchup) => (
              <div 
                key={matchup.id}
                className="border border-neutral-light rounded-lg p-4 flex justify-between items-center"
              >
                <div className="text-center">
                  <div className="font-medium">{matchup.team1.name}</div>
                  <div className={`text-lg font-semibold ${matchup.team1.score > matchup.team2.score ? "text-secondary" : ""}`}>
                    ({matchup.team1.score})
                  </div>
                </div>
                
                <div className="text-neutral-dark font-medium">vs</div>
                
                <div className="text-center">
                  <div className="font-medium">{matchup.team2.name}</div>
                  <div className={`text-lg font-semibold ${matchup.team2.score > matchup.team1.score ? "text-secondary" : ""}`}>
                    ({matchup.team2.score})
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
