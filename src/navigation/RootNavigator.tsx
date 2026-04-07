import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import SplashScreen from '../screens/auth/SplashScreen';
import { setLoggedIn, setOnboardingCompleted } from '../screens/redux/appSlice';
import { NavigationContainer } from '@react-navigation/native';

export default function RootNavigator() {
  // Local loading state to show splash screen while initializing app
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  // Get authentication & onboarding state from Redux store
  const { isLoggedIn, isOnboardingCompleted } = useAppSelector(
    state => state.app
  );

  // ── Run once when app starts
  useEffect(() => {
    const initApp = async () => {
      // Get stored login and onboarding flags from AsyncStorage
      const login = await AsyncStorage.getItem('isLoggedIn');
      const onboarding = await AsyncStorage.getItem('onboardingDone');

      // Update Redux state based on stored values
      if (login === 'true') dispatch(setLoggedIn(true));
      if (onboarding === 'true') dispatch(setOnboardingCompleted(true));

      // Stop loading → app is ready
      setIsLoading(false);
    };

    initApp();
  }, []);

  // ── Show splash screen while initializing app
  if (isLoading) return <SplashScreen />;

  return (
    // Navigation container must wrap the entire navigation tree
    <NavigationContainer>
      
      {/* ── Flow 1: Show onboarding if not completed */}
      {!isOnboardingCompleted ? (
        <AuthNavigator initialRoute="OnBoardingScreen" />

      ) : 
      
      /* ── Flow 2: If onboarding done but user not logged in */
      !isLoggedIn ? (
        <AuthNavigator initialRoute="NumberScreen" />

      ) : 
      
      /* ── Flow 3: User is logged in → show main app */
      (
        <AppNavigator />
      )}
      
    </NavigationContainer>
  );
}