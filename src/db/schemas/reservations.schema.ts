/**
 * @openapi
 * components:
 *  schemas:
 *    CreateReservationInput:
 *      type: object
 *      required:
 *        - accommodation_id
 *        - check_in_date
 *        - check_out_date
 *      properties:
 *        accommodation_id:
 *          type: integer
 *        check_in_date:
 *          type: string
 *          format: date
 *        check_out_date:
 *          type: string
 *          format: date
 *      example:
 *        accommodation_id: 1
 *        check_in_date: "2023-06-01"
 *        check_out_date: "2023-06-05"
 *    Reservation:
 *      type: object
 *      properties:
 *        reservationId:
 *          type: integer
 *        reservationDate:
 *          type: string
 *          format: date-time
 *        userId:
 *          type: integer
 *        useEmail:
 *          type: string
 *          format: email
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        pricePerDay:
 *          type: number
 *        accommodationAddress:
 *          type: string
 *        checkIn:
 *          type: string
 *          format: date-time
 *        checkOut:
 *          type: string
 *          format: date-time
 *    ReservationList:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/Reservation'
 */