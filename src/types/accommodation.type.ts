export interface Image {
  url: string;
  key: number;
}

export interface Accommodation {
  id: number;
  name: string;
  houseType: string;
  university: string[];
  pricePerDay: number;
  imageURL: string;
  URLKey: number;
}

export interface parsedAccommodation {
  id: number;
  name: string;
  houseType: string;
  university: string[];
  pricePerDay: number;
  images: Image[];
}

export interface AccommodationDetail extends Accommodation {
  description: string;
  address: string;
}

export interface parsedAccommodationDetail extends parsedAccommodation {
  description: string;
  address: string;
}

export interface University {
  accommodation_id: number;
  name: string;
}

export interface UniversityName {
  name: string;
}
