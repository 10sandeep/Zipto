import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const heroScale = useRef(new Animated.Value(0.9)).current;
  const buttonScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hero image animation
    Animated.spring(heroScale, {
      toValue: 1,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Content fade in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Button entrance
    setTimeout(() => {
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }, 400);
  }, []);

  const handleGetOTP = () => {
    if (phoneNumber.length !== 10) {
      setError('Invalid mobile number');
      return;
    }
    setError('');
    navigation.navigate('OTPVerification', { mobile: phoneNumber });
  };

  const handleSocialLogin = (provider: string) => {
    console.log('Login with:', provider);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.contentWrapper}>
          {/* Hero Section */}
          <Animated.View
            style={[
              styles.heroContainer,
              {
                transform: [{ scale: heroScale }],
              },
            ]}
          >
            <View style={styles.heroCard}>
              <Image 
                source={require('../assets/spash4-Photoroom.png')} 
                style={styles.heroImage}
                resizeMode="contain"
              />
              <Text style={styles.heroText}>Fast & Reliable</Text>
            </View>
          </Animated.View>

          {/* Content Section */}
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.formSection}>
              <Text style={styles.title}>Let's get moving</Text>
              <Text style={styles.subtitle}>
                Enter your mobile number to login or signup for the best logistics
                service.
              </Text>

              {/* Phone Input Section */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Code</Text>
                <Text style={[styles.label, styles.numberLabel]}>
                  Mobile Number
                </Text>
              </View>

              <View style={styles.inputRow}>
                <View style={styles.codeInput}>
                  <Text style={styles.codeText}>{countryCode}</Text>
                </View>
                <View
                  style={[
                    styles.phoneInputContainer,
                    error ? styles.inputError : null,
                  ]}
                >
                  <Text style={styles.phoneIcon}>📱</Text>
                  <TextInput
                    style={styles.phoneInput}
                    placeholder="98765 43210"
                    placeholderTextColor="#6B7280"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={text => {
                      setPhoneNumber(text);
                      setError('');
                    }}
                    maxLength={10}
                  />
                </View>
              </View>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              {/* Get OTP Button */}
              <Animated.View
                style={{
                  transform: [{ scale: buttonScale }],
                }}
              >
                <TouchableOpacity
                  style={styles.otpButton}
                  onPress={handleGetOTP}
                  activeOpacity={0.8}
                >
                  <Text style={styles.otpButtonText}>Get OTP</Text>
                  <Text style={styles.arrow}>→</Text>
                </TouchableOpacity>
              </Animated.View>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>Or continue with</Text>
                <View style={styles.divider} />
              </View>

              {/* Social Login Buttons */}
              <View style={styles.socialContainer}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Google')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Apple')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.socialButtonText}>Apple</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms and Privacy - Now at bottom */}
            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text style={styles.link}>Terms of Service</Text> and{' '}
              <Text style={styles.link}>Privacy Policy</Text>.
            </Text>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  keyboardView: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingVertical: 20,
  },
  heroContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  heroCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: 140,
    marginBottom: 12,
  },
  heroText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  formSection: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    color: '#CBD5E1',
    fontWeight: '600',
    flex: 2,
  },
  numberLabel: {
    flex: 2.5,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 4,
  },
  codeInput: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  codeText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  phoneInputContainer: {
    flex: 2.5,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  phoneIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
    paddingVertical: 16,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 4,
  },
  otpButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  otpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  arrow: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#334155',
  },
  dividerText: {
    fontSize: 13,
    color: '#64748B',
    marginHorizontal: 12,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  socialButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  termsText: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
  },
  link: {
    color: '#3B82F6',
  },
});

export default Login;