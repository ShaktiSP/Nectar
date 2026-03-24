import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
} from 'react-native';
import { useAppDispatch } from '../redux/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setOnboardingCompleted } from '../redux/appSlice';

const OnboardingScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const handleGetStarted = () => {
    AsyncStorage.setItem('onboardingDone', 'true');
    dispatch(setOnboardingCompleted(true));
    navigation?.replace('NumberScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/onboardingBG.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.bottomWrapper}>

          <View style={styles.logoContainer}>
            <Image
               source={require('../../assets/carrot.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.titleText}>Welcome</Text>
          <Text style={styles.titleText}>to our store</Text>

          <Text style={styles.bottomText}>
            Get your groceries in as fast as one hour
          </Text>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={handleGetStarted}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoImage: {
    width: 80,
    height: 80,
  },

  titleText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 16,
    color: '#FFFFFF',
    elevation: 8,
    lineHeight: 30,
  },

  bottomWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  bottomText: {
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.9,
    lineHeight: 22,
  },
  button: {
    height: 56,
    backgroundColor: '#53B175',
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});