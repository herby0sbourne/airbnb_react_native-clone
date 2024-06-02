import { forwardRef, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";

import ListingCardItem from "@/components/ListingCardItem";

import { Listing } from "@/types";
import { defaultStyles } from "@/constants/Styles";
import Fonts from "@/constants/Fonts";

interface Props {
  listings: Listing[];
  category: string;
}

const BottomSheetFlatL = forwardRef<BottomSheetFlatListMethods, Props>(
  ({ category, listings }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    // const listRef = useRef<BottomSheetFlatListMethods>(null);

    // useImperativeHandle(ref, () => ({
    //   scrollToTop: () => {
    //     listRef.current?.scrollToOffset({ animated: true, offset: 0 });
    //   },
    // }));

    useEffect(() => {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }, [category]);

    return (
      <View style={defaultStyles.container}>
        <BottomSheetFlatList
          ref={ref}
          renderItem={({ item }) => <ListingCardItem item={item} />}
          ListHeaderComponent={
            <Text style={styles.details}>{listings.length} Homes</Text>
          }
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
  },
);

const styles = StyleSheet.create({
  details: {
    fontFamily: Fonts.fontSemiBold,
    marginTop: 4,
    textAlign: "center",
  },
});

export default BottomSheetFlatL;
