import pool from "../db/db.index";
import { User } from "../types/users.type";

export class UserModel {
  async singnup(email: string, password: string): Promise<void> {
    await pool.query(
      `INSERT INTO user (email, password)
       VALUES(?, ?)`,
      [email, password]
    );
  }

  async login(name: string) {
    return null;
  }

  async getUserByEmail(email: string): Promise<User> {
    const [rows] = await pool.query(
      `SELECT *
       FROM user
       WHERE email = ?`,
      [email]
    );

    return rows[0];
  }
}

const userModel = new UserModel();

export { userModel };
