import {
  type User, type InsertUser,
  type Player, type InsertPlayer,
  type Team, type InsertTeam,
  type TeamPlayer, type InsertTeamPlayer,
  type League, type InsertLeague,
  type LeagueTeam, type InsertLeagueTeam,
  type Matchup, type InsertMatchup,
  type RoundPerformance, type InsertRoundPerformance
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Player methods
  getAllPlayers(): Promise<Player[]>;
  getPlayer(id: number): Promise<Player | undefined>;
  getPlayersByPosition(position: string): Promise<Player[]>;
  searchPlayers(query: string): Promise<Player[]>;
  createPlayer(player: InsertPlayer): Promise<Player>;
  updatePlayer(id: number, player: Partial<InsertPlayer>): Promise<Player | undefined>;
  
  // Team methods
  getTeam(id: number): Promise<Team | undefined>;
  getTeamByUserId(userId: number): Promise<Team | undefined>;
  createTeam(team: InsertTeam): Promise<Team>;
  updateTeam(id: number, team: Partial<InsertTeam>): Promise<Team | undefined>;
  
  // TeamPlayer methods
  getTeamPlayers(teamId: number): Promise<TeamPlayer[]>;
  getTeamPlayersByPosition(teamId: number, position: string): Promise<TeamPlayer[]>;
  getTeamPlayerDetails(teamId: number): Promise<(TeamPlayer & { player: Player })[]>;
  addPlayerToTeam(teamPlayer: InsertTeamPlayer): Promise<TeamPlayer>;
  removePlayerFromTeam(teamId: number, playerId: number): Promise<boolean>;
  
  // League methods
  getLeague(id: number): Promise<League | undefined>;
  getLeaguesByUserId(userId: number): Promise<League[]>;
  createLeague(league: InsertLeague): Promise<League>;
  
  // LeagueTeam methods
  getLeagueTeams(leagueId: number): Promise<LeagueTeam[]>;
  getLeagueTeamDetails(leagueId: number): Promise<(LeagueTeam & { team: Team })[]>;
  addTeamToLeague(leagueTeam: InsertLeagueTeam): Promise<LeagueTeam>;
  updateLeagueTeam(leagueId: number, teamId: number, data: Partial<InsertLeagueTeam>): Promise<LeagueTeam | undefined>;
  
  // Matchup methods
  getMatchups(leagueId: number, round: number): Promise<Matchup[]>;
  getMatchupDetails(leagueId: number, round: number): Promise<(Matchup & { team1: Team, team2: Team })[]>;
  createMatchup(matchup: InsertMatchup): Promise<Matchup>;
  updateMatchup(id: number, matchup: Partial<InsertMatchup>): Promise<Matchup | undefined>;
  
  // Round Performance methods
  getRoundPerformances(teamId: number): Promise<RoundPerformance[]>;
  getRoundPerformance(teamId: number, round: number): Promise<RoundPerformance | undefined>;
  createRoundPerformance(perf: InsertRoundPerformance): Promise<RoundPerformance>;
  updateRoundPerformance(id: number, perf: Partial<InsertRoundPerformance>): Promise<RoundPerformance | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private players: Map<number, Player>;
  private teams: Map<number, Team>;
  private teamPlayers: Map<number, TeamPlayer>;
  private leagues: Map<number, League>;
  private leagueTeams: Map<number, LeagueTeam>;
  private matchups: Map<number, Matchup>;
  private roundPerformances: Map<number, RoundPerformance>;
  
  private nextIds: {
    user: number;
    player: number;
    team: number;
    teamPlayer: number;
    league: number;
    leagueTeam: number;
    matchup: number;
    roundPerformance: number;
  };

  constructor() {
    this.users = new Map();
    this.players = new Map();
    this.teams = new Map();
    this.teamPlayers = new Map();
    this.leagues = new Map();
    this.leagueTeams = new Map();
    this.matchups = new Map();
    this.roundPerformances = new Map();
    
    this.nextIds = {
      user: 1,
      player: 1,
      team: 1,
      teamPlayer: 1,
      league: 1,
      leagueTeam: 1,
      matchup: 1,
      roundPerformance: 1
    };
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize with some sample AFL players
    const samplePlayers: InsertPlayer[] = [
      {
        name: "Marcus Bontempelli",
        position: "MID",
        price: 982000,
        breakEven: 112,
        category: "Premium",
        team: "Western Bulldogs",
        averagePoints: 110.5,
        lastScore: 138,
        projectedScore: 115
      },
      {
        name: "Clayton Oliver",
        position: "MID",
        price: 950000,
        breakEven: 106,
        category: "Premium",
        team: "Melbourne",
        averagePoints: 108.2,
        lastScore: 121,
        projectedScore: 110
      },
      {
        name: "Jack Macrae",
        position: "MID",
        price: 872000,
        breakEven: 98,
        category: "Mid-Pricer",
        team: "Western Bulldogs",
        averagePoints: 102.5,
        lastScore: 95,
        projectedScore: 105
      },
      {
        name: "Christian Petracca",
        position: "FWD",
        price: 890000,
        breakEven: 104,
        category: "Premium",
        team: "Melbourne",
        averagePoints: 105.7,
        lastScore: 112,
        projectedScore: 108
      },
      {
        name: "Jeremy Cameron",
        position: "FWD",
        price: 820000,
        breakEven: 95,
        category: "Premium",
        team: "Geelong",
        averagePoints: 98.3,
        lastScore: 87,
        projectedScore: 102
      },
      {
        name: "Isaac Heeney",
        position: "FWD",
        price: 750000,
        breakEven: 92,
        category: "Mid-Pricer",
        team: "Sydney",
        averagePoints: 94.1,
        lastScore: 105,
        projectedScore: 95
      },
      {
        name: "Jake Lloyd",
        position: "DEF",
        price: 780000,
        breakEven: 94,
        category: "Premium",
        team: "Sydney",
        averagePoints: 96.8,
        lastScore: 88,
        projectedScore: 95
      },
      {
        name: "James Sicily",
        position: "DEF",
        price: 810000,
        breakEven: 98,
        category: "Premium",
        team: "Hawthorn",
        averagePoints: 99.4,
        lastScore: 110,
        projectedScore: 100
      },
      {
        name: "Jeremy McGovern",
        position: "DEF",
        price: 720000,
        breakEven: 85,
        category: "Mid-Pricer",
        team: "West Coast",
        averagePoints: 89.5,
        lastScore: 75,
        projectedScore: 90
      },
      {
        name: "Brodie Grundy",
        position: "RUCK",
        price: 890000,
        breakEven: 105,
        category: "Premium",
        team: "Melbourne",
        averagePoints: 107.2,
        lastScore: 115,
        projectedScore: 110
      },
      {
        name: "Rowan Marshall",
        position: "RUCK",
        price: 810000,
        breakEven: 97,
        category: "Mid-Pricer",
        team: "St Kilda",
        averagePoints: 99.8,
        lastScore: 102,
        projectedScore: 100
      },
      // Add rookies for all positions
      {
        name: "Sam Walsh",
        position: "MID",
        price: 620000,
        breakEven: 82,
        category: "Rookie",
        team: "Carlton",
        averagePoints: 85.6,
        lastScore: 90,
        projectedScore: 88
      },
      {
        name: "Nick Daicos",
        position: "MID",
        price: 580000,
        breakEven: 75,
        category: "Rookie",
        team: "Collingwood",
        averagePoints: 80.2,
        lastScore: 88,
        projectedScore: 82
      },
      {
        name: "Jason Horne-Francis",
        position: "FWD",
        price: 550000,
        breakEven: 70,
        category: "Rookie",
        team: "Port Adelaide",
        averagePoints: 75.4,
        lastScore: 80,
        projectedScore: 78
      },
      {
        name: "Jai Newcombe",
        position: "DEF",
        price: 530000,
        breakEven: 68,
        category: "Rookie",
        team: "Hawthorn",
        averagePoints: 72.5,
        lastScore: 65,
        projectedScore: 75
      },
      {
        name: "Luke Jackson",
        position: "RUCK",
        price: 570000,
        breakEven: 73,
        category: "Rookie",
        team: "Fremantle",
        averagePoints: 78.3,
        lastScore: 85,
        projectedScore: 80
      }
    ];
    
    samplePlayers.forEach(player => this.createPlayer(player));
    
    // Create a test user
    this.createUser({
      username: "test",
      password: "password"
    }).then(user => {
      // Create a team for the test user
      this.createTeam({
        userId: user.id,
        name: "Bont's Brigade",
        value: 15800000,
        score: 2150,
        captainId: 1, // Bontempelli
        overallRank: 12000,
        trades: 2
      }).then(team => {
        // Add players to the user's team
        const addMidfielders = [
          { playerId: 1, position: "MID", isOnField: true }, // Bontempelli
          { playerId: 2, position: "MID", isOnField: true }, // Oliver
          { playerId: 3, position: "MID", isOnField: true }, // Macrae
        ];
        
        const addForwards = [
          { playerId: 4, position: "FWD", isOnField: true }, // Petracca
          { playerId: 5, position: "FWD", isOnField: true }, // Cameron
          { playerId: 6, position: "FWD", isOnField: true }, // Heeney
        ];
        
        const addDefenders = [
          { playerId: 7, position: "DEF", isOnField: true }, // Lloyd 
          { playerId: 8, position: "DEF", isOnField: true }, // Sicily
          { playerId: 9, position: "DEF", isOnField: true }, // McGovern
        ];
        
        const addRucks = [
          { playerId: 10, position: "RUCK", isOnField: true }, // Grundy
          { playerId: 11, position: "RUCK", isOnField: true }, // Marshall
        ];
        
        // Add all players to the team
        [...addMidfielders, ...addForwards, ...addDefenders, ...addRucks].forEach(playerData => {
          this.addPlayerToTeam({
            teamId: team.id,
            playerId: playerData.playerId,
            position: playerData.position,
            isOnField: playerData.isOnField
          });
        });
        
        // Create 5 leagues for this user with active matchups
        const leagueNames = [
          "AFL Elite League",
          "Supercoach Masters",
          "Victoria Footy League",
          "Pro Fantasy Classic",
          "Premiership Contenders"
        ];
        
        // Create opponent teams
        const createOpponentTeams = async () => {
          const opponentTeams = [];
          
          for (let i = 0; i < 5; i++) {
            // Create user for opponent
            const oppUser = await this.createUser({
              username: `opponent${i}`,
              password: "password"
            });
            
            // Create team for opponent
            const oppTeam = await this.createTeam({
              userId: oppUser.id,
              name: `Opponent Team ${i+1}`,
              value: 15000000 + (Math.floor(Math.random() * 1000000)),
              score: 1900 + (Math.floor(Math.random() * 300)),
              captainId: Math.floor(Math.random() * 16) + 1, // Random captain
              overallRank: 15000 + (Math.floor(Math.random() * 20000)),
              trades: Math.floor(Math.random() * 5) + 5
            });
            
            // Add some players to opponent team
            const positions = ["MID", "FWD", "DEF", "RUCK"];
            for (let j = 1; j <= 16; j++) {
              const position = positions[Math.floor(Math.random() * positions.length)];
              await this.addPlayerToTeam({
                teamId: oppTeam.id,
                playerId: j,
                position: position,
                isOnField: true
              });
            }
            
            opponentTeams.push(oppTeam);
          }
          
          return opponentTeams;
        };
        
        createOpponentTeams().then(opponentTeams => {
          // Create the leagues and add the user to them
          const createLeaguesPromises = leagueNames.map(async (name, index) => {
            const league = await this.createLeague({
              name: name,
              creatorId: user.id,
              code: `AFL${index+1}23`
            });
            
            // Add the user's team to the league
            await this.addTeamToLeague({
              leagueId: league.id,
              teamId: team.id,
              wins: 3 + Math.floor(Math.random() * 4), // 3-6 wins
              losses: Math.floor(Math.random() * 4), // 0-3 losses
              pointsFor: 12000 + Math.floor(Math.random() * 3000)
            });
            
            // Add 5-10 opponent teams to the league
            const numTeams = 5 + Math.floor(Math.random() * 6);
            for (let i = 0; i < numTeams; i++) {
              if (i < opponentTeams.length) {
                await this.addTeamToLeague({
                  leagueId: league.id,
                  teamId: opponentTeams[i].id,
                  wins: Math.floor(Math.random() * 7),
                  losses: Math.floor(Math.random() * 4),
                  pointsFor: 10000 + Math.floor(Math.random() * 4000)
                });
              }
            }
            
            // Create matchup for this league with varying scores 
            // and different opponents for each league
            const oppTeam = opponentTeams[index % opponentTeams.length];
            await this.createMatchup({
              leagueId: league.id,
              round: 7,
              team1Id: team.id,
              team2Id: oppTeam.id,
              team1Score: 1700 + Math.floor(Math.random() * 400), // 1700-2100
              team2Score: 1600 + Math.floor(Math.random() * 400)  // 1600-2000
            });
            
            return league;
          });
          
          Promise.all(createLeaguesPromises).then(() => {
            // Add round performance history for the team
            for (let i = 1; i <= 6; i++) {
              this.createRoundPerformance({
                teamId: team.id,
                round: i,
                score: 2000 + (i * 25), // Gradually increasing scores
                value: 15000000 + (i * 100000), // Gradually increasing value
                rank: 20000 - (i * 1500), // Rank getting better
                projectedScore: 1950 + (i * 20) // Projected scores
              });
            }
          });
        });
      });
    });
  }

  // User Methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.nextIds.user++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Player Methods
  async getAllPlayers(): Promise<Player[]> {
    return Array.from(this.players.values());
  }

  async getPlayer(id: number): Promise<Player | undefined> {
    return this.players.get(id);
  }

  async getPlayersByPosition(position: string): Promise<Player[]> {
    return Array.from(this.players.values()).filter(
      player => player.position === position
    );
  }

  async searchPlayers(query: string): Promise<Player[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.players.values()).filter(
      player => 
        player.name.toLowerCase().includes(lowerQuery) ||
        player.team.toLowerCase().includes(lowerQuery) ||
        player.position.toLowerCase().includes(lowerQuery)
    );
  }

  async createPlayer(insertPlayer: InsertPlayer): Promise<Player> {
    const id = this.nextIds.player++;
    const player: Player = { ...insertPlayer, id };
    this.players.set(id, player);
    return player;
  }

  async updatePlayer(id: number, playerData: Partial<InsertPlayer>): Promise<Player | undefined> {
    const player = this.players.get(id);
    if (!player) return undefined;
    
    const updatedPlayer = { ...player, ...playerData };
    this.players.set(id, updatedPlayer);
    return updatedPlayer;
  }

  // Team Methods
  async getTeam(id: number): Promise<Team | undefined> {
    return this.teams.get(id);
  }

  async getTeamByUserId(userId: number): Promise<Team | undefined> {
    return Array.from(this.teams.values()).find(
      team => team.userId === userId
    );
  }

  async createTeam(insertTeam: InsertTeam): Promise<Team> {
    const id = this.nextIds.team++;
    const team: Team = { ...insertTeam, id };
    this.teams.set(id, team);
    return team;
  }

  async updateTeam(id: number, teamData: Partial<InsertTeam>): Promise<Team | undefined> {
    const team = this.teams.get(id);
    if (!team) return undefined;
    
    const updatedTeam = { ...team, ...teamData };
    this.teams.set(id, updatedTeam);
    return updatedTeam;
  }

  // TeamPlayer Methods
  async getTeamPlayers(teamId: number): Promise<TeamPlayer[]> {
    return Array.from(this.teamPlayers.values()).filter(
      tp => tp.teamId === teamId
    );
  }

  async getTeamPlayersByPosition(teamId: number, position: string): Promise<TeamPlayer[]> {
    return Array.from(this.teamPlayers.values()).filter(
      tp => tp.teamId === teamId && tp.position === position
    );
  }

  async getTeamPlayerDetails(teamId: number): Promise<(TeamPlayer & { player: Player })[]> {
    const teamPlayers = await this.getTeamPlayers(teamId);
    return teamPlayers.map(tp => {
      const player = this.players.get(tp.playerId);
      if (!player) throw new Error(`Player not found: ${tp.playerId}`);
      return { ...tp, player };
    });
  }

  async addPlayerToTeam(insertTeamPlayer: InsertTeamPlayer): Promise<TeamPlayer> {
    const id = this.nextIds.teamPlayer++;
    const teamPlayer: TeamPlayer = { ...insertTeamPlayer, id };
    this.teamPlayers.set(id, teamPlayer);
    return teamPlayer;
  }

  async removePlayerFromTeam(teamId: number, playerId: number): Promise<boolean> {
    const teamPlayerEntry = Array.from(this.teamPlayers.entries()).find(
      ([_, tp]) => tp.teamId === teamId && tp.playerId === playerId
    );
    
    if (!teamPlayerEntry) return false;
    
    this.teamPlayers.delete(teamPlayerEntry[0]);
    return true;
  }

  // League Methods
  async getLeague(id: number): Promise<League | undefined> {
    return this.leagues.get(id);
  }

  async getLeaguesByUserId(userId: number): Promise<League[]> {
    // Get user's team
    const userTeam = await this.getTeamByUserId(userId);
    if (!userTeam) {
      return [];
    }
    
    // Find all league teams that include the user's team
    const userLeagueTeams = Array.from(this.leagueTeams.values()).filter(
      lt => lt.teamId === userTeam.id
    );
    
    // Get all the league IDs
    const leagueIds = userLeagueTeams.map(lt => lt.leagueId);
    
    // Get all the leagues
    return Array.from(this.leagues.values()).filter(
      league => leagueIds.includes(league.id)
    );
  }

  async createLeague(insertLeague: InsertLeague): Promise<League> {
    const id = this.nextIds.league++;
    const league: League = { ...insertLeague, id };
    this.leagues.set(id, league);
    return league;
  }

  // LeagueTeam Methods
  async getLeagueTeams(leagueId: number): Promise<LeagueTeam[]> {
    return Array.from(this.leagueTeams.values()).filter(
      lt => lt.leagueId === leagueId
    );
  }

  async getLeagueTeamDetails(leagueId: number): Promise<(LeagueTeam & { team: Team })[]> {
    const leagueTeams = await this.getLeagueTeams(leagueId);
    return leagueTeams.map(lt => {
      const team = this.teams.get(lt.teamId);
      if (!team) throw new Error(`Team not found: ${lt.teamId}`);
      return { ...lt, team };
    });
  }

  async addTeamToLeague(insertLeagueTeam: InsertLeagueTeam): Promise<LeagueTeam> {
    const id = this.nextIds.leagueTeam++;
    const leagueTeam: LeagueTeam = { ...insertLeagueTeam, id };
    this.leagueTeams.set(id, leagueTeam);
    return leagueTeam;
  }

  async updateLeagueTeam(leagueId: number, teamId: number, data: Partial<InsertLeagueTeam>): Promise<LeagueTeam | undefined> {
    const leagueTeamEntry = Array.from(this.leagueTeams.entries()).find(
      ([_, lt]) => lt.leagueId === leagueId && lt.teamId === teamId
    );
    
    if (!leagueTeamEntry) return undefined;
    
    const [id, leagueTeam] = leagueTeamEntry;
    const updatedLeagueTeam = { ...leagueTeam, ...data };
    this.leagueTeams.set(id, updatedLeagueTeam);
    return updatedLeagueTeam;
  }

  // Matchup Methods
  async getMatchups(leagueId: number, round: number): Promise<Matchup[]> {
    return Array.from(this.matchups.values()).filter(
      m => m.leagueId === leagueId && m.round === round
    );
  }

  async getMatchupDetails(leagueId: number, round: number): Promise<(Matchup & { team1: Team, team2: Team })[]> {
    const matchups = await this.getMatchups(leagueId, round);
    
    // Initialize the second team if it doesn't exist
    if (matchups.length > 0 && !this.teams.has(2)) {
      const team2: Team = {
        id: 2,
        userId: 2,
        name: "The Contenders",
        value: 12500000,
        score: 1950,
        overallRank: 2500,
        trades: 3,
        captainId: 2
      };
      this.teams.set(2, team2);
    }
    
    return matchups.map(m => {
      const team1 = this.teams.get(m.team1Id);
      const team2 = this.teams.get(m.team2Id);
      
      // Use existing teams or create fallback teams
      const team1Data = team1 || {
        id: m.team1Id,
        userId: 99,
        name: `Team ${m.team1Id}`,
        value: 15000000,
        score: 2000,
        overallRank: 5000,
        trades: 5,
        captainId: 1
      };
      
      const team2Data = team2 || {
        id: m.team2Id,
        userId: 99,
        name: `Team ${m.team2Id}`,
        value: 15000000,
        score: 2000,
        overallRank: 5000,
        trades: 5,
        captainId: 1
      };
      
      return { ...m, team1: team1Data, team2: team2Data };
    });
  }

  async createMatchup(insertMatchup: InsertMatchup): Promise<Matchup> {
    const id = this.nextIds.matchup++;
    const matchup: Matchup = { ...insertMatchup, id };
    this.matchups.set(id, matchup);
    return matchup;
  }

  async updateMatchup(id: number, matchupData: Partial<InsertMatchup>): Promise<Matchup | undefined> {
    const matchup = this.matchups.get(id);
    if (!matchup) return undefined;
    
    const updatedMatchup = { ...matchup, ...matchupData };
    this.matchups.set(id, updatedMatchup);
    return updatedMatchup;
  }

  // Round Performance Methods
  async getRoundPerformances(teamId: number): Promise<RoundPerformance[]> {
    return Array.from(this.roundPerformances.values())
      .filter(rp => rp.teamId === teamId)
      .sort((a, b) => a.round - b.round);
  }

  async getRoundPerformance(teamId: number, round: number): Promise<RoundPerformance | undefined> {
    return Array.from(this.roundPerformances.values()).find(
      rp => rp.teamId === teamId && rp.round === round
    );
  }

  async createRoundPerformance(insertPerf: InsertRoundPerformance): Promise<RoundPerformance> {
    const id = this.nextIds.roundPerformance++;
    const perf: RoundPerformance = { ...insertPerf, id };
    this.roundPerformances.set(id, perf);
    return perf;
  }

  async updateRoundPerformance(id: number, perfData: Partial<InsertRoundPerformance>): Promise<RoundPerformance | undefined> {
    const perf = this.roundPerformances.get(id);
    if (!perf) return undefined;
    
    const updatedPerf = { ...perf, ...perfData };
    this.roundPerformances.set(id, updatedPerf);
    return updatedPerf;
  }
}

export const storage = new MemStorage();
