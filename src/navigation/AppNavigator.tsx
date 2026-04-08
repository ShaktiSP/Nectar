import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabBar from '../screens/BottomTabBar';
import ProductDetails from '../screens/dashBoardScreen/ProductDetails';
import CategoryListScreen from '../screens/exploreFlow/CategoryListScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabBar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CategoryListScreen"
        component={CategoryListScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}