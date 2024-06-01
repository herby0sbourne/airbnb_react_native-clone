import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { memo, useState } from "react";
import { Link } from "expo-router";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import Fonts from "@/constants/Fonts";
import { Listing } from "@/types";

interface Props {
  item: Listing;
}

const ListingCardItem = memo(({ item }: Props) => {
  const handleImageError = () => {
    setFallbackImageSource(require("../assets/images/fallBackImage.jpg"));
  };

  const [imageSource, setImageSource] = useState({ uri: item.medium_url });
  const [fallbackImageSource, setFallbackImageSource] = useState(null);

  return (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          style={styles.listing}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <Image
            source={fallbackImageSource || imageSource}
            style={styles.image}
            onError={handleImageError}
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

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    // marginVertical: 16,
    marginBottom: 15,
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
  name: {
    fontSize: 14,
    fontFamily: Fonts.fontSemiBold,
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default ListingCardItem;
