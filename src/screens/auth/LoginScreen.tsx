import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAppDispatch } from '../redux/hooks';
import { setLoggedIn } from '../redux/appSlice';
import { fp, hp, wp } from '../../appUtils/Dimensions';


const CarrotLogo = () => (
  <Text style={{ fontSize: fp(6.5), lineHeight: hp(7.5) }}>🥕</Text>
);

const EyeOffIcon = () => (
  <Text style={{ fontSize: fp(2), color: '#bbb' }}>🙈</Text>
);

const EyeOnIcon = () => (
  <Text style={{ fontSize: fp(2), color: '#5cb85c' }}>👁️</Text>
);

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#edf2ed" />

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
          <View style={styles.logoContainer}>
            <CarrotLogo />
          </View>

          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Enter your email and password</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={[styles.inputWrap, emailFocused && styles.inputWrapFocused]}>
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
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={[styles.inputWrap, passwordFocused && styles.inputWrapFocused]}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                placeholder="Enter your password"
                placeholderTextColor="#ccc"
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={styles.eyeBtn}
                activeOpacity={0.7}
              >
                {passwordVisible ? <EyeOnIcon /> : <EyeOffIcon />}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotContainer} activeOpacity={0.7}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginBtn}
            activeOpacity={0.85}
            onPress={() => {
              AsyncStorage.setItem('isLoggedIn', 'true');
              dispatch(setLoggedIn(true));
              navigation.navigate('BottomTabs');
            }}
          >
            <Text style={styles.loginBtnText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={styles.signupLink}>Signup</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#edf2ed',
  },
  kav: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: wp(7.5),  
    paddingTop: hp(7.5),          
    paddingBottom: hp(5),        
  },

  // Blobs
  blob: {
    position: 'absolute',
    borderRadius: 999,
  },
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

  // Logo
  logoContainer: {
    alignItems: 'center',
    marginBottom: hp(4),          
  },

  // Title
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
    marginBottom: hp(4),
  },

  // Input
  inputGroup: {
    marginBottom: hp(2.75),       
  },
  label: {
    fontSize: fp(1.4),            
    color: '#888',
    fontWeight: '600',
    marginBottom: hp(1),
    letterSpacing: 0.3,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#dde5dd',
  },
  inputWrapFocused: {
    borderBottomColor: '#5cb85c',
  },
  input: {
    paddingVertical: hp(1.25),    
    fontSize: fp(1.8),           
    color: '#1a1a1a',
    fontWeight: '600',
  },
  eyeBtn: {
    paddingLeft: wp(2.5),
    paddingVertical: hp(0.5),
    justifyContent: 'center',
  },

  // Forgot
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

  // Login Button
  loginBtn: {
    backgroundColor: '#5cb85c',
    borderRadius: 50,
    paddingVertical: hp(2),       
    alignItems: 'center',
    marginBottom: hp(3),
    shadowColor: '#5cb85c',
    shadowOffset: { width: 0, height: hp(1) },
    shadowOpacity: 0.38,
    shadowRadius: 16,
    elevation: 8,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: fp(1.875),          
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  // Signup
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: fp(1.5),
    color: '#bbb',
    fontWeight: '500',
  },
  signupLink: {
    fontSize: fp(1.5),
    color: '#5cb85c',
    fontWeight: '700',
  },
});