import { useMemo, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomSheet, { BottomSheetFlatListMethods } from "@gorhom/bottom-sheet";

import BottomSheetFlatL from "@/components/BottomSheetFlatL";

import { Listing } from "@/types";
import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Colors";

interface Props {
  listings: Listing[];
  category: string;
}

const ListingsBottomSheet = ({ listings, category }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetListRef = useRef<BottomSheetFlatListMethods>(null);
  const snapPoints = useMemo(() => ["10%", "100%"], []);

  const onPressShowMap = () => {
    bottomSheetRef.current?.collapse();
    bottomSheetListRef.current?.scrollToTop();
  };

  return (
    <BottomSheet
      index={1}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      // enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: Colors.gray }}
      style={styles.sheetContainer}
    >
      <View style={{ flex: 1 }}>
        <BottomSheetFlatL
          ref={bottomSheetListRef}
          category={category}
          listings={listings}
        />
        <View style={styles.mapBtn}>
          <TouchableOpacity onPress={onPressShowMap} style={styles.btn}>
            <Text style={{ color: "white", fontFamily: Fonts.fontSemiBold }}>
              Map
            </Text>
            <Ionicons name={"map"} size={20} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  mapBtn: {
    position: "absolute",
    width: "100%",
    bottom: 30,
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 16,
    height: 50,
    flexDirection: "row",
    gap: 6,
    borderRadius: 30,
  },
});

export default ListingsBottomSheet;
