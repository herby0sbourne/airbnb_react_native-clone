import Fonts from "@/constants/Fonts";
import { defaultStyles } from "@/constants/Styles";
import { Listing } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { memo, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ListRenderItem,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

interface Props {
  listings: Listing[];
  category: string;
}

const Listings = ({ category, listings }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    console.log("reloaded", listings.length);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, [category]);

  const ListingCard: React.FC<{ item: Listing }> = memo(({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <Animated.View
            style={styles.listing}
            entering={FadeInRight}
            exiting={FadeOutLeft}
          >
            <Image
              source={{ uri: item.medium_url || "" }}
              style={styles.image}
            />
            <TouchableOpacity style={styles.heartBtn}>
              <Ionicons name="heart-outline" size={24} color={"black"} />
            </TouchableOpacity>

            <View>
              <View style={styles.topRow}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.ratings}>
                  <Ionicons name="star" size={14} color={"black"} />
                  <Text style={{ fontFamily: Fonts.fontSemiBold }}>
                    {(item.review_scores_rating ?? 0) / 20}
                  </Text>
                </View>
              </View>

              <View>
                <Text style={{ fontFamily: Fonts.fontNormal }}>
                  {item.room_type}
                </Text>
                <View style={{ flexDirection: "row", gap: 4 }}>
                  <Text style={{ fontFamily: Fonts.fontSemiBold }}>
                    ${item.price}
                  </Text>
                  <Text style={{ fontFamily: Fonts.fontNormal }}>night</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    );
  });

  return (
    <View style={defaultStyles.container}>
      <FlatList
        ref={listRef}
        renderItem={({ item }) => <ListingCard item={item} />}
        data={isLoading ? [] : listings}
        keyExtractor={(item) => item.id.toString()}
        // Optimize options
        initialNumToRender={10}
        windowSize={21}
        // getItemLayout={getItemLayout}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    // marginVertical: 16,
    marginBottom: 15,
    backgroundColor: "pink",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  heartBtn: {
    position: "absolute",
    right: 30,
    top: 30,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: { fontSize: 14, fontFamily: Fonts.fontSemiBold },
  ratings: { flexDirection: "row", alignItems: "center", gap: 5 },
});

export default Listings;
