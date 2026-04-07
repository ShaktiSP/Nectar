import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';

// Custom hooks & utilities
import { useAppDispatch } from '../../hooks/hooks';
import { setLoggedIn } from '../redux/appSlice';
import { fp, hp, wp } from '../../appUtils/Dimensions';
import useLogin from '../../hooks/Uselogin';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* ======================================================
   Reusable UI Components
====================================================== */

// App logo (emoji based)
const CarrotLogo = () => (
  <Text style={{ fontSize: fp(6.5), lineHeight: hp(7.5) }}>🥕</Text>
);

// Password visibility icons
const EyeOffIcon = () => (
  <Text style={{ fontSize: fp(2), color: '#bbb' }}>🙈</Text>
);

const EyeOnIcon = () => (
  <Text style={{ fontSize: fp(2), color: '#5cb85c' }}>👁️</Text>
);


/* ======================================================
   Helper Functions
====================================================== */

// Show Android toast message
const showToast = (message) => {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
};

// Basic email validation
const isValidEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

/* ======================================================
   Main Component
====================================================== */

export default function LoginScreen({ navigation }) {
  const dispatch = useAppDispatch();

  // Local UI states
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Custom login hook
  const {
    username: email,
    password,
    setUsername: setEmail,
    setPassword,
    login,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useLogin();

  /* ======================================================
     Side Effects
  ====================================================== */

  // Handle successful login
  useEffect(() => {
    const handleLoginSuccess = async () => {
      if (isSuccess) {
        const value = await AsyncStorage.getItem('accessToken');
        console.log('Access Token:', value);
        showToast('Login Successful');
        AsyncStorage.setItem('isLoggedIn', 'true');
        dispatch(setLoggedIn(true));
       // navigation.navigate('BottomTabs');
      }
    };
  
    handleLoginSuccess();
  }, [isSuccess]);

  // Handle login error
  useEffect(() => {
    if (isError && error) {
      showToast(error);
    }
  }, [isError]);

  /* ======================================================
     Validation + Submit
  ====================================================== */

  const handleLogin = () => {
    // Email validation
 //   if (!email) return showToast('Email is required');
 //   if (!isValidEmail(email)) return showToast('Enter a valid email');

    // Password validation
    if (!password) return showToast('Password is required');
    if (password.length < 6)
      return showToast('Password must be at least 6 characters');

    // Call login API
    login();
  };

  /* ======================================================
     Render UI
  ====================================================== */

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#edf2ed" />

      {/* Background decorative blobs */}
      <View style={[styles.blob, styles.blobTL]} />
      <View style={[styles.blob, styles.blobTR]} />
      <View style={[styles.blob, styles.blobBL]} />
      <View style={[styles.blob, styles.blobBR]} />

      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* Logo */}
          <View style={styles.logoContainer}>
            <CarrotLogo />
          </View>

          {/* Title */}
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>
            Enter your email and password
          </Text>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View
              style={[
                styles.inputWrap,
                emailFocused && styles.inputWrapFocused,
                isError && styles.inputWrapError,
              ]}
            >
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter your email"
                placeholderTextColor="#ccc"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                editable={!isLoading}
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View
              style={[
                styles.inputWrap,
                passwordFocused && styles.inputWrapFocused,
                isError && styles.inputWrapError,
              ]}
            >
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                placeholder="Enter your password"
                placeholderTextColor="#ccc"
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                editable={!isLoading}
              />

              {/* Toggle password visibility */}
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={styles.eyeBtn}
              >
                {passwordVisible ? <EyeOnIcon /> : <EyeOffIcon />}
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginBtn, isLoading && styles.loginBtnDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator color="#fff" size="small" />
                <Text style={[styles.loginBtnText, { marginLeft: wp(2) }]}>
                  Logging in...
                </Text>
              </View>
            ) : (
              <Text style={styles.loginBtnText}>Log In</Text>
            )}
          </TouchableOpacity>

          {/* Signup Navigation */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreen')}
            >
              <Text style={styles.signupLink}>Signup</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ======================================================
   Styles (unchanged for UI consistency)
====================================================== */

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#edf2ed' },
  kav: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: wp(7.5),
    paddingTop: hp(7.5),
    paddingBottom: hp(5),
  },

  blob: { position: 'absolute', borderRadius: 999 },
  blobTL: {
    top: hp(-8.75),
    left: wp(-17.5),
    width: wp(55),
    height: wp(55),
    backgroundColor: 'rgba(150, 215, 175, 0.55)',
  },
  blobTR: {
    top: hp(1.25),
    right: wp(-13.75),
    width: wp(47.5),
    height: wp(47.5),
    backgroundColor: 'rgba(180, 200, 245, 0.45)',
  },
  blobBL: {
    bottom: hp(8.75),
    left: wp(-11.25),
    width: wp(42.5),
    height: wp(42.5),
    backgroundColor: 'rgba(245, 190, 165, 0.4)',
  },
  blobBR: {
    bottom: hp(-4.375),
    right: wp(-8.75),
    width: wp(37.5),
    height: wp(37.5),
    backgroundColor: 'rgba(195, 240, 205, 0.38)',
  },

  logoContainer: { alignItems: 'center', marginBottom: hp(4) },

  title: {
    fontSize: fp(3.25),
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: hp(0.5),
  },
  subtitle: {
    fontSize: fp(1.5),
    color: '#aaa',
    fontWeight: '500',
    marginBottom: hp(2.5),
  },

  inputGroup: { marginBottom: hp(2.75) },
  label: {
    fontSize: fp(1.4),
    color: '#888',
    fontWeight: '600',
    marginBottom: hp(1),
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#dde5dd',
  },
  inputWrapFocused: { borderBottomColor: '#5cb85c' },
  inputWrapError: { borderBottomColor: '#DC2626' },
  input: {
    paddingVertical: hp(1.25),
    fontSize: fp(1.8),
    color: '#1a1a1a',
    fontWeight: '600',
  },
  eyeBtn: {
    paddingLeft: wp(2.5),
    paddingVertical: hp(0.5),
  },

  forgotContainer: {
    alignItems: 'flex-end',
    marginTop: hp(0.75),
    marginBottom: hp(3.75),
  },
  forgotText: {
    fontSize: fp(1.5),
    color: '#777',
    fontWeight: '600',
  },

  loginBtn: {
    backgroundColor: '#5cb85c',
    borderRadius: 50,
    paddingVertical: hp(2),
    alignItems: 'center',
    marginBottom: hp(3),
    elevation: 8,
  },
  loginBtnDisabled: { opacity: 0.75 },
  loginBtnText: {
    color: '#fff',
    fontSize: fp(1.875),
    fontWeight: '700',
  },
  loadingRow: { flexDirection: 'row', alignItems: 'center' },

  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: fp(1.5),
    color: '#bbb',
  },
  signupLink: {
    fontSize: fp(1.5),
    color: '#5cb85c',
    fontWeight: '700',
  },
});
