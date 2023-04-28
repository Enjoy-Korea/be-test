import "dotenv/config";
import { accommodationModel, AccommodationModel } from "./accommodations.model";
import { Accommodation, parsedAccommodation, Image } from "../types/accommodation.type";

class AccommodationService {
  private accommodationModel: AccommodationModel;

  constructor(accommodationModel: AccommodationModel) {
    this.accommodationModel = accommodationModel;
  }

  private parsingAccommodation(accommodation: Accommodation[], accommodation_university: { name: string }[]): parsedAccommodation {
    const parsedAccommodation: parsedAccommodation = {
      id: accommodation[0].id,
      name: accommodation[0].name,
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

  async getAccommodationById(id: number): Promise<parsedAccommodation> {
    const accommodation: Accommodation[] = await accommodationModel.getAccommodationById(id);
    const accommodation_university: { name: string }[] = await accommodationModel.getUniversityNameByAccommodationId(id);

    // TODO: 404 error로 던질 수 있게 수정 (현재 400 에러)
    if (accommodation.length < 1) {
      throw new Error("Accommodation not found");
    }

    return this.parsingAccommodation(accommodation, accommodation_university);
  }
}

const accommodationService = new AccommodationService(accommodationModel);

export { accommodationService };
