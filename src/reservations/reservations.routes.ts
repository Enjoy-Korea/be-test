import { Reservation } from "types/reservation.type";
import { reservationValidator } from "../middlewares/reservation-validator";
import { Router, Request, Response, NextFunction } from "express";
import { reservationService } from "./reservations.service";
import { userService } from "../users/users.service";
import { validationResult } from "express-validator";
import { loginRequired } from "../middlewares/login-requried";
import { User } from "../types/users.type";

const router = Router();

// * 예약
/**
 * @openapi
 * '/api/reservations':
 *  post:
 *    tags:
 *      - Reservations
 *    summary: 새로운 예약을 생성
 *    description: 숙소의 지정된 체크인 및 체크아웃 날짜를 사용하여 사용자의 새로운 예약을 생성합니다.
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/CreateReservationInput'
 *    responses:
 *      201:
 *        description: Success
 *      403:
 *        description: Invalid Token
 *      422:
 *        description: Validation error(s)
 *      500:
 *        description: Internal error(s)
 *
 */
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
/**
 * @openapi
 * '/api/reservations':
 *  get:
 *    tags:
 *      - Reservations
 *    summary: 예약 조회 (JWT 토큰으로 유저 특정)
 *    description: 유저는 예약한 내용을 확인할 수 있습니다.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: 예약 정보를 반환합니다.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ReservationList'
 *      403:
 *        description: Invalid Token
 *      500:
 *        description: Internal error(s)
 *
 */
router.get("/", loginRequired, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = await userService.getUserByEmail(req.userEmail);

    const reservation: Reservation[] = await reservationService.getReservationByUserId(user.id);

    res.status(200).send(reservation);
  } catch (error) {
    next(error);
  }
});

export default router;
