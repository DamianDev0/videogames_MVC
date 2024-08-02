import { Request, Response } from "express";
import { Games } from "../interfaces/Games";
import pool from "../config/db";
import { GameRepository } from "../data-access/gamesModel";
import { FieldPacket, ResultSetHeader } from "mysql2";

export class GamesController {
  static async getGames(_: Request, res: Response): Promise<void> {
    try {
      const gameRepository: GameRepository = new GameRepository(pool);
      const games: Games[] = await gameRepository.All();

      res.status(200).json({
        status: 200,
        data: games,
      });
    } catch (error) {
      throw new Error("Cannot get games");
    }
  }

  static async createGame(req: Request, res: Response): Promise<void> {
    const newGame: Games = req.body;
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "INSERT INTO games SET ?",
        [newGame]
      );

      res.status(201).json({
        status: 201,
        message: "Game created successfully",
        data: {
          id: result.insertId,
          ...newGame,
        },
      });
    } catch (error) {
      res.status(500).send("Server error");
      throw new Error("Cannot create game");
    }
  }

  static async deleteGame(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    try {
      const [rows]: [ResultSetHeader[], FieldPacket[]] = await pool.query(
        "SELECT * FROM games WHERE id = ?",
        [id]
      );
      if (rows.length === 0) {
        res.status(404).json({ message: "Game not found" });
        return;
      }

      res.status(200).json({
        status: 200,
        message: "Game deleted successfully",
      });
    } catch (error) {
      res.status(500).send("Server error");
      throw new Error("Cannot delete game");
    }
  }
}
