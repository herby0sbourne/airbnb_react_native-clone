import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useMemo, useState } from 'react';

import Listings from '@/components/Listings';
import ExploreHeader from '@/components/ExploreHeader';

import { Listing } from '@/types';
import listingsData from '@/assets/data/air-bnb-listings.json';

const Page = () => {
  const [category, setCategory] = useState('Tiny Home');
  const items = useMemo(() => listingsData as Listing[], []);

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
      <Listings category={category} listings={items} />
    </View>
  );
};
export default Page;
