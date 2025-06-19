import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Players routes
  app.get("/api/players", async (req, res) => {
    const query = req.query.q as string | undefined;
    const position = req.query.position as string | undefined;
    
    let players;
    if (query) {
      players = await storage.searchPlayers(query);
    } else if (position) {
      players = await storage.getPlayersByPosition(position);
    } else {
      players = await storage.getAllPlayers();
    }
    
    res.json(players);
  });

  app.get("/api/players/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid player ID" });
    }
    
    const player = await storage.getPlayer(id);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    
    res.json(player);
  });

  // Team routes
  app.get("/api/teams/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid team ID" });
    }
    
    const team = await storage.getTeam(id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    
    res.json(team);
  });

  app.get("/api/teams/user/:userId", async (req, res) => {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const team = await storage.getTeamByUserId(userId);
    if (!team) {
      return res.status(404).json({ message: "Team not found for this user" });
    }
    
    res.json(team);
  });

  app.put("/api/teams/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid team ID" });
    }

    const updatedTeam = await storage.updateTeam(id, req.body);
    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }
    
    res.json(updatedTeam);
  });

  // Team Players routes
  app.get("/api/teams/:teamId/players", async (req, res) => {
    const teamId = Number(req.params.teamId);
    if (isNaN(teamId)) {
      return res.status(400).json({ message: "Invalid team ID" });
    }
    
    const players = await storage.getTeamPlayerDetails(teamId);
    res.json(players);
  });

  app.get("/api/teams/:teamId/players/:position", async (req, res) => {
    const teamId = Number(req.params.teamId);
    if (isNaN(teamId)) {
      return res.status(400).json({ message: "Invalid team ID" });
    }
    
    const position = req.params.position;
    if (!["MID", "FWD", "DEF", "RUCK"].includes(position)) {
      return res.status(400).json({ message: "Invalid position" });
    }
    
    const players = await storage.getTeamPlayersByPosition(teamId, position);
    res.json(players);
  });

  app.post("/api/teams/:teamId/players", async (req, res) => {
    const teamId = Number(req.params.teamId);
    if (isNaN(teamId)) {
      return res.status(400).json({ message: "Invalid team ID" });
    }
    
    const schema = z.object({
      playerId: z.number(),
      position: z.string(),
      isOnField: z.boolean().default(false)
    });
    
    const validationResult = schema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ message: "Invalid request data", errors: validationResult.error.errors });
    }
    
    try {
      const teamPlayer = await storage.addPlayerToTeam({
        teamId,
        playerId: validationResult.data.playerId,
        position: validationResult.data.position,
        isOnField: validationResult.data.isOnField
      });
      
      res.status(201).json(teamPlayer);
    } catch (error) {
      res.status(500).json({ message: "Failed to add player to team" });
    }
  });

  app.delete("/api/teams/:teamId/players/:playerId", async (req, res) => {
    const teamId = Number(req.params.teamId);
    const playerId = Number(req.params.playerId);
    
    if (isNaN(teamId) || isNaN(playerId)) {
      return res.status(400).json({ message: "Invalid ID parameters" });
    }
    
    const success = await storage.removePlayerFromTeam(teamId, playerId);
    if (!success) {
      return res.status(404).json({ message: "Player not found in team" });
    }
    
    res.status(204).send();
  });

  // League routes
  app.get("/api/leagues/user/:userId", async (req, res) => {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const leagues = await storage.getLeaguesByUserId(userId);
    res.json(leagues);
  });

  app.get("/api/leagues/:leagueId/teams", async (req, res) => {
    const leagueId = Number(req.params.leagueId);
    if (isNaN(leagueId)) {
      return res.status(400).json({ message: "Invalid league ID" });
    }
    
    const teams = await storage.getLeagueTeamDetails(leagueId);
    res.json(teams);
  });

  app.get("/api/leagues/:leagueId/matchups/:round", async (req, res) => {
    const leagueId = Number(req.params.leagueId);
    const round = Number(req.params.round);
    
    if (isNaN(leagueId) || isNaN(round)) {
      return res.status(400).json({ message: "Invalid parameters" });
    }
    
    const matchups = await storage.getMatchupDetails(leagueId, round);
    res.json(matchups);
  });

  // Round Performance routes
  app.get("/api/teams/:teamId/performances", async (req, res) => {
    const teamId = Number(req.params.teamId);
    if (isNaN(teamId)) {
      return res.status(400).json({ message: "Invalid team ID" });
    }
    
    const performances = await storage.getRoundPerformances(teamId);
    res.json(performances);
  });

  // Get current user (for demo purposes, return user ID 1)
  app.get("/api/me", async (_req, res) => {
    const user = await storage.getUser(1);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Don't return password
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  const httpServer = createServer(app);
  return httpServer;
}
