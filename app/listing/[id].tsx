import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { useLayoutEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';

import { Listing } from '@/types';
import Fonts from '@/constants/Fonts';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import listingsData from '@/assets/data/air-bnb-listings.json';

const IMG_HEIGHT = 300;
const { width } = Dimensions.get('window');

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const listing = (listingsData as Listing[]).find((listing) => listing.id === id);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const navigation = useNavigation();

  if (!listing) {
    return <Text>Loading or listing not found...</Text>;
  }

  const scrollOffset = useScrollViewOffset(scrollRef);

  const shareLink = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Animated.View style={[headerAnimatedStyle, styles.header]} />
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity onPress={() => shareLink()} style={styles.roundButton}>
            <Ionicons name="share-outline" size={22} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => shareLink()} style={styles.roundButton}>
            <Ionicons name="heart-outline" size={22} color={'black'} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundButton}>
          <Ionicons name="chevron-back" size={22} color={'black'} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 72 }}
        scrollEventThrottle={16}
      >
        <Animated.Image
          source={{ uri: listing!.xl_picture_url || '' }}
          style={[styles.image, imageAnimatedStyle]}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing!.name}</Text>
          <Text style={styles.location}>
            {listing!.room_type} in {listing!.smart_location}
          </Text>
          <Text style={styles.rooms}>
            {listing!.guests_included} guests · {listing!.bedrooms} bedrooms ·{' '}
            {listing!.beds} bed · {listing!.bathrooms} bathrooms
          </Text>
          <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>
              {(listing.review_scores_rating || 0) / 20} · {listing!.number_of_reviews}{' '}
              reviews
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.hostView}>
            <Image source={{ uri: listing!.host_picture_url }} style={styles.host} />

            <View>
              <Text style={{ fontWeight: '500', fontSize: 16 }}>
                Hosted by {listing!.host_name}
              </Text>
              <Text>Host since {listing!.host_since}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>{listing!.description}</Text>
        </View>
      </Animated.ScrollView>

      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>${listing!.price}</Text>
            <Text>night</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}
          >
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingBottom: 75,
  },
  image: {
    width: width,
    height: IMG_HEIGHT,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: Fonts.fontSemiBold,
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: Fonts.fontSemiBold,
  },
  rooms: {
    fontSize: 16,
    color: Colors.gray,
    marginVertical: 4,
    fontFamily: Fonts.fontNormal,
  },
  ratings: {
    fontSize: 16,
    fontFamily: Fonts.fontSemiBold,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.gray,
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: Fonts.fontSemiBold,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: Fonts.fontNormal,
  },
});

export default Page;
