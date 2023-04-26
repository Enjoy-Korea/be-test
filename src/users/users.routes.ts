import { Router, Request, Response, NextFunction } from "express";
import { userService } from "./users.service";

const router = Router();

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

export default router;