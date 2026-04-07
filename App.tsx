import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/screens/redux/store';
import { ActivityIndicator } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <RootNavigator />
        <Toast />
      </PersistGate>
    </Provider>
  );
}