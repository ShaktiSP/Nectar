import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

// --- Icons (inline SVG-style using Text — replace with react-native-vector-icons if available) ---
const HeartIcon = ({ filled }: { filled: boolean }) => (
  <Text style={{ fontSize: 22, color: filled ? '#e74c3c' : '#bbb' }}>
    {filled ? '♥' : '♡'}
  </Text>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
  <Text style={{ fontSize: 16, color: filled ? '#f39c12' : '#ddd' }}>★</Text>
);

// --- Types ---
interface NutritionItem {
  label: string;
  value: string;
}

// --- Data ---
const NUTRITION: NutritionItem[] = [
  { label: 'Calories', value: '52 kcal' },
  { label: 'Carbs', value: '13.8g' },
  { label: 'Fiber', value: '2.4g' },
  { label: 'Protein', value: '0.3g' },
  { label: 'Fat', value: '0.2g' },
  { label: 'Sugar', value: '10.4g' },
];

// --- Sub-components ---

const TopBar = ({
  onBack,
  onShare,
}: {
  onBack: () => void;
  onShare: () => void;
}) => (
  <View style={styles.topBar}>
    <TouchableOpacity onPress={onBack} style={styles.iconButton}>
      <Text style={styles.backArrow}>‹</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onShare} style={styles.iconButton}>
      <Text style={styles.shareIcon}>⬆</Text>
    </TouchableOpacity>
  </View>
);

const ImageCarousel = ({ imageUri }: { imageUri: string }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const TOTAL = 3;

  return (
    <View style={styles.carouselContainer}>
      <View style={styles.imageBorder}>
        <Image source={{ uri: imageUri }} style={styles.productImage} resizeMode="cover" />
      </View>
      {/* Dots */}
      <View style={styles.dotsRow}>
        {Array.from({ length: TOTAL }).map((_, i) => (
          <TouchableOpacity key={i} onPress={() => setActiveIndex(i)}>
            <View
              style={[
                styles.dot,
                i === activeIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const QuantitySelector = ({
  quantity,
  onDecrease,
  onIncrease,
  price,
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  price: number;
}) => (
  <View style={styles.quantityRow}>
    <TouchableOpacity onPress={onDecrease} style={styles.qtyButton}>
      <Text style={styles.qtyButtonText}>−</Text>
    </TouchableOpacity>
    <View style={styles.qtyValueBox}>
      <Text style={styles.qtyValue}>{quantity}</Text>
    </View>
    <TouchableOpacity onPress={onIncrease} style={styles.qtyButton}>
      <Text style={styles.qtyButtonText}>+</Text>
    </TouchableOpacity>
    <Text style={styles.price}>${(price * quantity).toFixed(2)}</Text>
  </View>
);

const Divider = () => <View style={styles.divider} />;

const AccordionSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);
  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => setOpen(prev => !prev)}
        activeOpacity={0.7}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.chevron}>{open ? '∧' : '∨'}</Text>
      </TouchableOpacity>
      {open && <View style={styles.accordionBody}>{children}</View>}
    </View>
  );
};

const NutritionRow = ({
  onPress,
  per,
}: {
  onPress: () => void;
  per: string;
}) => (
  <TouchableOpacity style={styles.nutritionRow} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.sectionTitle}>Nutritions</Text>
    <View style={styles.nutritionRight}>
      <View style={styles.perBadge}>
        <Text style={styles.perText}>{per}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </View>
  </TouchableOpacity>
);

const ReviewRow = ({
  rating,
  onPress,
}: {
  rating: number;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.reviewRow} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.sectionTitle}>Review</Text>
    <View style={styles.reviewRight}>
      <View style={styles.starsRow}>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} filled={i < Math.round(rating)} />
        ))}
      </View>
      <Text style={styles.chevron}>›</Text>
    </View>
  </TouchableOpacity>
);

// --- Main Screen ---

