import { Router, Request, Response, NextFunction } from "express";
import { accommodationService } from "./accommodations.service";
import { userValidator } from "../middlewares/user-validator";
import { validationResult } from "express-validator";
import { parsedAccommodation } from "../types/accommodation.type";

const router = Router();

// * 매물 상세 조회
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const accommodation_id = Number(req.params.id);

  try {
    // * ID가 유효하지 않은 경우 예외 처리
    if (isNaN(accommodation_id) || accommodation_id <= 0) {
      throw new Error("Invalid ID");
    }

    const accommodation: parsedAccommodation = await accommodationService.getAccommodationById(accommodation_id);

    res.status(200).json(accommodation);
  } catch (error) {
    next(error);
  }
});

export default router;
