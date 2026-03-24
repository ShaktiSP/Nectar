import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  
  Dimensions,
} from 'react-native';
import FindProduceScreen from '../itemScreen/findProductScreen';
import { SafeAreaView } from 'react-native-safe-area-context';


// ─── Types ─────────────────────────────────────────────────────────────────────
interface Category {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  bgColor: string;
  borderColor: string;
  shadowColor: string;
}

const CATEGORIES: Category[] = [
  {
    id: '1',
    title: 'Fresh Fruits',
    subtitle: '& Vegetable',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&q=80',
    bgColor: '#dff0e8',
    borderColor: '#6dcfa0',
    shadowColor: '#3aaf74',
  },
  {
    id: '2',
    title: 'Cooking Oil',
    subtitle: '& Ghee',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
    bgColor: '#fef6e4',
    borderColor: '#f5d89e',
    shadowColor: '#e8a020',
  },
  {
    id: '3',
    title: 'Meat & Fish',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&q=80',
    bgColor: '#fdecea',
    borderColor: '#f5b8b0',
    shadowColor: '#e05544',
  },
  {
    id: '4',
    title: 'Bakery & Snacks',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    bgColor: '#f3eef8',
    borderColor: '#d0b8f0',
    shadowColor: '#9b60e0',
  },
  {
    id: '5',
    title: 'Dairy & Eggs',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    bgColor: '#fef9e4',
    borderColor: '#f0e09e',
    shadowColor: '#d4a017',
  },
  {
    id: '6',
    title: 'Beverages',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80',
    bgColor: '#e4f0fe',
    borderColor: '#9ec8f5',
    shadowColor: '#2082e0',
  },
];

// ─── ExploreScreen ─────────────────────────────────────────────────────────────
const ExploreScreen = () => {
  const [search, setSearch] = useState<string>('');


  const handlePress = (item: Category) => {
    // Wire up navigation here e.g.:
    // navigation.navigate('CategoryDetail', { categoryId: item.id })
    console.log('Navigating to:', item.title);
  };

  return (
    <SafeAreaView style={styles.safe}>

      {/* Header */}
      <Text style={styles.header}>Find Products</Text>

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

      {/* Grid — renders FindProductCard for each category */}
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>No categories found 🥲</Text>
          </View>
        }
        renderItem={({ item }) => (
          <FindProduceScreen item={item}
           onPress={handlePress} />
        )}
      />

    </SafeAreaView>
  );
};

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },

  header: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a2533',
    textAlign: 'center',
    paddingVertical: 16,
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
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#1a2533', paddingVertical: 0 },
  clearBtn: { fontSize: 14, color: '#9aa8b8', paddingLeft: 8 },

  grid: { paddingHorizontal: 16, paddingBottom: 20 },
  row: { justifyContent: 'space-between', marginBottom: 16 },

  // Card mirrors FindProductScreen, scaled for grid
  card: {
    borderRadius: 24,
    borderWidth: 2,
    paddingTop: 18,
    paddingBottom: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '100%', height: '100%' },
  divider: {
    width: '80%',
    height: 1,
    marginVertical: 12,
    opacity: 0.7,
  },
  textContainer: { alignItems: 'center' },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a2e24',
    lineHeight: 20,
    letterSpacing: 0.2,
    textAlign: 'center',
  },

  emptyBox: { alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 16, color: '#9aa8b8' },
});

export default ExploreScreen;