import { Card, CardContent } from "@/components/ui/card";

export type LeagueTeam = {
  id: number;
  teamId: number;
  name: string;
  wins: number;
  losses: number;
  pointsFor: number;
};

type LeagueLadderProps = {
  teams: LeagueTeam[];
  isLoading: boolean;
};

export default function LeagueLadder({ teams, isLoading }: LeagueLadderProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-lg font-medium mb-4">League Standings</h2>
        
        {isLoading ? (
          <div className="text-center py-4">Loading league standings...</div>
        ) : teams.length === 0 ? (
          <div className="text-center py-4">No teams found in this league.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-light">
              <thead className="bg-neutral-lightest">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                    Team
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                    W
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                    L
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                    Points For
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-light">
                {teams.map((team, index) => (
                  <tr key={team.id} className="hover:bg-neutral-lightest">
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{index + 1}</div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{team.name}</div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{team.wins}</div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{team.losses}</div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{team.pointsFor}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
