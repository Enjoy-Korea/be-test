import "dotenv/config";
import { userModel, UserModel } from "./users.model";
import * as bycrypt from "bcrypt";
import { User } from "../types/users.type";

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

    const hashedPassword: string = await bycrypt.hash(password, Number(process.env.SALT_ROUNDS));
    await this.userModel.singnup(email, hashedPassword);
  }
}

const userService = new UserService(userModel);

export { userService };
