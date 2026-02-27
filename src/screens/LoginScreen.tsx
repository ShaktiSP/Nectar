import React, { useState } from 'react';
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
// ── Carrot Logo (no external package needed) ─────────────────────
const CarrotLogo = () => (
  <Text style={{ fontSize: 52, lineHeight: 60 }}>🥕</Text>
);

// ── Eye Icons ────────────────────────────────────────────────────
const EyeOffIcon = () => (
  <Text style={{ fontSize: 16, color: '#bbb' }}>🙈</Text>
);

const EyeOnIcon = () => (
  <Text style={{ fontSize: 16, color: '#5cb85c' }}>👁️</Text>
);

// ── Main Screen ──────────────────────────────────────────────────
export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#edf2ed" />

      {/* Background Blobs */}
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
          <Text style={styles.subtitle}>Enter your email and password</Text>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View
              style={[
                styles.inputWrap,
                emailFocused && styles.inputWrapFocused,
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

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotContainer} activeOpacity={0.7}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginBtn} activeOpacity={0.85}>
            <Text style={styles.loginBtnText}>Log In</Text>
          </TouchableOpacity>

          {/* Signup Row */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                console.log('Signup pressed', navigation); // check this in Metro logs
                navigation.navigate('SignUpScreen');
              }}
            >
              <Text style={styles.signupLink}>Signup</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ── Styles ───────────────────────────────────────────────────────
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
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
  },

  // Blobs
  blob: {
    position: 'absolute',
    borderRadius: 999,
  },
  blobTL: {
    top: -70,
    left: -70,
    width: 220,
    height: 220,
    backgroundColor: 'rgba(150, 215, 175, 0.55)',
  },
  blobTR: {
    top: 10,
    right: -55,
    width: 190,
    height: 190,
    backgroundColor: 'rgba(180, 200, 245, 0.45)',
  },
  blobBL: {
    bottom: 70,
    left: -45,
    width: 170,
    height: 170,
    backgroundColor: 'rgba(245, 190, 165, 0.4)',
  },
  blobBR: {
    bottom: -35,
    right: -35,
    width: 150,
    height: 150,
    backgroundColor: 'rgba(195, 240, 205, 0.38)',
  },

  // Logo
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },

  // Title
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12.5,
    color: '#aaa',
    fontWeight: '500',
    marginBottom: 32,
  },

  // Input
  inputGroup: {
    marginBottom: 22,
  },
  label: {
    fontSize: 11.5,
    color: '#888',
    fontWeight: '600',
    marginBottom: 8,
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
    paddingVertical: 10,
    fontSize: 14.5,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  eyeBtn: {
    paddingLeft: 10,
    paddingVertical: 4,
    justifyContent: 'center',
  },

  // Forgot
  forgotContainer: {
    alignItems: 'flex-end',
    marginTop: 6,
    marginBottom: 30,
  },
  forgotText: {
    fontSize: 12.5,
    color: '#777',
    fontWeight: '600',
  },

  // Login Button
  loginBtn: {
    backgroundColor: '#5cb85c',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#5cb85c',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.38,
    shadowRadius: 16,
    elevation: 8,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 15,
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
    fontSize: 12.5,
    color: '#bbb',
    fontWeight: '500',
  },
  signupLink: {
    fontSize: 12.5,
    color: '#5cb85c',
    fontWeight: '700',
  },
});