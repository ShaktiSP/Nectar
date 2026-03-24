import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

interface CodeInputScreenProps {
  onCodeSubmit?: (code: string) => void;
  onBackPress?: () => void;
}

const CodeInputScreen: React.FC<CodeInputScreenProps> = ({ 
  onCodeSubmit,
  navigation, 
}:any) => {
  const [code, setCode] = useState<string>('');
  const inputRef = useRef<TextInput>(null);

  const handleCodeChange = (text: string): void => {
    const numericText = text.replace(/[^0-9]/g, '').slice(0, 4);
    setCode(numericText);
  };

  const handleSubmit = (): void => {
    if (code.length === 4) {
      navigation.replace('LocationSelector', { code });
      if (onCodeSubmit) {
        onCodeSubmit(code);
      }
      console.log('Code submitted:', code);
    }
  };

  const handleResendCode = (): void => {
    setCode('');
    inputRef.current?.focus();
    console.log('Code resent');
  };

  const handleBack = (): void => {
    navigation.goBack();
  };

  const isCodeComplete = code.length === 4;

  // Create code display string
  const codeDisplay = Array(4)
    .fill('-')
    .map((dash, i) => code[i] || dash)
    .join(' ');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#edf2ed" />

      <LinearGradient
        colors={['#ffffff', '#f8f5ff', '#ffe8f5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        {/* Background Blobs */}
        <View style={[styles.blob, styles.blobTL]} />
        <View style={[styles.blob, styles.blobTR]} />
        <View style={[styles.blob, styles.blobBL]} />
        <View style={[styles.blob, styles.blobBR]} />
        
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Header with Back Button */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Icon name="chevron-back" size={28} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            {/* Title */}
            <Text style={styles.title}>Enter your 4-digit code</Text>

            {/* Code Label */}
            <Text style={styles.codeLabel}>Code</Text>

            {/* Code Display Input - Tappable Area */}
            <TouchableOpacity
              style={styles.inputWrapper}
              onPress={() => {
                inputRef.current?.focus();
              }}
              activeOpacity={0.7}
            >
              {/* Visible TextInput for input */}
              <TextInput
                ref={inputRef}
                style={styles.visibleInput}
                keyboardType="number-pad"
                maxLength={4}
                value={code}
                onChangeText={handleCodeChange}
                textContentType="oneTimeCode"
                placeholder="- - - -"
                placeholderTextColor="#ccc"
              />

              {/* Code Display - Just Text with Dashes */}
              <Text style={styles.codeDisplay}>{codeDisplay}</Text>
            </TouchableOpacity>
          </View>

          {/* Footer - Resend Code and Submit Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleResendCode}
              style={styles.resendButton}
            >
              <Text style={styles.resendText}>Resend Code</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.submitButton,
                !isCodeComplete && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={!isCodeComplete}
              activeOpacity={0.8}
            >
              <Icon
                name="chevron-forward"
                size={28}
                color={isCodeComplete ? '#fff' : '#bbb'}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  gradientContainer: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 36,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  codeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888',
    marginBottom: 16,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    marginBottom: 32,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 0,
    height: 0,
  },
  visibleInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: 60,
  },
  codeDisplay: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2a2a2a',
    letterSpacing: 10,
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  spacer: {
    flex: 1,
  },
  resendButton: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  resendText: {
    fontSize: 15,
    color: '#4CAF50',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
  },
  submitButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#e8e8e8',
    shadowOpacity: 0.08,
  },
});

export default CodeInputScreen;