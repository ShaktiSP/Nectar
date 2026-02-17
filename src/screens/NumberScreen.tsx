import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Animated,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';

const NectarLoginScreen = ({ navigation }: any) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  const [phone, setPhone] = useState('');

  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [callingCode, setCallingCode] = useState('91');
  const [pickerVisible, setPickerVisible] = useState(false);

  const openCountryPicker = () => {
    setPickerVisible(true);
  };

  const onSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setPickerVisible(false);
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>
          {/* Hero Image Section */}

          <Image source={require('../assest/maskGroup.png')} />

          {/* Content Section */}
          <Animated.View
            style={[
              styles.contentSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Get your groceries</Text>
              <Text style={styles.subtitle}>with nectar</Text>
            </View>

            {/* Phone Input with Country Code */}
            <View style={styles.phoneInputContainer}>
              <TouchableOpacity
                style={styles.countryCodeBox}
                onPress={openCountryPicker}
                activeOpacity={0.7}
              >
                <CountryPicker
                  countryCode={countryCode}
                  withFilter
                  withFlagButton={true}
                  withCallingCode
                  withEmoji
                  visible={pickerVisible}
                  onSelect={onSelectCountry}
                  onClose={() => setPickerVisible(false)}
                />
                <Text style={styles.callingCodeText}>+{callingCode}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('MobileNumberInput', {
                    countryCode: countryCode,
                    callingCode: callingCode,
                  })
                }
              >
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Enter phone number"
                  placeholderTextColor="#CCCCCC"
                  editable={false}
                  pointerEvents="none"
                />
              </TouchableOpacity>
            </View>

            {/* Social Auth Divider */}
            <Text style={styles.dividerText}>Or connect with social media</Text>

            {/* Google Sign In Button */}
            <TouchableOpacity
              style={styles.socialButton}
              activeOpacity={0.85}
              onPress={() => console.log('Google Sign In')}
            >
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Facebook Sign In Button */}
            <TouchableOpacity
              style={[styles.socialButton, styles.facebookButton]}
              activeOpacity={0.85}
              onPress={() => console.log('Facebook Sign In')}
            >
              <Text style={styles.facebookIcon}>f</Text>
              <Text style={styles.socialButtonText}>
                Continue with Facebook
              </Text>
            </TouchableOpacity>

            {/* Terms and Privacy */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                By continuing you agree to our{' '}
                <Text style={styles.link}>Terms of Service</Text> and{' '}
                <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageSection: {
    width: '100%',
    height: '25%',
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  productsGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productItem: {
    width: '30%',
    height: 60,
    borderRadius: 8,
    marginBottom: 12,
  },
  item1: {
    backgroundColor: '#F4D35E',
  },
  item2: {
    backgroundColor: '#FF6B6B',
  },
  item3: {
    backgroundColor: '#4ECDC4',
  },
  item4: {
    backgroundColor: '#A8E6CF',
  },
  item5: {
    backgroundColor: '#FFB6B9',
  },
  item6: {
    backgroundColor: '#95E1D3',
  },
  cuttingBoard: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 120,
    height: 80,
    backgroundColor: '#D4A574',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  boardText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  contentSection: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#54C67F',
    letterSpacing: -0.5,
  },

  // Phone Input Container and Components
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginBottom: 24,
    marginTop: 20,
    height: 54,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  countryCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: '#DDDDDD',
    height: '100%',
    minWidth: 70,
  },

  callingCodeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 6,
  },

  phoneInput: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },

  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
    marginTop: 20,
  },
  countryFlag: {
    fontSize: 20,
    marginRight: 12,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },

  countryChevron: {
    width: 6,
    height: 6,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#999',
    transform: [{ rotate: '45deg' }],
  },
  dividerText: {
    textAlign: 'center',
    color: '#999999',
    fontSize: 13,
    marginBottom: 20,
    fontWeight: '500',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F63EC',
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 12,
    shadowColor: '#4F63EC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  facebookButton: {
    backgroundColor: '#3B5998',
    shadowColor: '#3B5998',
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 8,
  },
  facebookIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  footer: {
    marginTop: 32,
    paddingHorizontal: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '400',
  },
  link: {
    color: '#54C67F',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default NectarLoginScreen;