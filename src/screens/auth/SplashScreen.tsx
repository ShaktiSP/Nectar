import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useAppDispatch } from '../../hooks/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoggedIn, setOnboardingCompleted } from '../redux/appSlice';

const SplashScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
  const checkAppState = async () => {
    const onboarding = await AsyncStorage.getItem('onboardingDone');
    const login = await AsyncStorage.getItem('isLoggedIn');

    if (onboarding === 'true') {
      dispatch(setOnboardingCompleted(true));

      if (login === 'true') {
        dispatch(setLoggedIn(true));
        navigation?.replace('BottomTabs');
      } else {
        navigation?.replace('NumberScreen');
      }
    } else {
      navigation?.replace('OnBoardingScreen');
    }
  };

  setTimeout(checkAppState, 2000); },[]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo Image */}
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#53B175',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
  },
});
