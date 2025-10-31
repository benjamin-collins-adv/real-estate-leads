export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: "house" | "apartment" | "condo" | "townhouse";
  status: "for-sale" | "for-rent";
  image: string;
  description?: string;
  features?: string[];
  yearBuilt?: number;
  parking?: number;
}

