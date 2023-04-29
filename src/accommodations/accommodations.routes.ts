import { Router, Request, Response, NextFunction } from "express";
import { accommodationService } from "./accommodations.service";
import { userValidator } from "../middlewares/user-validator";
import { validationResult } from "express-validator";
import { parsedAccommodationDetail, parsedAccommodation } from "../types/accommodation.type";

const router = Router();

// * 매물 상세 조회
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const accommodation_id = Number(req.params.id);

  try {
    // * ID가 유효하지 않은 경우 예외 처리
    if (isNaN(accommodation_id) || accommodation_id <= 0) {
      throw new Error("Invalid ID");
    }

    const accommodation: parsedAccommodationDetail = await accommodationService.getAccommodationById(accommodation_id);

    res.status(200).json(accommodation);
  } catch (error) {
    next(error);
  }
});

// * 전체 매물 리스트 조회
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const currentPageNum: number = Number(req.query.page);
  const perPage = 2;
  try {
    const accommodations: parsedAccommodation[] = await accommodationService.getAllAccommodations();

    // * pagination
    const accommodationsLength: number = accommodations.length;
    const maxPageNum: number = Math.ceil(accommodationsLength / perPage);

    if (isNaN(currentPageNum) || currentPageNum < 1 || currentPageNum > maxPageNum) {
      throw new Error("올바르지 않은 page 번호입니다.");
    }

    const accommodationsPerPage = await accommodationService.pagination(accommodations, currentPageNum, perPage);

    res.status(200).json({ accommodationsPerPage, maxPageNum });
  } catch (error) {
    next(error);
  }
});

export default router;
