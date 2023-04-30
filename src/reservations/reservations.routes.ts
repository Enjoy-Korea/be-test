import { reservationValidator } from "../middlewares/reservation-validator";
import { Router, Request, Response, NextFunction } from "express";
import { reservationService } from "./reservations.service";
import { userService } from "../users/users.service";
import { validationResult } from "express-validator";
import { loginRequired } from "../middlewares/login-requried";
import { User } from "../types/users.type";

const router = Router();

// * 예약
// TODO: 날짜 중복 체크
router.post("/", loginRequired, reservationValidator, async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }

  const accommodationId: number = req.body.accommodation_id;

  // * YYYY-MM-DD 형식의 문자열로 변환
  const checkInDate: string = req.body.check_in_date.toISOString().slice(0, 10);
  const checkOutDate: string = req.body.check_out_date.toISOString().slice(0, 10);

  try {
    if (checkInDate > checkOutDate) {
      throw new Error("체크인 날짜는 체크아웃 날짜보다 이전 날짜여야 합니다");
    }

    const user: User = await userService.getUserByEmail(req.userEmail);
    await reservationService.createReservation(user.id, accommodationId, checkInDate, checkOutDate);

    res.status(201).send("SUCCESS");
  } catch (error) {
    next(error);
  }
});

// * 예약 조회
router.get("/", loginRequired, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = await userService.getUserByEmail(req.userEmail);

    // USER ID로 예약 테이블 검색
    

    res.status(201).send("SUCCESS");
  } catch (error) {
    next(error);
  }
});

export default router;
