import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const LocationSelector = ({navigation}:any) => {
  const [selectedZone, setSelectedZone] = useState('Banarree');
  const [selectedArea, setSelectedArea] = useState('');
  const [zoneDropdownOpen, setZoneDropdownOpen] = useState(false);
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);

  const zones = [
    'Banarree',
    'Downtown',
    'Midtown',
    'Uptown',
    'Suburban',
    'North Zone',
    'South Zone',
    'East Zone',
    'West Zone',
    'Central Zone',
    'Industrial Zone',
    'Market Area',
    'Old City',
  ];

  const areas = [
    'Residential',
    'Commercial',
    'Industrial',
    'Mixed Use',
    'Corporate Area',
    'Shopping Zone',
    'School Area',
    'Hospital Area',
    'IT Park',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with back button */}
        <View style={styles.header}>
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
        </View>

        {/* Illustration Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assest/illustration.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        {/* Title and Subtitle */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Select Your Location</Text>
          <Text style={styles.subtitle}>
            Switch on your location to stay in tune with{'\n'}what's happening
            in your area
          </Text>
        </View>

        {/* Zone Dropdown */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Your Zone</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setZoneDropdownOpen(!zoneDropdownOpen)}
          >
            <Text style={styles.dropdownText}>{selectedZone}</Text>
            <Icon
              name={zoneDropdownOpen ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#999"
            />
          </TouchableOpacity>

          {zoneDropdownOpen && (
            <View style={styles.dropdownMenu}>
              {zones.map(zone => (
                <TouchableOpacity
                  key={zone}
                  style={[
                    styles.dropdownItem,
                    selectedZone === zone && styles.dropdownItemActive,
                  ]}
                  onPress={() => {
                    setSelectedZone(zone);
                    setZoneDropdownOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedZone === zone && styles.dropdownItemTextActive,
                    ]}
                  >
                    {zone}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Area Dropdown */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Your Area</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setAreaDropdownOpen(!areaDropdownOpen)}
          >
            <Text
              style={[
                styles.dropdownText,
                !selectedArea && styles.placeholderText,
              ]}
            >
              {selectedArea || 'Types of your area'}
            </Text>
            <Icon
              name={areaDropdownOpen ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#999"
            />
          </TouchableOpacity>

          {areaDropdownOpen && (
            <View style={styles.dropdownMenu}>
              {areas.map(area => (
                <TouchableOpacity
                  key={area}
                  style={[
                    styles.dropdownItem,
                    selectedArea === area && styles.dropdownItemActive,
                  ]}
                  onPress={() => {
                    setSelectedArea(area);
                    setAreaDropdownOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedArea === area && styles.dropdownItemTextActive,
                    ]}
                  >
                    {area}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
          onPress={
            navigation?.replace('LoginScreen')
          }
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f7fc',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  
  image: {
    width: width * 0.6,
    height: height * 0.25,
  },
  
  pinContainer: {
    position: 'absolute',
    top: -40,
    zIndex: 10,
  },
  pinCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6B5BEA',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6B5BEA',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  titleSection: {
    marginBottom: 28,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    lineHeight: 19,
  },
  formSection: {
    marginBottom: 22,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownText: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  placeholderText: {
    color: '#bbb',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginHorizontal: -4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 100,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemActive: {
    backgroundColor: '#f5f3ff',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#666',
  },
  dropdownItemTextActive: {
    color: '#6B5BEA',
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 32,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#2DBE6B',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2DBE6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});

export default LocationSelector;