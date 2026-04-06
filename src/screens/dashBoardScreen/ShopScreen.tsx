import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../itemScreen/ProductCardItem';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const BANNER_WIDTH = SCREEN_WIDTH - 32;
const BANNER_HEIGHT = 150;

type Banner = {
  id: string;
  title: string;
  subtitle: string;
  image: any;
  backgroundColor: string;
};

const banners: Banner[] = [
  {
    id: '1',
    title: 'Fresh Vegetables',
    subtitle: 'Get Up To 40% OFF',
    image: require('../../assets/onboardingBG.png'),
    backgroundColor: '#f0fce8',
  },
  {
    id: '2',
    title: 'Organic Fruits',
    subtitle: 'Buy 2 Get 1 Free',
    image: require('../../assets/onboardingBG.png'),
    backgroundColor: '#fff8e1',
  },
  {
    id: '3',
    title: 'Daily Dairy',
    subtitle: 'Fresh Every Morning',
    image: require('../../assets/onboardingBG.png'),
    backgroundColor: '#e8f4fd',
  },
];

const ShopScreen = () => {
  const [search, setSearch] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<any>();

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  // ✅ Navigate to ProductDetail, passing item data as params
  const handleProductPress = (item: Banner) => {
    navigation.navigate('ProductDetail', { product: item });
  };

  const renderBanner = ({ item }: { item: Banner }) => (
    <View
      style={[styles.bannerCard, { backgroundColor: item.backgroundColor }]}
    >
      <Image
        source={item.image}
        style={styles.bannerImage}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoEmoji}>🥕</Text>
          </View>
          <View style={styles.locationRow}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>Chandigarh, India</Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchWrapper}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Store"
            placeholderTextColor="#b0b8c4"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Banner FlatList */}
        <View style={styles.wrapper}>
          <FlatList
            ref={flatListRef}
            data={banners}
            keyExtractor={item => item.id}
            renderItem={renderBanner}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            decelerationRate="fast"
            snapToInterval={BANNER_WIDTH}
            snapToAlignment="center"
          />

          {/* Dots */}
          <View style={styles.dotContainer} pointerEvents="none">
            {banners.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  activeIndex === i ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Exclusive Offer */}
        <View style={styles.textRow}>
          <Text style={styles.sectionTitle}>Exclusive Offer</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        <FlatList
          data={banners}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No categories found</Text>
            </View>
          }
          renderItem={({ item }) => (
            <ProductCard onPress={() => handleProductPress(item)} />
          )}
        />

        {/*Best Selling */}
        <View style={styles.textRow}>
          <Text style={styles.sectionTitle}>Best Selling</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        <FlatList
          data={banners}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No categories found</Text>
            </View>
          }
          renderItem={({ item }) => (
            <ProductCard onPress={() => handleProductPress(item)} />
          )}
        />

        {/*Groceries */}
        <View style={styles.textRow}>
          <Text style={styles.sectionTitle}>Groceries</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        <FlatList
          data={banners}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No categories found</Text>
            </View>
          }
          renderItem={({ item }) => (
            <ProductCard onPress={() => handleProductPress(item)} />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  logoEmoji: {
    fontSize: 40,
    lineHeight: 48,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationIcon: {
    fontSize: 14,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1a2533',
    paddingVertical: 0,
  },
  clearBtn: {
    fontSize: 14,
    color: '#9aa8b8',
    paddingLeft: 8,
  },
  wrapper: {
    marginHorizontal: 16,
    marginVertical: 12,
    height: BANNER_HEIGHT,
    position: 'relative',
  },
  bannerCard: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerImage: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    position: 'absolute',
  },
  dotContainer: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    zIndex: 10,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 20,
    backgroundColor: '#2e7d6e',
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#a0c4b8',
  },
  emptyBox: { alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 16, color: '#9aa8b8' },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a2533',
  },
  seeAll: {
    fontSize: 14,
    color: '#2e7d6e',
    fontWeight: '500',
  },
});

export default ShopScreen;