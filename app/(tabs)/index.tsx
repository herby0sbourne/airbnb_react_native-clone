import { Stack } from "expo-router";
import { View } from "react-native";
import { useMemo, useState } from "react";

import ListingsMap from "@/components/ListingsMap";
import ExploreHeader from "@/components/ExploreHeader";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";

import { Listing } from "@/types";
import { ListWIthImage } from "@/utils/formatListing";

const Page = () => {
  const [category, setCategory] = useState("Tiny Home");
  const items = useMemo(() => ListWIthImage(), []);

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChange={handleCategoryChange} />,
        }}
      />
      <ListingsMap listings={items as Listing[]} />
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  );
};
export default Page;
