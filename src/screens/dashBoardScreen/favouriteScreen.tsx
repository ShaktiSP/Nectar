import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

// ─── Types ────────────────────────────────────────────────────────────────────

type Product = {
  id: string;
  name: string;
  volume: string;
  price: number;
  imageUri: string;
};

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const FAVOURITES: Product[] = [
  {
    id: '1',
    name: 'Sprite Can',
    volume: '325ml',
    price: 1.5,
    imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Sprite_Can.png/800px-Sprite_Can.png',
  },
  {
    id: '2',
    name: 'Diet Coke',
    volume: '355ml',
    price: 1.99,
    imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Diet_Coke_can.png/800px-Diet_Coke_can.png',
  },
  {
    id: '3',
    name: 'Apple & Grape Juice',
    volume: '2L',
    price: 15.5,
    imageUri: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Juice_box.jpg',
  },
  {
    id: '4',
    name: 'Coca Cola Can',
    volume: '325ml',
    price: 4.99,
    imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Coca-Cola_bottle_cap_with_original_logo.svg/800px-Coca-Cola_bottle_cap_with_original_logo.svg.png',
  },
  {
    id: '4',
    name: 'Coca Cola Can',
    volume: '325ml',
    price: 4.99,
    imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Coca-Cola_bottle_cap_with_original_logo.svg/800px-Coca-Cola_bottle_cap_with_original_logo.svg.png',
  },
  {
    id: '4',
    name: 'Coca Cola Can',
    volume: '325ml',
    price: 4.99,
    imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Coca-Cola_bottle_cap_with_original_logo.svg/800px-Coca-Cola_bottle_cap_with_original_logo.svg.png',
  },
  {
    id: '4',
    name: 'Coca Cola Can',
    volume: '325ml',
    price: 4.99,
    imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Coca-Cola_bottle_cap_with_original_logo.svg/800px-Coca-Cola_bottle_cap_with_original_logo.svg.png',
  },
  {
    id: '4',
    name: 'Coca Cola Can',
    volume: '325ml',
    price: 4.99,
    imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Coca-Cola_bottle_cap_with_original_logo.svg/800px-Coca-Cola_bottle_cap_with_original_logo.svg.png',
  },
  {
    id: '4',
    name: 'Coca Cola Can',
    volume: '325ml',
    price: 4.99,
    imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Coca-Cola_bottle_cap_with_original_logo.svg/800px-Coca-Cola_bottle_cap_with_original_logo.svg.png',
  },
  {
    id: '1',
    name: 'Sprite Can',
    volume: '325ml',
    price: 1.5,
    imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Sprite_Can.png/800px-Sprite_Can.png',
  },
];

// ─── Product Row ──────────────────────────────────────────────────────────────

const ProductRow = ({
  item,
  onPress,
}: {
  item: Product;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.imageWrapper}>
      <Image source={{ uri: item.imageUri }} style={styles.image} resizeMode="contain" />
    </View>

    <View style={styles.info}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.meta}>{item.volume}, Price</Text>
    </View>

    <View style={styles.priceRow}>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <Text style={styles.chevron}>›</Text>
    </View>
  </TouchableOpacity>
);

// ─── Favourite Screen ─────────────────────────────────────────────────────────

const FavouriteScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourite</Text>
      </View>

      <View style={styles.divider} />

      {/* List */}
      <FlatList
        data={FAVOURITES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductRow
            item={item}
            onPress={() => console.log('Pressed:', item.name)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom row */}
      <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
       //     onPress={handleGetStarted}
          >
            <Text style={styles.buttonText}>Add All To Cart</Text>
          </TouchableOpacity>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  // Header
  header: {
    paddingTop: 16,
    paddingBottom: 14,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: 0.2,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#d6d6d6',
  },

  // List
  listContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },

  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  imageWrapper: {
    width: 64,
    height: 64,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 64,
    height: 64,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  meta: {
    fontSize: 13,
    color: '#888888',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  chevron: {
    fontSize: 24,
    color: '#aaaaaa',
    lineHeight: 26,
  },

  button: {
    height: 56,
    backgroundColor: '#53B175',
    marginHorizontal: 24,
    bottom: 20,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  // Separator
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 20,
  },
});

export default FavouriteScreen;