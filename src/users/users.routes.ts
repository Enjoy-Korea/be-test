import { Router, Request, Response, NextFunction } from "express";
import { userService } from "./users.service";

const router = Router();

// * 회원가입
router.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  try {
    await userService.signup(email, password);

    res.status(201).send("SUCCESS");
  } catch (error) {
    next(error);
  }
});

// * 로그인
router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  try {
    const token = await userService.login(email, password);

    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
});

export default router;
