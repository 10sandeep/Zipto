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
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
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
                source={require('../assets/images/hero1.jpg')}
                style={styles.heroImage}
                resizeMode="cover"
              />
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
                <Text style={styles.title}>Let's get moving</Text>
                <Text style={styles.subtitle}>
                  Enter your mobile number to login or signup for the best
                  logistics service.
                </Text>

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
                      error && styles.inputError,
                    ]}
                  >
                    <Text style={styles.phoneIcon}>📱</Text>
                    <TextInput
                      style={styles.phoneInput}
                      placeholder="98765 43210"
                      placeholderTextColor="#6B7280"
                      keyboardType="phone-pad"
                      maxLength={10}
                      value={phoneNumber}
                      onChangeText={text => {
                        setPhoneNumber(text);
                        setError('');
                      }}
                    />
                  </View>
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                  <TouchableOpacity
                    style={styles.otpButton}
                    onPress={handleGetOTP}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.otpButtonText}>Get OTP</Text>
                    <Text style={styles.arrow}>→</Text>
                  </TouchableOpacity>
                </Animated.View>

                {!keyboardOpen && (
                  <>
                    <View style={styles.dividerContainer}>
                      <View style={styles.divider} />
                      <Text style={styles.dividerText}>Or continue with</Text>
                      <View style={styles.divider} />
                    </View>

                    <View style={styles.socialContainer}>
                      <TouchableOpacity
                        style={styles.socialButton}
                        onPress={() => handleSocialLogin('Google')}
                      >
                        <Text style={styles.socialButtonText}>Google</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.socialButton}
                        onPress={() => handleSocialLogin('Apple')}
                      >
                        <Text style={styles.socialButtonText}>Apple</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>

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
    height: '110%',
    position: 'absolute',
    // top:'0%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
  },

  heroText: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
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
    marginBottom: 40,
  },

  /* Inputs */
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#475569',
    flex: 2,
    fontWeight: '600',
  },
  numberLabel: {
    flex: 2.5,
  },

  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },

  codeInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  codeText: {
    color: '#0F172A',
    fontSize: 16,
  },

  phoneInputContainer: {
    flex: 2.5,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  phoneIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    color: '#0F172A',
    paddingVertical: 16,
  },

  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 6,
  },

  /* Primary button */
  otpButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  otpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    marginRight: 8,
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 18,
  },

  /* Divider */
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#64748B',
    fontSize: 13,
  },

  /* Social login */
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  socialButtonText: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },

  /* Footer */
  termsText: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  link: {
    color: '#2563EB',
  },
});

export default Login;
