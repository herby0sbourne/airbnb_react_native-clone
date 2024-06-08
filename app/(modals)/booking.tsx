import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {BlurView} from "expo-blur";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Animated, {FadeIn, SlideInDown} from "react-native-reanimated";
import {defaultStyles} from "@/constants/Styles";
import Fonts from "@/constants/Fonts";
import {useRouter} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {useState} from "react";
import Colors from "@/constants/Colors";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Page = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [openCard, setOpenCard] = useState(0);
  const [selectPlace, setSelectPlace] = useState(0);

  const clearInputFields = () => {
    setOpenCard(0);
    setSelectPlace(0);
  };

  return (
    // <SafeAreaView style={{flex: 1}}>
    <BlurView
      intensity={70}
      style={[styles.container]}
      experimentalBlurMethod={"dimezisBlurView"}>
      {/*WHERE*/}
      <View style={styles.card}>
        {openCard !== 0 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(0)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            // exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Where</Text>
            <Text style={styles.previewDate}>I'm flexible</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 0 && (
          <Animated.View entering={FadeIn}>
            <Text style={styles.cardHeader}>Where to?</Text>
          </Animated.View>
        )}
      </View>
      {/*WHEN*/}
      <View style={styles.card}>
        {openCard !== 1 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(1)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            // exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>When</Text>
            <Text style={styles.previewDate}>Any week</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 1 && (
          <Animated.View entering={FadeIn}>
            <Text style={styles.cardHeader}>when's your trip</Text>
          </Animated.View>
        )}
      </View>
      {/*WHO*/}
      <View style={styles.card}>
        {openCard !== 2 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(2)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            // exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Who</Text>
            <Text style={styles.previewDate}>Add guest</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 2 && (
          <Animated.View entering={FadeIn}>
            <Text style={styles.cardHeader}>Who's coming?</Text>
          </Animated.View>
        )}
      </View>
      {/*FOOTER*/}
      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <TouchableOpacity onPress={clearInputFields}>
            <Text style={styles.text}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[
              defaultStyles.btn,
              {
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                gap: 10,
              },
            ]}>
            <Ionicons
              name={"search-outline"}
              size={24}
              color={"white"}
              // style={defaultStyles.btnIcon}
            />
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
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
  text: {
    fontFamily: Fonts.fontSemiBold,
    fontSize: 18,
    textDecorationLine: "underline",
  },
  card: {
    gap: 20,
    backgroundColor: "white",
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  previewText: {
    fontFamily: Fonts.fontSemiBold,
    fontSize: 14,
    color: Colors.gray,
  },
  previewDate: {
    fontFamily: Fonts.fontSemiBold,
    fontSize: 14,
    color: Colors.dark,
  },
  cardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  cardHeader: {
    fontFamily: Fonts.fontBold,
    fontSize: 24,
    padding: 20,
  },
});

export default Page;
