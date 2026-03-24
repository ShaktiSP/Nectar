import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/screens/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const login = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(login === 'true');
    };

    checkLoginStatus();
  }, []);

  // Avoid rendering navigators until the check is complete
  if (isLoggedIn === null) return null;
console.log("jdjjjd",isLoggedIn)
  return (
    <Provider store={store}>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </Provider>
  );
}