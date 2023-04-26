import { Router, Request, Response, NextFunction } from "express";
import { userService } from "./users.service";
import { userValidator } from "../middlewares/user-validator";
import { validationResult } from "express-validator";

const router = Router();

// * 회원가입
router.post("/signup", userValidator, async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }

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
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }

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
