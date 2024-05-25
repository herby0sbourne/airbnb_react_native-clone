export interface Listing {
  id: number;
  name: null | string;
  host_id: number;
  neighbourhood: string;
  room_type: string;
  column_10: number;
  minimum_nights: number;
  number_of_reviews: number;
  last_review: null | string;
  reviews_per_month: null | number;
  calculated_host_listings_count: number;
  availability_365: number;
  updated_date: string;
  city: string;
  column_19: string;
  coordinates: Coordinates;
  column_20: string;
}

export interface Coordinates {
  lon: number;
  lat: number;
}
