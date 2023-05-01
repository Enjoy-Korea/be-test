import pool from "../../src/db/db.index";
import { UserModel } from "../../src/users/users.model";

describe("UserModel", () => {
  const userModel = new UserModel();

  // * signup func test
  describe("signup", () => {
    const email = "enko_test@example.com";
    const password = "password";

    it("등록되지 않은 아이디와 비밀번호로 새 사용자를 등록", async () => {
      await userModel.signup(email, password);
    });

    it("이미 존재하는 이메일로 등록 하는 경우 예외 발생", async () => {
      await expect(userModel.signup(email, password)).rejects.toThrow();
    });

    afterAll(async () => {
      const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [email]);

      if (rows.length > 0) {
        await pool.query("DELETE FROM user WHERE email = ?", [email]);
      }
    });
  });

  // * getUserByEmail func test
  describe("getUserByEmail", () => {
    const email = "enko_test@example.com";
    const password = "password";
    let userId: number;

    beforeAll(async () => {
      await pool.query("INSERT INTO user (email, password) VALUES (?, ?)", [email, password]);

      const [rows] = await pool.query("SELECT LAST_INSERT_ID() as userId");
      userId = rows[0].userId;
    });

    it("email에 해당하는 사용자 반환", async () => {
      const user = await userModel.getUserByEmail(email);

      expect(user.email).toBe(email);
      expect(user.id).toBe(userId);
    });

    it("존재하지 않는 이메일로 검색하는 경우, null이 반환", async () => {
      const email = "nonexistent@example.com";
      const user = await userModel.getUserByEmail(email);

      expect(user).toBeUndefined();
    });

    afterAll(async () => {
      await pool.query("DELETE FROM user WHERE id = ?", [userId]);
    });
  });

  afterAll(async () => {
    await pool.end();
  });
});
