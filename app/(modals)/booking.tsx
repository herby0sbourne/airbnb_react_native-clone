import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";
import Fonts from "@/constants/Fonts";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Colors from "@/constants/Colors";
import { places } from "@/types/places";
import DatePicker from "react-native-modern-datepicker";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const guestsGroup = [
  {
    name: "Adults",
    text: "Ages 13 or above",
    count: 0,
  },
  {
    name: "Children",
    text: "Ages 2-12",
    count: 0,
  },
  {
    name: "Infants",
    text: "Under 2",
    count: 0,
  },
  {
    name: "Pets",
    text: "Pets allowed",
    count: 0,
  },
];

const Page = () => {
  // const insets = useSafeAreaInsets();
  const router = useRouter();
  const [openCard, setOpenCard] = useState(0);
  const [selectPlace, setSelectPlace] = useState(0);
  const [groups, setGroups] = useState(guestsGroup);
  const today = new Date().toISOString().split("T")[0];

  const clearInputFields = () => {
    setOpenCard(0);
    setSelectPlace(0);
    setGroups(guestsGroup);
  };

  const updateGuest = (type: string, index: number) => {
    const newGroup = [...groups];

    if (type === "increase") {
      newGroup[index].count++;
    }

    if (type === "decrease") {
      newGroup[index].count--;
    }
    setGroups(newGroup);
  };

  return (
    // <SafeAreaView style={{flex: 1}}>
    <BlurView
      intensity={70}
      style={[styles.container]}
      experimentalBlurMethod={"dimezisBlurView"}
    >
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
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
              Where to?
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
              <View style={styles.searchBar}>
                <Ionicons name={"search-outline"} size={20} color={Colors.dark} />
                <TextInput style={styles.textInput} placeholder={"Search destination"} />
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 25, paddingHorizontal: 20 }}
              >
                {places.map(({ img, title }, index) => {
                  return (
                    <TouchableOpacity key={title} onPress={() => setSelectPlace(index)}>
                      <Image
                        source={img}
                        style={selectPlace === index ? styles.placeSelect : styles.place}
                      />
                      <Text
                        style={[
                          { fontFamily: Fonts.fontNormal, paddingTop: 6 },
                          selectPlace === index ? { fontFamily: Fonts.fontBold } : null,
                        ]}
                      >
                        {title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </Animated.View>
          </>
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
          <>
            <Animated.View entering={FadeIn}>
              <Text style={styles.cardHeader}>When's your trip</Text>
            </Animated.View>
            <Animated.View style={styles.cardBody}>
              <DatePicker
                mode="calendar"
                options={{
                  defaultFont: Fonts.fontNormal,
                  headerFont: Fonts.fontSemiBold,
                  borderColor: "transparent",
                  mainColor: Colors.primary,
                }}
                current={today}
                selected={today}
              />
            </Animated.View>
          </>
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
          <>
            <Animated.View entering={FadeIn}>
              <Text style={styles.cardHeader}>Who's coming?</Text>
            </Animated.View>
            <Animated.View style={styles.cardBody}>
              {groups.map((group, index) => {
                return (
                  <View
                    key={group.name}
                    style={[styles.group, index + 1 === groups.length && styles.noBorder]}
                  >
                    <View>
                      <Text style={[styles.fontText, { fontFamily: Fonts.fontSemiBold }]}>
                        {group.name}
                      </Text>
                      <Text style={[styles.fontText, { color: Colors.gray }]}>
                        {group.text}
                      </Text>
                    </View>
                    <View style={styles.countWrapper}>
                      <TouchableOpacity
                        onPress={() => updateGuest("decrease", index)}
                        disabled={group.count === 0}
                      >
                        <Ionicons
                          name={"remove-circle-outline"}
                          size={35}
                          color={group.count > 0 ? Colors.gray : "#cdcdcd"}
                        />
                      </TouchableOpacity>
                      <Text style={styles.countValue}>{group.count}</Text>
                      <TouchableOpacity onPress={() => updateGuest("increase", index)}>
                        <Ionicons
                          name={"add-circle-outline"}
                          size={35}
                          color={Colors.gray}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </Animated.View>
          </>
        )}
      </View>
      {/*FOOTER*/}
      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
            ]}
          >
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
  cardBody: {
    // paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchBar: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 10,
    gap: 10,
    height: 50,
    marginBottom: 16,
    marginHorizontal: 20,
  },
  textInput: {
    flex: 1,
    // paddingVertical: 10,
  },
  place: {
    width: 126,
    height: 126,
    borderRadius: 10,
  },
  placeSelect: {
    width: 126,
    height: 126,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.gray,
  },
  group: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // padding: 20,
    marginHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.gray,
  },
  countWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  countValue: {
    fontFamily: Fonts.fontNormal,
    fontSize: 16,
    textAlign: "center",
    minWidth: 18,
  },
  fontText: {
    fontFamily: Fonts.fontNormal,
    fontSize: 14,
  },
  noBorder: {
    borderColor: "transparent",
    paddingBottom: 0,
  },
});

export default Page;
