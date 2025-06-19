import { pgTable, text, serial, integer, boolean, jsonb, real, timestamp, primaryKey, foreignKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Player schemas
export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(), // MID, FWD, DEF, RUCK
  price: integer("price").notNull(),
  breakEven: integer("break_even").notNull(),
  category: text("category").notNull(), // Premium, Mid-Pricer, Rookie
  team: text("team").notNull(),
  averagePoints: real("average_points").notNull(),
  lastScore: integer("last_score"),
  projectedScore: integer("projected_score"),
  
  // Fantasy stats
  roundsPlayed: integer("rounds_played").default(0),
  l3Average: real("l3_average"),
  l5Average: real("l5_average"),
  priceChange: integer("price_change").default(0),
  pricePerPoint: real("price_per_point"),
  totalPoints: integer("total_points").default(0),
  selectionPercentage: real("selection_percentage"),
  
  // Basic stats
  kicks: integer("kicks"),
  handballs: integer("handballs"),
  disposals: integer("disposals"),
  marks: integer("marks"),
  tackles: integer("tackles"),
  freeKicksFor: integer("free_kicks_for"),
  freeKicksAgainst: integer("free_kicks_against"),
  clearances: integer("clearances"),
  hitouts: integer("hitouts"),
  cba: real("cba"),
  kickIns: integer("kick_ins"),
  uncontestedMarks: integer("uncontested_marks"),
  contestedMarks: integer("contested_marks"),
  uncontestedDisposals: integer("uncontested_disposals"),
  contestedDisposals: integer("contested_disposals"),
  
  // VS stats
  averageVsOpp: real("average_vs_opp"),
  averageAtVenue: real("average_at_venue"),
  averageVs3RoundOpp: real("average_vs_3round_opp"),
  averageAt3RoundVenue: real("average_at_3round_venue"),
  opponentDifficulty: real("opponent_difficulty"),
  opponent3RoundDifficulty: real("opponent_3round_difficulty")
});

export const insertPlayerSchema = createInsertSchema(players).omit({
  id: true
});

// Team schemas
export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  value: integer("value").notNull().default(10000000), // Team value in dollars
  score: integer("score").notNull().default(0),
  captainId: integer("captain_id"),
  overallRank: integer("overall_rank"),
  trades: integer("trades").notNull().default(2),
});

export const insertTeamSchema = createInsertSchema(teams).omit({
  id: true
});

// Team Player schemas (for tracking which players are in which teams)
export const teamPlayers = pgTable("team_players", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").notNull(),
  playerId: integer("player_id").notNull(),
  position: text("position").notNull(), // MID, FWD, DEF, RUCK
  isOnField: boolean("is_on_field").notNull().default(false), // Whether the player is active or on the bench
});

export const insertTeamPlayerSchema = createInsertSchema(teamPlayers).omit({
  id: true
});

// League schemas
export const leagues = pgTable("leagues", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  creatorId: integer("creator_id").notNull(),
  code: text("code").notNull(),
});

export const insertLeagueSchema = createInsertSchema(leagues).omit({
  id: true
});

// League Team schemas (for tracking which teams are in which leagues)
export const leagueTeams = pgTable("league_teams", {
  id: serial("id").primaryKey(),
  leagueId: integer("league_id").notNull(),
  teamId: integer("team_id").notNull(),
  wins: integer("wins").notNull().default(0),
  losses: integer("losses").notNull().default(0),
  pointsFor: integer("points_for").notNull().default(0),
});

export const insertLeagueTeamSchema = createInsertSchema(leagueTeams).omit({
  id: true
});

// Matchup schemas (for tracking match-ups between teams in leagues)
export const matchups = pgTable("matchups", {
  id: serial("id").primaryKey(),
  leagueId: integer("league_id").notNull(),
  round: integer("round").notNull(),
  team1Id: integer("team1_id").notNull(),
  team2Id: integer("team2_id").notNull(),
  team1Score: integer("team1_score"),
  team2Score: integer("team2_score"),
});

export const insertMatchupSchema = createInsertSchema(matchups).omit({
  id: true
});

// Round performance schemas (for tracking team performance by round)
export const roundPerformances = pgTable("round_performances", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").notNull(),
  round: integer("round").notNull(),
  score: integer("score").notNull(),
  value: integer("value").notNull(),
  rank: integer("rank"),
  projectedScore: integer("projected_score"),
});

export const insertRoundPerformanceSchema = createInsertSchema(roundPerformances).omit({
  id: true
});

// User schemas
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true
});

// Types
export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type Player = typeof players.$inferSelect;

export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type Team = typeof teams.$inferSelect;

export type InsertTeamPlayer = z.infer<typeof insertTeamPlayerSchema>;
export type TeamPlayer = typeof teamPlayers.$inferSelect;

export type InsertLeague = z.infer<typeof insertLeagueSchema>;
export type League = typeof leagues.$inferSelect;

export type InsertLeagueTeam = z.infer<typeof insertLeagueTeamSchema>;
export type LeagueTeam = typeof leagueTeams.$inferSelect;

export type InsertMatchup = z.infer<typeof insertMatchupSchema>;
export type Matchup = typeof matchups.$inferSelect;

export type InsertRoundPerformance = z.infer<typeof insertRoundPerformanceSchema>;
export type RoundPerformance = typeof roundPerformances.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
