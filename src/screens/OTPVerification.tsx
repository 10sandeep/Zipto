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
  Keyboard,
  ScrollView,
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
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const heroScale = useRef(new Animated.Value(0.9)).current;
  const heroHeight = useRef(new Animated.Value(180)).current;
  const buttonScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
      // Reduce hero height when keyboard opens
      Animated.timing(heroHeight, {
        toValue: 120,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
      // Restore hero height when keyboard closes
      Animated.timing(heroHeight, {
        toValue: 180,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    Animated.spring(heroScale, {
      toValue: 1,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start();

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

    setTimeout(() => {
      dispatch(
        loginSuccess({
          user: { id: '1', name: 'User', mobile },
          token: 'dummy-token',
        }),
      );
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* HERO SECTION */}
          <Animated.View
            style={[
              styles.heroContainer,
              { transform: [{ scale: heroScale }] },
            ]}
          >
            <Animated.View style={[styles.heroCard, { height: heroHeight }]}>
              <Image
                source={require('../assets/images/hero2.jpg')}
                style={styles.heroImage}
                resizeMode="cover"
              />
              {/* <View style={styles.heroOverlay}>
                <Text style={styles.heroText}>Fast & Reliable</Text>
              </View> */}
            </Animated.View>
          </Animated.View>

          <View style={styles.contentWrapper}>
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
                      error && styles.inputError,
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
                <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                  <TouchableOpacity
                    style={styles.verifyButton}
                    onPress={handleVerify}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.verifyButtonText}>
                      Verify & Continue
                    </Text>
                    <Text style={styles.arrow}>→</Text>
                  </TouchableOpacity>
                </Animated.View>

                {/* Back - Only show when keyboard is closed */}
                {!keyboardOpen && (
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                  >
                    <Text style={styles.backText}>← Back to Login</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Terms - Only show when keyboard is closed */}
              {!keyboardOpen && (
                <Text style={styles.termsText}>
                  By continuing, you agree to our{' '}
                  <Text style={styles.link}>Terms of Service</Text> and{' '}
                  <Text style={styles.link}>Privacy Policy</Text>.
                </Text>
              )}
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },

  /* Hero */
  heroContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  heroCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '113%',
    position: 'absolute',
  },
  heroOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
  },

  heroText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  /* Content */
  content: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  formSection: {
    flex: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#475569',
    lineHeight: 22,
    marginBottom: 40,
  },

  /* OTP input */
  otpContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#475569',
    fontWeight: '600',
    marginBottom: 8,
  },
  otpInputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  otpIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  otpInput: {
    flex: 1,
    fontSize: 24,
    color: '#0F172A',
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
    fontFamily: 'Poppins-Regular',
    marginTop: 8,
    marginLeft: 4,
  },

  /* Resend */
  resendButton: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  resendText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
  },
  resendLink: {
    color: '#2563EB',
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },

  /* Verify */
  verifyButton: {
    backgroundColor: '#2563EB',
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
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    marginRight: 8,
  },
  arrow: {
    fontSize: 18,
    color: '#FFFFFF',
  },

  /* Back */
  backButton: {
    alignSelf: 'center',
    paddingVertical: 12,
  },
  backText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    fontWeight: '500',
  },

  /* Footer */
  termsText: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  link: {
    color: '#2563EB',
  },
});

export default OTPVerification;
