import { FieldPacket, Pool, ResultSetHeader } from "mysql2/promise";
import { Games } from "../interfaces/Games";

export class GameRepository {
  constructor(private pool: Pool) {}

  async All(): Promise<Games[]> {
    const [rows]: [ResultSetHeader, FieldPacket[]] = await this.pool.query(
      "SELECT * FROM games"
    );
    return rows as unknown as Promise<Games[]>;
  }

  async Create(newGame: Games): Promise<Games> {
    const [result]: [ResultSetHeader, FieldPacket[]] = await this.pool.query(
      "INSERT INTO games SET?",
      [newGame]
    );
    return { ...newGame, id: result.insertId };
  }

  async Delete(id: number): Promise<boolean> {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await this.pool.query(
        "DELETE FROM games WHERE id = ?",
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting game:", error);
      throw new Error("Database query error");
    }
  }
}
