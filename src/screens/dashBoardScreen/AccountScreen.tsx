import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '../../hooks/hooks';
import { setLoggedIn } from '../redux/appSlice';

type MenuItem = {
  id: string;
  label: string;
  icon: string;
};

const MENU_ITEMS: MenuItem[] = [
  { id: 'orders',          label: 'Orders',           icon: '🧾' },
  { id: 'my_details',      label: 'My Details',       icon: '🪪' },
  { id: 'delivery',        label: 'Delivery Address', icon: '📍' },
  { id: 'payment',         label: 'Payment Methods',  icon: '💳' },
  { id: 'promo',           label: 'Promo Cord',       icon: '🏷️' },
  { id: 'notifications',   label: 'Notifications',    icon: '🔔' },
  { id: 'help',            label: 'Help',             icon: '❓' },
  { id: 'about',           label: 'About',            icon: 'ℹ️' },
];


const MenuRow = ({
  item,
  onPress,
}: {
  item: MenuItem;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.menuRow} onPress={onPress} activeOpacity={0.6}>
    <View style={styles.menuLeft}>
      <Text style={styles.menuIcon}>{item.icon}</Text>
      <Text style={styles.menuLabel}>{item.label}</Text>
    </View>
    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
);

const AccountScreen = ({ navigation }: any) => {

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    
    AsyncStorage.setItem('isLoggedIn', 'flase');
    dispatch(setLoggedIn(false));       
    navigation.navigate('NumberScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Profile Card ── */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              style={styles.avatar}
            />
          </View>

          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>Afsar Hossen</Text>
              <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
                <Text style={styles.editIcon}>✏️</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.email}>lmshuva97@gmail.com</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* ── Menu List ── */}
        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item, index) => (
            <View key={item.id}>
              <MenuRow
                item={item}
                onPress={() => console.log('Pressed:', item.label)}
              />
              {index < MENU_ITEMS.length - 1 && (
                <View style={styles.separator} />
              )}
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        {/* ── Log Out ── */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <View style={styles.iconWrapper}>
            <Text style={styles.icon}>↪</Text>
          </View>
          <Text style={styles.label}>Log Out</Text>
          <View style={styles.iconWrapper} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollContent: {
    paddingBottom: 32,
  },

  // Profile Card
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  avatarWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    marginRight: 14,
    borderWidth: 2,
    borderColor: '#e8e8e8',
  },
  avatar: {
    width: 64,
    height: 64,
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  editBtn: {
    padding: 2,
  },
  editIcon: {
    fontSize: 13,
  },
  email: {
    fontSize: 13,
    color: '#888888',
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#d8d8d8',
  },

  // Menu Section
  menuSection: {
    marginTop: 10,
    marginBottom: 10,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  menuIcon: {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  chevron: {
    fontSize: 22,
    color: '#bbbbbb',
    lineHeight: 24,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E2E2E2',
   
  },

  // Log Out
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 12,
    paddingVertical: 14,
    top: 40,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  iconWrapper: {
    width: 28,
    alignItems: 'center',
  },
  icon: {
    fontSize: 16,
    color: '#2ecc71',
  },
  label: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#2ecc71',
  },
});

export default AccountScreen;