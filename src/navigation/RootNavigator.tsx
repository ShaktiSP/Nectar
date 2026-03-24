import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../screens/redux/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import SplashScreen from '../screens/auth/SplashScreen';
import { setLoggedIn, setOnboardingCompleted } from '../screens/redux/appSlice';

export default function RootNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { isLoggedIn, isOnboardingCompleted } = useAppSelector(state => state.app);

  useEffect(() => {
    const initApp = async () => {
      const login = await AsyncStorage.getItem('isLoggedIn');
      const onboarding = await AsyncStorage.getItem('onboardingDone');

      if (login === 'true') dispatch(setLoggedIn(true));
      if (onboarding === 'true') dispatch(setOnboardingCompleted(true));

      setIsLoading(false);
    };

    initApp();
  }, []);

  if (isLoading) return <SplashScreen />;

  if (!isOnboardingCompleted) return <AuthNavigator initialRoute="OnBoardingScreen" />;
  if (!isLoggedIn) return <AuthNavigator initialRoute="NumberScreen" />;

  return <AppNavigator />;
}