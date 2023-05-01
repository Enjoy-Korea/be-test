import { Router, Request, Response, NextFunction } from "express";
import { accommodationService } from "./accommodations.service";
import { userValidator } from "../middlewares/user-validator";
import { validationResult } from "express-validator";
import { parsedAccommodationDetail, parsedAccommodation } from "../types/accommodation.type";

const router = Router();

// * 숙소 상세 조회
/**
 * @openapi
 * '/api/accommodations/{id}':
 *  get:
 *    tags:
 *      - Accommodations
 *    summary: 숙소 상세 조회 API
 *    description: 숙소 상세 데이터를 조회합니다.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: 조회하고 싶은 숙소 ID를 입력해 주세요.
 *    responses:
 *      200:
 *        description: 숙소 상세 정보를 반환합니다.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/parsedAccommodationDetail'
 *      400:
 *        description: Bad request
 *
 */
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

// * 전체 숙소 리스트 조회
/**
 * @openapi
 * '/api/accommodations':
 *  get:
 *    tags:
 *      - Accommodations
 *    summary: 숙소 리스트 조회
 *    description: 모든 숙소 목록을 가져오는 API로, 페이지네이션과 정렬 옵션을 선택할 수 있습니다.
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description: 불러올 페이지 번호입니다.
 *      - in: query
 *        name: per_page
 *        schema:
 *          type: integer
 *          minimum: 1
 *          maximum: 100
 *        description: 한 페이지당 검색할 숙소 개수를 나타내는 값입니다. 최대값은 100입니다.
 *      - in: query
 *        name: sort
 *        schema:
 *          type: string
 *          enum: [price_low, price_high]
 *        description: 정렬 기준입니다. 가격이 낮은 순으로 정렬하려면 'price_low', 높은 순으로 정렬하려면 'price_high'를 입력하세요.
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accommodationsPerPage:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/parsedAccommodation'
 *                maxPageNum:
 *                  type: integer
 *
 *      400:
 *        description: Bad request. page나 per_page 중 하나의 매개변수가 잘못되었습니다.
 *      500:
 *        description: Internal server error.
 *
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const currentPageNum: number = Number(req.query.page);
  const perPage: number = Number(req.query.per_page);
  const sort: string | undefined = req.query.sort as string | undefined;

  try {
    let accommodations: parsedAccommodation[];

    if (sort === "price_low") {
      accommodations = await accommodationService.getAllAccommodationsBySortingPrice("ASC");
    } else if (sort === "price_high") {
      accommodations = await accommodationService.getAllAccommodationsBySortingPrice("DESC");
    } else {
      accommodations = await accommodationService.getAllAccommodations();
    }

    // * pagination
    const accommodationsLength: number = accommodations.length;
    const maxPageNum: number = Math.ceil(accommodationsLength / perPage);

    if (isNaN(currentPageNum) || currentPageNum < 1 || currentPageNum > maxPageNum) {
      throw new Error("올바르지 않은 page 번호입니다.");
    }

    if (isNaN(perPage) || perPage < 1) {
      throw new Error("올바르지 않은 per_page 번호입니다.");
    }

    const accommodationsPerPage = await accommodationService.pagination(accommodations, currentPageNum, perPage);

    res.status(200).json({ accommodationsPerPage, maxPageNum });
  } catch (error) {
    next(error);
  }
});

export default router;
