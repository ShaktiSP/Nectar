import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import CountryPicker, {Country,CountryCode,} from 'react-native-country-picker-modal';


export default function MobileNumberInput({route, navigation}: any) {
  const [mobileNumber, setMobileNumber] = useState('');

  const [countryCode, setCountryCode] = useState<CountryCode>(
    route.params?.countryCode || 'IN'
  );
  
  const [callingCode, setCallingCode] = useState(
    route.params?.callingCode || '91'
  );

  const [pickerVisible, setPickerVisible] = useState(false);

  const handleContinue = () => {
    if (mobileNumber.trim()) {
      // const fullNumber = `+${callingCode}${mobileNumber}`;
      navigation?.replace('CodeInputScreen');
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const onSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setPickerVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Enter your mobile number</Text>

        {/* Phone Input Section */}
        <View style={styles.inputContainer}>
          
          {/* Country Picker Section */}
          <TouchableOpacity
            style={styles.countryCodeSection}
            onPress={() => setPickerVisible(true)}
            activeOpacity={0.7}
          >
            <CountryPicker
              countryCode={countryCode}
              withFlag
              withCallingCode
              withFilter
              visible={pickerVisible}
              onSelect={onSelectCountry}
              onClose={() => setPickerVisible(false)}
            />
            <Text style={styles.countryCodeText}>+{callingCode}</Text>
          </TouchableOpacity>

          {/* Mobile Number Input */}
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            maxLength={15}
          />
        </View>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          { opacity: mobileNumber.trim() ? 1 : 0.5 },
        ]}
        onPress={handleContinue}
        disabled={!mobileNumber.trim()}
      >
        <Icon name="chevron-forward" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingLeft: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 12,
  },
  countryCodeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginLeft: 6,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    padding: 0,
  },
  continueButton: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
});