const ProductDetailScreen: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [nutritionExpanded, setNutritionExpanded] = useState(false);

  const PRICE_PER_UNIT = 4.99;
  const RATING = 4;

  const handleAddToBasket = () => {
    // Replace with your cart logic / navigation
    alert(`Added ${quantity} × Natural Red Apple to basket!`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Navigation */}
        <TopBar onBack={() => {}} onShare={() => {}} />

        {/* Image Carousel */}
        <ImageCarousel imageUri="https://images.unsplash.com/photo-1569870499705-504209102861?w=600" />

        {/* Product Info Card */}
        <View style={styles.card}>
          {/* Title Row */}
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.productName}>Natural Red Apple</Text>
              <Text style={styles.productMeta}>1kg, Price</Text>
            </View>
            <TouchableOpacity
              onPress={() => setWishlist(prev => !prev)}
              style={styles.heartButton}
            >
              <HeartIcon filled={wishlist} />
            </TouchableOpacity>
          </View>

          <Divider />

          {/* Quantity & Price */}
          <QuantitySelector
            quantity={quantity}
            onDecrease={() => setQuantity(prev => Math.max(1, prev - 1))}
            onIncrease={() => setQuantity(prev => prev + 1)}
            price={PRICE_PER_UNIT}
          />

          <Divider />

          {/* Product Detail Accordion */}
          <AccordionSection title="Product Detail">
            <Text style={styles.descriptionText}>
              Apples are nutritious. Apples may be good for weight loss. Apples may be
              good for your heart. As part of a healthful and varied diet, they provide
              essential vitamins and natural sugars for an active lifestyle.
            </Text>
          </AccordionSection>

          <Divider />

          {/* Nutrition */}
          <NutritionRow per="100gr" onPress={() => setNutritionExpanded(p => !p)} />
          {nutritionExpanded && (
            <View style={styles.nutritionGrid}>
              {NUTRITION.map(item => (
                <View key={item.label} style={styles.nutritionCell}>
                  <Text style={styles.nutritionValue}>{item.value}</Text>
                  <Text style={styles.nutritionLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
          )}

          <Divider />

          {/* Review */}
          <ReviewRow rating={RATING} onPress={() => {}} />
        </View>
      </ScrollView>

      {/* Sticky Add to Basket CTA */}
      <View style={styles.ctaContainer}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={handleAddToBasket}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// --- Styles ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f3f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 14 : 8,
    paddingBottom: 8,
    backgroundColor: '#f2f3f5',
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  backArrow: {
    fontSize: 26,
    color: '#222',
    lineHeight: 28,
  },
  shareIcon: {
    fontSize: 16,
    color: '#222',
  },

  // Carousel
  carouselContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#f2f3f5',
  },
  imageBorder: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 16,
    overflow: 'hidden',
    width: width * 0.78,
    height: width * 0.55,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  dotsRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: '#4CAF50',
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#ccc',
  },

  // Card
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 16,
    marginTop: 4,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  // Title
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  productName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: -0.3,
  },
  productMeta: {
    fontSize: 13,
    color: '#999',
    marginTop: 3,
  },
  heartButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 14,
  },

  // Quantity
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qtyButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  qtyButtonText: {
    fontSize: 20,
    color: '#333',
    lineHeight: 22,
  },
  qtyValueBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  price: {
    marginLeft: 'auto' as any,
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: -0.5,
  },

  // Accordion
  accordionContainer: {
    marginBottom: 2,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionBody: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  chevron: {
    fontSize: 18,
    color: '#888',
  },
  descriptionText: {
    fontSize: 13,
    color: '#777',
    lineHeight: 20,
  },

  // Nutrition
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nutritionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  perBadge: {
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  perText: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  nutritionCell: {
    width: (width - 44 - 20) / 3,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222',
  },
  nutritionLabel: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },

  // Review
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },

  // CTA
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 22,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    paddingTop: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  ctaButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default ProductDetailScreen;

function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
