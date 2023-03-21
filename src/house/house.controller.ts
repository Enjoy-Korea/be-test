import { Controller, Get } from '@nestjs/common';

@Controller('house')
export class HouseController {

    // 페이지네이션 필요, 상품리스트 가격순으로 정렬할 수 있음
    @Get()
    allHouses() {
        // 타이틀, 주변대학, 이미지, 매물타입, 가격만 나옴. 설명, 주소는 나오지 않음. 
        // Custom serialization필요
    }

    // house_id넘겨주면 상품 상세 정보를 볼 수 있어야 한다. 상세정보라는건 설명, 주소 의미하는거겠지?
    @Get()
    singleHouse() {

    }
}
