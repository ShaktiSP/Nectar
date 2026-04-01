import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';

type ProductCardProps = {
  name?: string;
  unit?: string;
  price?: string;
  image?: any;
  onAddToCart?: () => void;
};

const ProductCard = ({
  name = 'Organic Bananas',
  unit = '7pcs, Priceg',
  price = '$4.99',
  image = require('../../assets/onboardingBG.png'),
  onAddToCart,
}: ProductCardProps) => {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    onAddToCart?.();
    setTimeout(() => setAdded(false), 800);
  };

  return (
    <View style={styles.card}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
      </View>

      {/* Product Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>

      {/* Price + Add Button */}
      <View style={styles.bottomRow}>
        <Text style={styles.price}>{price}</Text>
        <Pressable
          style={[styles.addButton, added && styles.addButtonPressed]}
          onPress={handleAdd}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
  },

  // Image
  imageContainer: {
    width: '100%',
    height: 110,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  image: {
    width: '85%',
    height: '85%',
  },

  // Info
  infoContainer: {
    marginBottom: 10,
    gap: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a2533',
    lineHeight: 19,
  },
  unit: {
    fontSize: 12,
    color: '#9aa8b8',
    fontWeight: '400',
  },

  // Bottom Row
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a2533',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2e7d6e',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2e7d6e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonPressed: {
    backgroundColor: '#245f54',
    transform: [{ scale: 0.93 }],
  },
  addButtonText: {
    fontSize: 22,
    color: '#ffffff',
    lineHeight: 26,
    fontWeight: '400',
  },
});

export default ProductCard;