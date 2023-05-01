import { UserService } from "../../src/users/users.service";
import { UserModel } from "../../src/users/users.model";
import pool from "../../src/db/db.index";
import * as bcrypt from "bcrypt";

describe("UserService", () => {
  let userService: UserService;
  let userModel: UserModel;

  beforeAll(() => {
    userModel = new UserModel();
    userService = new UserService(userModel);
  });

  // * signup function test
  describe("signup", () => {
    it("유효한 이메일과 비밀번호로 유저 등록", async () => {
      const email = "test@example.com";
      const password = "password";

      const spy = jest.spyOn(userModel, "signup");
      const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

      await userService.signup(email, password);

      expect(spy).toHaveBeenCalledWith(email, expect.any(String));
      spy.mockRestore();
    });

    it("이미 존재하는 이메일인 경우 예외 처리", async () => {
      const email = "test@example.com";
      const password = "password";

      await expect(userService.signup(email, password)).rejects.toThrow();
    });
  });

  // * login function test
  describe("login", () => {
    it("유효한 이메일과 비밀번호로 로그인 하는 경우 JWT 토큰 반환", async () => {
      const email = "test@example.com";
      const password = "password";

      const { token } = await userService.login(email, password);
      expect(token).toBeDefined();
    });

    it("이메일이 존재하지 않는 경우 예외 발생", async () => {
      const email = "nonexistent@example.com";
      const password = "password";

      await expect(userService.login(email, password)).rejects.toThrow();
    });

    it("패스워드가 잘못 된 경우 예외 발생", async () => {
      const email = "test@example.com";
      const password = "wrongpassword";

      await expect(userService.login(email, password)).rejects.toThrow();
    });
  });

  // * getUserByEmail function test
  describe("getUserByEmail", () => {
    it("유효한 이메일을 가진 사용자 반환", async () => {
      const email = "test@example.com";

      const user = await userService.getUserByEmail(email);
      expect(user.email).toBe(email);
    });

    it("이메일이 유효하지 않은 경우 undefined 반환", async () => {
      const email = "nonexistent@example.com";

      const user = await userService.getUserByEmail(email);
      expect(user).toBeUndefined();
    });
  });

  afterAll(async () => {
    const email = "test@example.com";
    await pool.query("DELETE FROM user WHERE email = ?", [email]);
    await pool.end();
  });
});
