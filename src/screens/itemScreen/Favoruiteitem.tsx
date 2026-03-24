import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type ProductListItemProps = {
  name: string;
  volume: string;
  price: number;
  imageUri: string;
  onPress?: () => void;
};

const FavoruiteItem = ({
  name,
  volume,
  price,
  imageUri,
  onPress,
}: ProductListItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {/* Product Image */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
      </View>

      {/* Product Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.meta}>
          {volume}, <Text style={styles.priceLabel}>Price</Text>
        </Text>
      </View>

      {/* Price + Chevron */}
      <View style={styles.priceRow}>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <Text style={styles.chevron}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  imageWrapper: {
    width: 60,
    height: 60,
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 3,
  },
  meta: {
    fontSize: 13,
    color: '#888888',
  },
  priceLabel: {
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
    fontSize: 22,
    color: '#aaaaaa',
    lineHeight: 24,
  },
});

export default ProductListItem;


// ─── Usage Example ───────────────────────────────────────────────────────────
//
// import ProductListItem from './ProductListItem';
//
// <ProductListItem
//   name="Sprite Can"
//   volume="325ml"
//   price={1.50}
//   imageUri="https://your-cdn.com/sprite-can.png"
//   onPress={() => console.log('Sprite tapped')}
// />