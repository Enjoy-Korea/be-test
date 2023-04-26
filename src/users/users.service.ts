import "dotenv/config";
import { userModel, UserModel } from "./users.model";
import * as bcrypt from "bcrypt";
import { User } from "../types/users.type";
import * as jwt from "jsonwebtoken";

class UserService {
  private userModel: UserModel;

  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }

  async signup(email: string, password: string): Promise<void> {
    const user: User = await this.userModel.getUserByEmail(email);

    // * TODO: 이미 존재하는 email의 경우 예외처리
    if (user) {
      throw new Error("이미 등록된 이메일입니다. 다시 한 번 확인해 주세요.");
    }

    const hashedPassword: string = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    await this.userModel.singnup(email, hashedPassword);
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user: User = await this.userModel.getUserByEmail(email);
    if (!user) {
      throw new Error("해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    const storedHashedPassword: string = user.password;
    const isPasswordCorrect: boolean = await bcrypt.compare(password, storedHashedPassword);

    if (!isPasswordCorrect) {
      throw new Error("비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.");
    }

    const secretKey: string = process.env.JWT_SECRET_KEY as string;
    const token: string = jwt.sign({ userEmail: email }, secretKey);

    return { token };
  }
}

const userService = new UserService(userModel);

export { userService };
