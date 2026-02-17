import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
} from 'react-native';

interface Props {
  navigation?: any;
}

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation?.replace('NumberScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assest/onboardingBG.png')}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Bottom Section */}
        <View style={styles.bottomWrapper}>
          <View style={styles.logo}>
            <Image
              source={require('../assest/carrot.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.titleText}>Welcome</Text>
          <Text style={styles.titleText}>to our store</Text>
          {/* Text ABOVE button */}
          <Text style={styles.bottomText}>
            Get your groceries in as fast as one hour
          </Text>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={handleGetStarted}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Center text section */
  titleText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 16,
    color: '#FFFFFF',
    justifyContent: 'center',
    elevation: 8,
    lineHeight: 30,
  },

  /* Bottom section */
  bottomWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },

  bottom: {
    marginBottom: 80,
    paddingHorizontal: 24,
  },
  bottomText: {
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.9,
    lineHeight: 22,
  },
  button: {
    height: 56,
    backgroundColor: '#53B175',
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
