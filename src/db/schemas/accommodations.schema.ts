/**
 * @openapi
 * components:
 *  schemas:
 *    parsedAccommodationDetail:
 *      type: object
 *      required:
 *        - id
 *        - name
 *        - houseType
 *        - description
 *        - address
 *        - university
 *        - pricePerDay
 *        - images
 *      properties:
 *        id:
 *          type: integer
 *          format: int64
 *        name:
 *          type: string
 *        houseType:
 *          type: string
 *        description:
 *          type: string
 *        address:
 *          type: string
 *        university:
 *          type: array
 *          items:
 *            type: string
 *        pricePerDay:
 *          type: integer
 *          format: int64
 *        images:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              url:
 *                type: string
 *              key:
 *                type: integer
 *                format: int64
 *    parsedAccommodation:
 *      type: object
 *      required:
 *        - id
 *        - name
 *        - houseType
 *        - university
 *        - pricePerDay
 *        - images
 *      properties:
 *        id:
 *          type: integer
 *          format: int64
 *        name:
 *          type: string
 *        houseType:
 *          type: string
 *        university:
 *          type: array
 *          items:
 *            type: string
 *        pricePerDay:
 *          type: integer
 *          format: int64
 *        images:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              url:
 *                type: string
 *              key:
 *                type: integer
 *                format: int64
 */