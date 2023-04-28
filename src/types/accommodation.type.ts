export interface Image {
  url: string;
  key: number;
}

export interface Accommodation {
  id: number;
  name: string;
  description: string;
  address: string;
  university: string;
  pricePerDay: number;
  imageURL: string;
  URLKey: number;
}

export interface parsedAccommodation {
  id: number;
  name: string;
  description: string;
  address: string;
  university: string[];
  pricePerDay: number;
  images: Image[];
}
