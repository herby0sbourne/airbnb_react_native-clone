import { Listing } from '@/types';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

interface Porps {
  listings: Listing[];
  category: string;
}

const Listings = ({ category, listings }: Porps) => {
  console.log(listings.length);

  useEffect(() => {
    console.log('reloaded');
  }, [category]);

  return (
    <View>
      <Text>Listings</Text>
    </View>
  );
};

export default Listings;
