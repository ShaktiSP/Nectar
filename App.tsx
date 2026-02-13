import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import OnBoardingScreen from './src/screens/OnBoardingScreen';
import NectarLoginScreen from './src/screens/NumberScreen';

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

        <Stack.Screen name="NumberScreen"
         component={NectarLoginScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}