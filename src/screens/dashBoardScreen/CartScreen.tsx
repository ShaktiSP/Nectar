import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';

// ── Types ─────────────────────────────────────────────────────────────────────
interface CartItemData {
  id: string;
  name: string;
  unit: string;
  price: number;
  image: string;
}

// ── CartItem Component ────────────────────────────────────────────────────────
const CartItem = ({
  item,
  onRemove,
  onQtyChange,
}: {
  item: CartItemData & { quantity: number };
  onRemove: (id: string) => void;
  onQtyChange: (id: string, qty: number) => void;
}) => {
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

// ── Initial Data ──────────────────────────────────────────────────────────────
const INITIAL_ITEMS: (CartItemData & { quantity: number })[] = [
  {
    id: '1',
    name: 'Bell Pepper Red',
    unit: '1kg',
    price: 4.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=80',
  },
  {
    id: '2',
    name: 'Egg Chicken Red',
    unit: '4pcs',
    price: 1.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&q=80',
  },
  {
    id: '3',
    name: 'Organic Bananas',
    unit: '12kg',
    price: 3.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80',
  },
  {
    id: '4',
    name: 'Ginger',
    unit: '250gm',
    price: 2.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80',
  },
];

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function CartScreen() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      {/* Cart Items List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <CartItem item={item} onRemove={removeItem} onQtyChange={updateQty} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty 🛒</Text>
          </View>
        }
      />

      {/* Checkout Button */}
      {items.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => Alert.alert('Checkout', 'Proceeding to checkout!')}
            activeOpacity={0.85}
          >
            <Text style={styles.checkoutText}>Go to Checkout</Text>
            <View style={styles.checkoutBadge}>
              <Text style={styles.checkoutBadgeText}>${total.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a2533',
  },

  listContent: {
    padding: 16,
    paddingBottom: 24,
  },

  separator: {
    height: 1,
    backgroundColor: '#e8edf3',
    marginVertical: 4,
  },

  // ── CartItem styles ──────────────────────────────────────────
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

  // ── Empty state ──────────────────────────────────────────────
  emptyContainer: {
    marginTop: 80,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 16,
    color: '#9aa8b8',
    fontWeight: '500',
  },

  // ── Footer ───────────────────────────────────────────────────
  footer: {
    padding: 16,
    backgroundColor: '#f7f9fc',
  },

  checkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4caf6e',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    shadowColor: '#4caf6e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },

  checkoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },

  checkoutBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  checkoutBadgeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
  },
});