import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationSelector from '../screens/auth/LocationSelect';
import LoginScreen from '../screens/auth/LoginScreen';
import MobileNumberInput from '../screens/auth/MobileScreen';
import NectarLoginScreen from '../screens/auth/NumberScreen';
import OnBoardingScreen from '../screens/auth/OnBoardingScreen';
import CodeInputScreen from '../screens/auth/OtpScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import SplashScreen from '../screens/auth/SplashScreen';

const Stack = createNativeStackNavigator();


export default function AuthNavigator({ initialRoute }: { initialRoute: string }) {
  return (
  
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnBoardingScreen"
          component={OnBoardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NumberScreen"
          component={NectarLoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MobileNumberInput"
          component={MobileNumberInput}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CodeInputScreen"
          component={CodeInputScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LocationSelector"
          component={LocationSelector}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
}