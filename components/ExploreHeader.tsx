import { Link } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useRef, useState } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import Fonts from '@/constants/Fonts';
import Colors from '@/constants/Colors';

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

interface Props {
  onCategoryChange: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChange }: Props) => {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    setActiveIndex(index);

    flatListRef.current?.scrollToIndex({
      index,
      viewPosition: 0.5,
      animated: true,
      // viewOffset: 16,
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChange(categories[index].name);
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

        <FlatList
          horizontal
          style={{ flex: 1 }}
          ref={flatListRef}
          data={categories}
          keyExtractor={(item) => item.name}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 20, paddingHorizontal: 16 }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
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
          }}
        />
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
