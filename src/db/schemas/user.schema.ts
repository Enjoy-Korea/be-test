/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: donghwa@enko.com
 *          description: 이메일 주소입니다. 5~64자 사이로 입력해 주세요.
 *        password:
 *          type: string
 *          default: temp1234
 *          description: 패스워드입니다. 4~20자 사이로 입력해 주세요.
 *    LoginInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: donghwa@enko.com
 *        password:
 *          type: string
 *          default: temp1234
 *    LoginResponse:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 */