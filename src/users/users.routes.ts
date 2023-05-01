import { Router, Request, Response, NextFunction } from "express";
import { userService } from "./users.service";
import { userValidator } from "../middlewares/user-validator";
import { validationResult } from "express-validator";

const router = Router();

// * 회원가입
/**
 * @openapi
 * '/api/users/signup':
 *  post:
 *    tags:
 *      - Users
 *    summary: 회원가입
 *    description: 새로운 유저 추가
 *    requestBody:
 *     description: 이메일 주소는 유효한 이메일 형식에 따라 입력하시고, 5~64자 사이로 입력해 주세요. <br> 패스워드는 4~20자 사이로 입력해 주세요.
 *     required: true
 *     content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateUserInput'
 *    responses:
 *      201:
 *        description: 회원가입 성공시 'SUCCESS' 반환
 *      400:
 *        description: Bad request
 *      422:
 *        description: validation failed
 *
 */
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
/**
 * @openapi
 * '/api/users/login':
 *  post:
 *    tags:
 *      - Users
 *    summary: 로그인
 *    description: 로그인
 *    requestBody:
 *     required: true
 *     content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginInput'
 *    responses:
 *      200:
 *        description: 로그인 성공시 토큰을 반환
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *      400:
 *        description: Bad request
 *
 */
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
