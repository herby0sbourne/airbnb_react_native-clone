import { Stack } from "expo-router";
import { View } from "react-native";
import { useMemo, useState } from "react";

import Listings from "@/components/Listings";
import ListingsMap from "@/components/ListingsMap";
import ExploreHeader from "@/components/ExploreHeader";

import { Listing } from "@/types";
import listingsData from "@/assets/data/air-bnb-listings.json";
// import listingsDataGeo from "@/assets/data/airbnb-listings.geo.json";

const Page = () => {
  const [category, setCategory] = useState("Tiny Home");
  const items = useMemo(() => listingsData as Listing[], []);

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => (
            <ExploreHeader onCategoryChange={handleCategoryChange} />
          ),
        }}
      />
      {/*<Listings category={category} listings={items.toSpliced(2)} />*/}
      <ListingsMap listings={items as Listing[]} />
    </View>
  );
};
export default Page;
