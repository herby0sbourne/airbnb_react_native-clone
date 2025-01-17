import listingsData from "@/assets/data/air-bnb-listings.json";
import { Listing } from "@/types";

export const ListWIthImage = () => {
  return (listingsData as Listing[]).filter((item: Listing) => {
    return item.medium_url !== null;
  });
};
