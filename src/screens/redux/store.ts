import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appReducer from './appSlice';
import cartReducer from './cartSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  app: appReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE',
          'persist/PURGE', 'persist/REGISTER', 'persist/FLUSH',
        ],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;