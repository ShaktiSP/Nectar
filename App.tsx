import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import OnBoardingScreen from './src/screens/OnBoardingScreen';
import NectarLoginScreen from './src/screens/NumberScreen';
import MobileNumberInput from './src/screens/MobileScreen';
import CodeInputScreen from './src/screens/OtpScreen';
import LocationSelector from './src/screens/LocationSelect';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OnBoardingScreen"
          component={OnBoardingScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="NumberScreen"
          component={NectarLoginScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="MobileNumberInput"
          component={MobileNumberInput}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CodeInputScreen"
          component={CodeInputScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="LocationSelector"
          component={LocationSelector}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}