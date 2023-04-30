import "dotenv/config";
import { accommodationModel, AccommodationModel } from "./accommodations.model";
import {
  Accommodation,
  parsedAccommodation,
  AccommodationDetail,
  parsedAccommodationDetail,
  UniversityName,
  University,
} from "../types/accommodation.type";

class AccommodationService {
  private accommodationModel: AccommodationModel;

  constructor(accommodationModel: AccommodationModel) {
    this.accommodationModel = accommodationModel;
  }

  // * 매물 상세 데이터 파싱
  private parsingAccommodation(accommodation: AccommodationDetail[], accommodation_university: UniversityName[]): parsedAccommodationDetail {
    const parsedAccommodation: parsedAccommodationDetail = {
      id: accommodation[0].id,
      name: accommodation[0].name,
      houseType: accommodation[0].houseType,
      description: accommodation[0].description,
      address: accommodation[0].address,
      university: accommodation_university.map((u) => u.name),
      pricePerDay: accommodation[0].pricePerDay,
      images: accommodation.map((a) => ({
        url: a.imageURL,
        key: a.URLKey,
      })),
    };

    return parsedAccommodation;
  }

  // * 매물 상세 반환
  async getAccommodationById(id: number): Promise<parsedAccommodationDetail> {
    const accommodation: AccommodationDetail[] = await accommodationModel.getAccommodationById(id);
    const accommodation_university: UniversityName[] = await accommodationModel.getUniversityNameByAccommodationId(id);

    if (accommodation.length < 1) {
      throw new Error("Accommodation not found");
    }

    return this.parsingAccommodation(accommodation, accommodation_university);
  }

  // * 전체 매물 리스트 데이터 파싱
  private parsingAccommodations(accommodations: Accommodation[], universities: University[]): parsedAccommodation[] {
    const parsedAccommodations: parsedAccommodation[] = [];

    accommodations.forEach((accommodation: Accommodation) => {
      const parsedAccommodation = {
        id: accommodation.id,
        name: accommodation.name,
        houseType: accommodation.houseType,
        university: [],
        pricePerDay: accommodation.pricePerDay,
        images: [{ url: accommodation.imageURL, key: accommodation.URLKey }],
      };

      const existingItem = parsedAccommodations.find((accommodation) => accommodation.id === parsedAccommodation.id);

      if (existingItem) {
        existingItem.images.push({ url: accommodation.imageURL, key: accommodation.URLKey });
      } else {
        parsedAccommodations.push(parsedAccommodation);
      }
    });

    parsedAccommodations.forEach((accommodation) => {
      accommodation.university = universities.filter((u) => u.accommodation_id === accommodation.id).map((u) => u.name);
    });

    return parsedAccommodations;
  }

  // * 전체 매물 리스트 반환
  async getAllAccommodations(): Promise<parsedAccommodation[]> {
    const accommodations: Accommodation[] = await accommodationModel.getAllAccommodations();
    const universities: University[] = await accommodationModel.getAllUniverstyNames();

    return this.parsingAccommodations(accommodations, universities);
  }

  // * 전체 매물 리스트 반환 (가격순 정렬)
  async getAllAccommodationsBySortingPrice(sortOrder: string): Promise<parsedAccommodation[]> {
    const accommodations: Accommodation[] = await accommodationModel.getAllAccommodationsBySortingPrice(sortOrder);
    const universities: University[] = await accommodationModel.getAllUniverstyNames();

    return this.parsingAccommodations(accommodations, universities);
  }

  // * 페이지네이션
  pagination(accommodations: parsedAccommodation[], currentPageNum: number, perPage: number): parsedAccommodation[] {
    return accommodations.slice(perPage * (currentPageNum - 1), perPage * (currentPageNum - 1) + perPage);
  }
}

const accommodationService = new AccommodationService(accommodationModel);

export { accommodationService };
