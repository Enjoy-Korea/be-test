import { check } from "express-validator";

export const userValidator = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("이메일을 입력해 주세요.")
    .isEmail()
    .withMessage("이메일의 형식이 올바르지 않습니다.")
    .isLength({ min: 5, max: 64 })
    .withMessage("이메일은 5~64자 사이로 입력해 주세요."),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("비밀번호를 입력해 주세요.")
    .isLength({ min: 4, max: 20 })
    .withMessage("비밀번호는 4~20자 사이로 입력해 주세요."),
];
