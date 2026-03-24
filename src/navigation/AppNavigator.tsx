import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import BottomTabBar from '../screens/BottomTabBar';
import { store } from '../screens/redux/store';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
            name="BottomTabs"
            component={BottomTabBar}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
   
}   