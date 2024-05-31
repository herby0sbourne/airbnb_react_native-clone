import { StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import { Listing } from "@/types";
import { useMemo, useRef } from "react";
import BottomSheetFlatL from "@/components/BottomSheetFlatL";

interface Props {
  listings: Listing[];
  category: string;
}

const ListingsBottomSheet = ({ listings, category }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "100%"], []);

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
      <View style={{ flex: 1 }}>
        <BottomSheetFlatL category={category} listings={listings} />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default ListingsBottomSheet;
