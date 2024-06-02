import { useRouter } from "expo-router";
import MapView from "react-native-map-clustering";
import { StyleSheet, Text, View } from "react-native";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { Listing } from "@/types";
import { Cluster } from "@/types/Cluster";

import Fonts from "@/constants/Fonts";
import { memo } from "react";

interface Props {
  listings: Listing[];
}

const INITIAL_REGION = {
  latitude: 52.5,
  longitude: 13.3,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const ListingsMap = memo(({ listings }: Props) => {
  const router = useRouter();

  const onMarkerPress = (listing: Listing) => {
    router.push(`/listing/${listing.id}`);
  };

  const renderCluster = (cluster: Cluster) => {
    const { id, geometry, properties, onPress } = cluster;
    const points = properties.point_count;

    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        coordinate={{
          latitude: geometry.coordinates[0],
          longitude: geometry.coordinates[1],
        }}
      >
        <View style={styles.marker}>
          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontFamily: Fonts.fontSemiBold,
            }}
          >
            {points}
          </Text>
        </View>
      </Marker>
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        animationEnabled={false}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={INITIAL_REGION}
        //react-native-map-clustering props
        clusterColor={"white"}
        clusterTextColor={"black"}
        clusterFontFamily={Fonts.fontSemiBold}
        // renderCluster={renderCluster}
      >
        {listings.map((listing) => (
          <Marker
            key={listing.id}
            onPress={() => onMarkerPress(listing)}
            coordinate={{
              latitude: +listing.latitude,
              longitude: +listing.longitude,
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerPrice}>${listing.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  marker: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerPrice: {
    fontSize: 14,
    fontFamily: Fonts.fontSemiBold,
  },
});

export default ListingsMap;
