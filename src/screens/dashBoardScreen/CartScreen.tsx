import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  FlatList, SafeAreaView, StatusBar, Alert,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { removeItem, updateQty } from '../redux/cartSlice';
import CartItem, { CartItemWithQty } from '../itemScreen/Cartitem';

export const INITIAL_CART_ITEMS: CartItemWithQty[] = [
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

export default function CartScreen() {
  const dispatch = useAppDispatch();

  // ✅ items ab Redux store se aa rahe hain
  const items = useAppSelector((state) => state.cart.items);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={(id) => dispatch(removeItem(id))}
            onQtyChange={(id, qty) => dispatch(updateQty({ id, qty }))}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty 🛒</Text>
          </View>
        }
      />

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

// styles same rehenge...
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f9fc' },
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
  emptyContainer: {
    marginTop: 80,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#9aa8b8',
    fontWeight: '500',
  },
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