import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

const categories: {
  name: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
}[] = [
  {
    name: 'Tiny homes',
    icon: 'home',
  },
  {
    name: 'Cabins',
    icon: 'house-siding',
  },
  {
    name: 'Trending',
    icon: 'local-fire-department',
  },
  {
    name: 'Play',
    icon: 'videogame-asset',
  },
  {
    name: 'City',
    icon: 'apartment',
  },
  {
    name: 'Beachfront',
    icon: 'beach-access',
  },
  {
    name: 'Countryside',
    icon: 'nature-people',
  },
];

const ExploreHeader = () => {
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemRef.current[index];
    setActiveIndex(index);

    // selected?.measure((x) => {
    //   scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    //   // scrollRef.current?.scrollTo({ x: x, y: 0, animated: true });
    // });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.searchRow}>
          <Link href={'/(modals)/booking'} asChild>
            <TouchableOpacity style={styles.searchBar}>
              <Ionicons name="search" size={24} />
              <View>
                <Text style={{ fontFamily: Fonts.fontSemiBold }}>Where to?</Text>
                <Text style={{ fontFamily: Fonts.fontNormal, color: Colors.gray }}>
                  Anywhere · Any week
                </Text>
              </View>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          // style={{ flex: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center', gap: 20, paddingHorizontal: 16 }}
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            // coordinate[item.key] = layout.x;
            console.log({ layout });
          }}
        >
          {categories.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                ref={(el) => (itemRef.current[index] = el)}
                onPress={() => selectCategory(index)}
                style={[
                  styles.categoriesBtn,
                  activeIndex === index && styles.categoriesBtnActive,
                ]}
              >
                <MaterialIcons
                  name={item.icon}
                  size={24}
                  color={activeIndex === index ? 'black' : '#9f9f9f'}
                />
                <Text
                  style={[
                    styles.categoryText,
                    activeIndex === index && styles.categoryTextActive,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 140,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 10,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 24,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'white',
    borderColor: '#C2C2C2',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 30,
    padding: 14,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  categoryText: {
    color: Colors.gray,
    fontFamily: Fonts.fontSemiBold,
    fontSize: 14,
  },
  categoryTextActive: {
    color: 'black',
    fontFamily: Fonts.fontSemiBold,
    fontSize: 14,
  },
  categoriesBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
});

export default ExploreHeader;
