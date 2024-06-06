import {View, Text, StyleSheet} from "react-native";
import {BlurView} from "expo-blur";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";

const Page = () => {
  const insets = useSafeAreaInsets();

  // console.log(data);
  return (
    // <SafeAreaView style={{flex: 1}}>
    <BlurView
      intensity={70}
      style={[styles.container]}
      experimentalBlurMethod={"dimezisBlurView"}>
      <Text>Booking</Text>
    </BlurView>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    margin: 16,
    textAlign: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 20,
  },
});

export default Page;
