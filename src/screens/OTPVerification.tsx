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
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess } from '../store';

const OTPVerification = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { mobile } = route.params || { mobile: '' };
  const [otp, setOtp] = useState('');
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

  const handleVerify = () => {
    if (otp.length !== 4) {
      setError('Please enter 4-digit OTP');
      return;
    }
    setError('');
    dispatch(loginStart());

    // Simulate API Call
    setTimeout(() => {
      dispatch(
        loginSuccess({
          user: { id: '1', name: 'User', mobile },
          token: 'dummy-token',
        }),
      );
      // RootNavigator will automatically switch to AppNavigator
    }, 1000);
  };

  const handleResendOTP = () => {
    console.log('Resend OTP');
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
                source={require('../assets/spash2-Photoroom.png')}
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
              <Text style={styles.title}>Verify OTP</Text>
              <Text style={styles.subtitle}>
                We've sent a 4-digit code to {'\n'}+91 {mobile}
              </Text>

              {/* OTP Input */}
              <View style={styles.otpContainer}>
                <Text style={styles.label}>Enter OTP</Text>
                <View
                  style={[
                    styles.otpInputContainer,
                    error ? styles.inputError : null,
                  ]}
                >
                  <Text style={styles.otpIcon}>🔒</Text>
                  <TextInput
                    style={styles.otpInput}
                    placeholder="0000"
                    placeholderTextColor="#6B7280"
                    keyboardType="number-pad"
                    maxLength={4}
                    value={otp}
                    onChangeText={text => {
                      setOtp(text);
                      setError('');
                    }}
                  />
                </View>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
              </View>

              {/* Resend OTP */}
              <TouchableOpacity
                onPress={handleResendOTP}
                style={styles.resendButton}
                activeOpacity={0.7}
              >
                <Text style={styles.resendText}>
                  Didn't receive code?{' '}
                  <Text style={styles.resendLink}>Resend OTP</Text>
                </Text>
              </TouchableOpacity>

              {/* Verify Button */}
              <Animated.View
                style={{
                  transform: [{ scale: buttonScale }],
                }}
              >
                <TouchableOpacity
                  style={styles.verifyButton}
                  onPress={handleVerify}
                  activeOpacity={0.8}
                >
                  <Text style={styles.verifyButtonText}>Verify & Continue</Text>
                  <Text style={styles.arrow}>→</Text>
                </TouchableOpacity>
              </Animated.View>

              {/* Back to Login */}
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
                activeOpacity={0.7}
              >
                <Text style={styles.backText}>← Back to Login</Text>
              </TouchableOpacity>
            </View>

            {/* Terms and Privacy */}
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
    height: 120,
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
    lineHeight: 22,
    marginBottom: 40,
  },
  otpContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: '#CBD5E1',
    fontWeight: '600',
    marginBottom: 8,
  },
  otpInputContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  otpIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  otpInput: {
    flex: 1,
    fontSize: 24,
    color: '#FFFFFF',
    paddingVertical: 16,
    letterSpacing: 12,
    textAlign: 'center',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 8,
    marginLeft: 4,
  },
  resendButton: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  resendText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  resendLink: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  verifyButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  arrow: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  backButton: {
    alignSelf: 'center',
    paddingVertical: 12,
  },
  backText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
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

export default OTPVerification;
