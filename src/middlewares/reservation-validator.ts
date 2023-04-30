import { check } from "express-validator";

export const reservationValidator = [
  check("accommodation_id")
    .trim()
    .notEmpty()
    .withMessage("accommodation-id를 입력해 주세요")
    .isInt()
    .withMessage("accommodation-id은 정수값을 입력해 주세요."),

  check("check_in_date")
    .trim()
    .notEmpty()
    .withMessage("날짜를 입력해 주세요.")
    .isDate()
    .withMessage("올바른 날짜 형식이 아닙니다.")
    .isISO8601()
    .toDate(),

  check("check_out_date")
    .trim()
    .notEmpty()
    .withMessage("날짜를 입력해 주세요.")
    .isDate()
    .withMessage("올바른 날짜 형식이 아닙니다.")
    .isISO8601()
    .toDate(),
];
