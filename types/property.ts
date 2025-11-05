export interface Property {
  id: string;
  title: string;
  slug: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: "house" | "apartment" | "condo" | "townhouse" | "land" | "commercial";
  status: "for-sale" | "for-rent" | "sold" | "rented" | "pending";
  image: string;
  description?: string;
  features?: string[];
  yearBuilt?: number;
  parking?: number;
}

