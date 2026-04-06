import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export interface CartItemData {
  id: string;
  name: string;
  unit: string;
  price: number;
  image: string;
}
   
  export interface CartItemWithQty extends CartItemData {
    quantity: number;
  }

  
interface Props {
  item: CartItemWithQty;
  onRemove: (id: string) => void;
  onQtyChange: (id: string, qty: number) => void;
}

const CartItem = ({ item, onRemove, onQtyChange }: Props) => {
  const increment = () => onQtyChange(item.id, item.quantity + 1);
  const decrement = () => {
    if (item.quantity > 1) onQtyChange(item.id, item.quantity - 1);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />

      <View style={styles.body}>
        {/* Top row */}
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <TouchableOpacity onPress={() => onRemove(item.id)} hitSlop={8}>
            <Text style={styles.closeBtn}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Unit */}
        <Text style={styles.unit}>{item.unit}, Price</Text>

        {/* Bottom row */}
        <View style={styles.bottomRow}>
          <View style={styles.stepper}>
            <TouchableOpacity style={styles.stepBtn} onPress={decrement}>
              <Text style={styles.stepIcon}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{item.quantity}</Text>
            <TouchableOpacity style={[styles.stepBtn, styles.stepBtnAdd]} onPress={increment}>
              <Text style={[styles.stepIcon, styles.stepIconAdd]}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginVertical: 6,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: '#f7f9fc',
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