import { defaultStyles } from '@/constants/Styles';
import { Listing } from '@/types';
import { Link } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ListRenderItem,
} from 'react-native';

interface Props {
  listings: Listing[];
  category: string;
}

const Listings = ({ category, listings }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    console.log('reloaded');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [category]);

  const ListingCard: ListRenderItem<Listing> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <View style={styles.listing}>
            <Image source={{ uri: item.medium_url || '' }} style={styles.image} />
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <FlatList
        ref={listRef}
        renderItem={ListingCard}
        data={isLoading ? [] : listings}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 300,
  },
});

export default Listings;
