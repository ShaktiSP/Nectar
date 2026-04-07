import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import useCategories from '../../hooks/useCategories';
import FindProduceScreen from '../itemScreen/findProductScreen';
import { TouchableOpacity } from 'react-native';


const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 48) / 2; // 2 columns + 3 gaps of 16px

const ExploreScreen = () => {
  const [search, setSearch] = useState('');
  const { categories, isLoading, isError, error } = useCategories();

  const filteredData = categories.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePress = (item: any) => {
    console.log('Category:', item.slug);
    // fetch(item.url)
  };

  if (isLoading) return <Text style={styles.center}>Loading...</Text>;
  if (isError) return <Text style={styles.center}>{error}</Text>;

  return (
    <SafeAreaView style={styles.safe}>
  <Text style={styles.header}>Categories</Text>

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

  {/* FlatList */}
  {isLoading ? (
    <Text style={styles.center}>Loading...</Text>
  ) : isError ? (
    <Text style={styles.center}>{error}</Text>
  ) : (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.slug}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 16 }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No categories found 🥲</Text>
        </View>
      }
      renderItem={({ item }) => (
        <FindProduceScreen
          item={{
            title: item.name,
            image: item.url || 'https://www.google.com/imgres?q=placeholder%20grociry%20product%20image&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-vector%2Fshopping-cart-vector-technology-icon-silver-gray-background_53876-112145.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fshopping-cart-placeholder&docid=nZ35lDZIUqEB4M&tbnid=YDi9_gW9iSFQWM&vet=12ahUKEwjopOmc5NuTAxU2aHADHdZ3I9YQnPAOegQIKhAB..i&w=626&h=626&hcb=2&ved=2ahUKEwjopOmc5NuTAxU2aHADHdZ3I9YQnPAOegQIKhAB',
           
          }}
          onPress={() => handlePress(item)}
        />
      )}
    />
  )}
</SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f9fc' },
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
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    elevation: 3,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1 },
  clearBtn: { fontSize: 14, color: '#9aa8b8' },
  center: { textAlign: 'center', marginTop: 50, fontSize: 16 },
  emptyBox: { alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 16, color: '#9aa8b8' },
});