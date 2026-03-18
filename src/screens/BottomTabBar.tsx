import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
} from 'react-native';
import Svg, { Path, Rect, Line, Circle, Polyline } from 'react-native-svg';

// ─── SVG Icon Components ───────────────────────────────────────────────────────

const ShopIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Rect
      x="3"
      y="3"
      width="7"
      height="7"
      rx="1"
      stroke={color}
      strokeWidth="1.8"
    />
    <Rect
      x="14"
      y="3"
      width="7"
      height="7"
      rx="1"
      stroke={color}
      strokeWidth="1.8"
    />
    <Rect
      x="3"
      y="14"
      width="7"
      height="7"
      rx="1"
      stroke={color}
      strokeWidth="1.8"
    />
    <Rect
      x="14"
      y="14"
      width="7"
      height="7"
      rx="1"
      stroke={color}
      strokeWidth="1.8"
    />
  </Svg>
);

const ExploreIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth="1.8" />
    <Line x1="4" y1="11" x2="18" y2="11" stroke={color} strokeWidth="1.8" />
    <Path
      d="M11 4 C13.5 7 13.5 15 11 18"
      stroke={color}
      strokeWidth="1.8"
      fill="none"
    />
    <Path
      d="M11 4 C8.5 7 8.5 15 11 18"
      stroke={color}
      strokeWidth="1.8"
      fill="none"
    />
    <Line
      x1="16.5"
      y1="16.5"
      x2="21"
      y2="21"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </Svg>
);

const CartIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <Line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="1.8" />
    <Path d="M16 10a4 4 0 01-8 0" stroke={color} strokeWidth="1.8" />
  </Svg>
);

const FavouriteIcon = ({
  color,
  filled,
}: {
  color: string;
  filled?: boolean;
}) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
      stroke={color}
      strokeWidth="1.8"
      fill={filled ? color : 'none'}
      strokeLinejoin="round"
    />
  </Svg>
);

const AccountIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="1.8" />
  </Svg>
);

// ─── Tab Config ────────────────────────────────────────────────────────────────

type TabKey = 'Shop' | 'Explore' | 'Cart' | 'Favourite' | 'Account';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'Shop', label: 'Shop' },
  { key: 'Explore', label: 'Explore' },
  { key: 'Cart', label: 'Cart' },
  { key: 'Favourite', label: 'Favourite' },
  { key: 'Account', label: 'Account' },
];

const ACTIVE_COLOR = '#2E7D32'; // green
const INACTIVE_COLOR = '#1A1A1A'; // near-black

function TabIcon({ tabKey, color }: { tabKey: TabKey; color: string }) {
  switch (tabKey) {
    case 'Shop':
      return <ShopIcon color={color} />;
    case 'Explore':
      return <ExploreIcon color={color} />;
    case 'Cart':
      return <CartIcon color={color} />;
    case 'Favourite':
      return <FavouriteIcon color={color} />;
    case 'Account':
      return <AccountIcon color={color} />;
  }
}

// ─── Bottom Tab Bar ────────────────────────────────────────────────────────────

export default function BottomTabBar() {
  const [activeTab, setActiveTab] = useState<TabKey>('Shop');

  return (
    <View style={styles.screenContainer}>
      {/* Tab Content Area */}
      <View style={styles.contentArea}>
        <Text style={styles.tabTitle}>{activeTab}</Text>
        <Text style={styles.tabSubtitle}>
          This is the {activeTab.toLowerCase()} screen content.
        </Text>
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.safeArea}>
        <View style={styles.container}>
          {TABS.map(tab => {
            const isActive = activeTab === tab.key;
            const color = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;

            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.tab}
                onPress={() => setActiveTab(tab.key)}
                activeOpacity={0.7}
              >
                <TabIcon tabKey={tab.key} color={color} />
                <Text style={[styles.label, { color }]}>{tab.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  tabTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 8,
  },
  tabSubtitle: {
    fontSize: 16,
    color: '#7C7C7C',
    textAlign: 'center',
  },
  safeArea: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // Add shadow/elevation to separate from content
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 20,
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
  },
  container: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
});
