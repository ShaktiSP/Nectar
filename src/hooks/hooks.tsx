import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../screens/redux/store';

// ── Custom typed version of useDispatch
// Ensures that dispatch only accepts actions defined in AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// ── Custom typed version of useSelector
// Provides proper TypeScript types for accessing Redux state
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;