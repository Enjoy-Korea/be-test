# enkor-bnb 김건우 과제 제출

## 1. ERD
![](./docs/enkor-bnb-erd.png)

## 2. 실행 방법
- DB 세팅을 위한 컨테이너 실행
  - docker compose up -d enkor_development 
- 의존성 설치
  - npm i
- development 환경으로 프로젝트 실행
  - npm run start:dev
- Unit Test
  - npm run test 또는 npm run test:watch

## 3. API 문서
- npm run start:dev로 프로젝트 실행 후 localhost:8000/api/docs로 접속

## 4. 구현 기능
- 회원 기능
  - ✅ 회원 가입(회원가입 시 자동 로그인)
  - ✅ 로그인(세션 쿠키 기반의 jwt 인증)
  - ✅ 회원 가입 및 로그인은 이메일을 사용합니다.(email 검증 추가)
  - ✅ 비밀번호는 암호화 되어야 합니다.(bcrypt 사용)
  - ✅ JWT만을 이용해 인증기능이 구현되어야 합니다.
- 매물 조회 기능
  - ✅ 매물 정보: 타이틀, 주변대학, 매물 타입, 이미지 URL, 설명, 주소, 가격.
  - ✅ 사용자는 매물 리스트를 볼 수 있어야 합니다. 페이지네이션이 필요합니다. 리스트에는 타이틀, 주변대학, 이미지, 매물 타입, 가격이 나옵니다.
  - ✅ 사용자는 상품 리스트를 가격순으로 정렬할 수 있습니다.
  - ✅ 사용자는 상품 상세 정보를 볼 수 있어야 합니다.
- 숙박 예약
  - ✅ 사용자는 숙박 시설을 예약할 수 있어야 합니다.
  - ✅ 사용자는 예약한 내용을 확인할 수 있어야 합니다.

## 5. 구현 포인트
### 1. CLS를 이용한 Transaction 적용
- 횡단 관심사에 속하는 트랜잭션을 cls-hooked를 이용해 미들웨어에서 세션을 형성하고, house 및 image 레포지토리에서 활용하여 관심사를 분리하였습니다.
  - cls-hooked: Continuation Local Storage로, 각각의 요청 scope에서만 접근할 수 있는 저장공간을 형성할 수 있도록 하는 라이브러리
### 2. 순수 SQL을 활용한 DB Overfetching 예방
- 예약 내역 조회 등 전체 JOIN이 불필요한 데이터를 조회하는 경우 ORM의 relation 및 eager 옵션이 아닌 순수 SQL문을 통해 조회하여 Overfetching을 예방하였습니다.
  - ORM 옵션 및 메서드 사용 시 발생할 수 있는 N+1 문제 예방 목적
### 3. Unit Test 적용
- Service Layer 및 예약 기간 검증 함수, Dto에 대한 유닛 테스트를 작성하였습니다.
  - Test Suites 10개 / Test Cases 43개
### 4. PaginationOptions Class를 활용한 pagination
- 숙소 리스트 조회 시 page, sort, order, limit 쿼리를 갖는 페이지네이션 클래스를 통해 페이지네이션 기능을 구현하였습니다.
  - 미입력 시 page, sort, order, limit 기본값 1, date, desc, 5로 설정
### 5. 인터페이스 - 구현의 분리
- Service & Repository가 의존하는 인터페이스를 분리하고, 실제 구현체는 프레임워크를 통해 주입하도록 구현하였습니다.