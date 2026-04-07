import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
// 2 columns + 3 gaps (left, middle, right) of 16px each
const CARD_SIZE = (width - 48) / 2;  // same formula as ExploreScreen

interface Category {
  title: string;
  subtitle?: string;
  image: string;
}

const FindProduceScreen = ({
  item,
  onPress,
}: {
  item: Category;
  onPress: (item: Category) => void;
}) => (
  <TouchableOpacity
    style={[
      styles.card,
      {
        backgroundColor: '#f0f4ff',
        borderColor: '#c7d2fe',
        shadowColor: '#6366f1', 
      },
    ]}
    onPress={() => onPress(item)}
    activeOpacity={0.9}
  >
    {/* Image Area */}
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>

    {/* Divider */}
    <View style={[styles.divider]} />

    {/* Text Area */}
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.title}</Text>
      {item.subtitle && (
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: CARD_SIZE,
    borderRadius: 20,
    borderWidth: 2,
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  imageContainer: {
    width: '100%',
    height: CARD_SIZE * 0.55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  divider: {
    width: '80%',
    height: 1,
    marginVertical: 10,
    opacity: 0.7,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1a2e24',
    lineHeight: 18,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4a6e5a',
    textAlign: 'center',
    marginTop: 2,
  },
});

export default FindProduceScreen;