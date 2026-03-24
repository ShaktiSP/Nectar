import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface CartItemProps {
  id: string;
  name: string;
  unit: string;
  price: number;
  image: string;
  onRemove?: (id: string) => void;
}

const CartItem = ({ id, name, unit, price, image, onRemove }: CartItemProps) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <View style={styles.card}>
      {/* Product Image */}
      <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />

      {/* Info + Controls */}
      <View style={styles.body}>
        {/* Top row: name + close */}
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <TouchableOpacity onPress={() => onRemove?.(id)} hitSlop={8}>
            <Text style={styles.closeBtn}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Unit label */}
        <Text style={styles.unit}>{unit}, Price</Text>

        {/* Bottom row: stepper + price */}
        <View style={styles.bottomRow}>
          {/* Stepper */}
          <View style={styles.stepper}>
            <TouchableOpacity style={styles.stepBtn} onPress={decrement}>
              <Text style={styles.stepIcon}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{quantity}</Text>
            <TouchableOpacity style={[styles.stepBtn, styles.stepBtnAdd]} onPress={increment}>
              <Text style={[styles.stepIcon, styles.stepIconAdd]}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Price */}
          <Text style={styles.price}>${(price * quantity).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

// ── Demo wrapper ──────────────────────────────────────────────────────────────
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <CartItem
        id="1"
        name="Bell Pepper Red"
        unit="1kg"
        price={4.99}
        image="https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=80"
        onRemove={(id) => console.log('remove', id)}
      />
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    justifyContent: 'center',
    padding: 16,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },

  body: {
    flex: 1,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },

  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a2533',
    flex: 1,
    marginRight: 8,
  },

  closeBtn: {
    fontSize: 13,
    color: '#9aa8b8',
    fontWeight: '600',
  },

  unit: {
    fontSize: 12,
    color: '#9aa8b8',
    marginBottom: 10,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    overflow: 'hidden',
  },

  stepBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f9fc',
  },

  stepBtnAdd: {
    backgroundColor: '#f0faf5',
  },

  stepIcon: {
    fontSize: 18,
    color: '#1a2533',
    lineHeight: 22,
    fontWeight: '500',
  },

  stepIconAdd: {
    color: '#28a745',
    fontWeight: '700',
  },

  qty: {
    width: 32,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: '#1a2533',
  },

  price: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1a2533',
  },
});