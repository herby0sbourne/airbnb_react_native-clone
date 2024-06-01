import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { FlatList, View } from "react-native";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";

import ListingCardItem from "@/components/ListingCardItem";

import { Listing } from "@/types";
import { defaultStyles } from "@/constants/Styles";

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

export default BottomSheetFlatL;
