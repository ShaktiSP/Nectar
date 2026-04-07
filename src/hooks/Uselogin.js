import {useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../api/Authapi';
import { isConnected } from '../appUtils/Networkutils';
import { parseApiError } from '../appUtils/Errorutils';

// ── Initial state structure for login
const INITIAL_STATE = {
  status: 'idle',    // possible values: 'idle' | 'loading' | 'success' | 'error'
  data: null,        // stores API response on success
  error: null,       // stores error message if something fails
};

const useLogin = () => {
  // State to manage API status, response, and errors
  const [state, setState] = useState(INITIAL_STATE);

  // Controlled input states for login form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // ── Client-side validation before API call
  const validate = () => {
    if (!username.trim()) return 'Username is required.';
    if (!password.trim()) return 'Password is required.';
    if (password.length < 4) return 'Password must be at least 4 characters.';
    return null; // No validation error
  };

  // ── Login function (memoized using useCallback)
  const login = useCallback(async () => {
    // 1. Validate user input before making API call
    const validationError = validate();
    if (validationError) {
      setState({status: 'error', data: null, error: validationError});
      return;
    }

    // 2. Check internet connectivity
    const online = await isConnected();
    if (!online) {
      setState({
        status: 'error',
        data: null,
        error: 'No internet connection. Please check your network.',
      });
      return;
    }

    // 3. Set loading state before API call
    setState({status: 'loading', data: null, error: null});

    try {
      // 4. Call login API with trimmed username and password
      const data = await loginUser(username.trim(), password);

      // 5. Store tokens in AsyncStorage for future authenticated requests
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);

      // 6. Update state to success with received data
      setState({status: 'success', data, error: null});

      // 7. Navigation can be handled here (e.g., go to Home screen)
      // navigation.replace('Home');

    } catch (err) {
      // 8. Convert API error into readable message
      const message = parseApiError(err);

      // 9. Update state with error
      setState({status: 'error', data: null, error: message});
    }
  }, [username, password]);

  // ── Reset function to clear state and inputs (e.g., on logout)
  const reset = useCallback(() => {
    setState(INITIAL_STATE);
    setUsername('');
    setPassword('');
  }, []);

  // ── Derived boolean flags for easier UI handling
  const isLoading = state.status === 'loading';
  const isSuccess = state.status === 'success';
  const isError   = state.status === 'error';
  const isIdle    = state.status === 'idle';

  // ── Expose values and functions for component usage
  return {
    // Input bindings
    username,
    password,
    setUsername,
    setPassword,

    // Actions
    login,
    reset,

    // Raw state
    status: state.status,
    data: state.data,
    error: state.error,

    // Derived booleans
    isLoading,
    isSuccess,
    isError,
    isIdle,
  };
};

export default useLogin;