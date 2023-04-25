# enkor-bnb 최의림

## 필수 스택
- Node.js 14 이상
- Express.js or Nest.js
- MySQL or Sqlite
- Typescript or Javascript

## 구현 기능
숙박 플랫폼을 서비스하기 위한 REST API를 구현해야 합니다.

- 회원 기능
    - [x] 회원 가입
    - [x] 로그인
    - [x] 회원 가입 및 로그인은 이메일을 사용합니다.
    - [x] 비밀번호는 암호화 되어야 합니다.
    - [x] JWT만을 이용해 인증기능이 구현되어야 합니다.
- 매물 조회 기능
    - [x] 매물 정보: 타이틀, 주변대학, 매물 타입, 이미지 URL, 설명, 주소, 가격.
    - [x] 사용자는 매물 리스트를 볼 수 있어야 합니다. 페이지네이션이 필요합니다. 리스트에는 타이틀, 주변대학, 이미지, 매물 타입, 가격이 나옵니다.
    - [x] 사용자는 상품 리스트를 가격순으로 정렬할 수 있습니다.
    - [x] 사용자는 상품 상세 정보를 볼 수 있어야 합니다.
## 구현 시 우대사항
- 숙박 예약
    - [x] 사용자는 숙박 시설을 예약할 수 있어야 합니다.
    - [x] 사용자는 예약한 내용을 확인할 수 있어야 합니다.

## 우대사항
- [x] Typescript 사용
- [x] 유닛 테스트 (일부 로직 테스트 진행)
- [x] 문서화


# 개발 내용
## ERD
![image](https://user-images.githubusercontent.com/91925895/234318434-11955c2d-8ad6-4a44-bd50-731136cf8483.png)

## 프로젝트 실행 방법
- 의존성 설치
  - npm i 
- 개발 환경 실행
  - npm run start:dev
- 유닛 테스트 진행
  - npm run test 

## api 문서
- 프로젝트 로컬 실행 후 웹을 통해 localhost:3000/api 접속 
![image](https://user-images.githubusercontent.com/91925895/234319958-58f46767-d9d0-49cc-b57b-c8ecfa124fed.png)

