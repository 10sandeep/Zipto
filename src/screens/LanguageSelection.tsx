import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Easing,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../store';

const LanguageSelection = () => {
  const navigation = useNavigation<any>();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const heroScale = useRef(new Animated.Value(0.9)).current;
  const iconRotate = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(0)).current;
  const button1Scale = useRef(new Animated.Value(0)).current;
  const button2Scale = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  // Floating animations
  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hero image animation
    Animated.spring(heroScale, {
      toValue: 1,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Globe icon entrance with rotation
    setTimeout(() => {
      Animated.parallel([
        Animated.spring(iconScale, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(iconRotate, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, 200);

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

    // Buttons entrance (staggered)
    setTimeout(() => {
      Animated.spring(button1Scale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }, 400);

    setTimeout(() => {
      Animated.spring(button2Scale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }, 550);

    // Glow pulse effect
    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    setTimeout(() => {
      glowAnimation.start();
    }, 800);

    // Floating animations for decorative elements
    const floatAnimation1 = Animated.loop(
      Animated.sequence([
        Animated.timing(float1, {
          toValue: -15,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(float1, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    const floatAnimation2 = Animated.loop(
      Animated.sequence([
        Animated.timing(float2, {
          toValue: 20,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(float2, {
          toValue: 0,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    floatAnimation1.start();
    floatAnimation2.start();

    return () => {
      glowAnimation.stop();
      floatAnimation1.stop();
      floatAnimation2.stop();
    };
  }, []);

  const handleLanguageSelect = (lang: string) => {
    i18n.changeLanguage(lang);
    dispatch(setLanguage(lang));
    navigation.navigate('Login');
  };

  const iconRotation = iconRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-20deg', '0deg'],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Decorative animated circles */}
      <Animated.View
        style={[styles.decorCircle1, { transform: [{ translateY: float1 }] }]}
      />
      <Animated.View
        style={[styles.decorCircle2, { transform: [{ translateY: float2 }] }]}
      />
      <View style={styles.decorCircle3} />

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
            source={require('../assets/images/vehicle3.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroText}>Fast & Reliable</Text>
          </View>
        </View>
      </Animated.View>

      {/* Content Section */}
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
            {/* Globe Icon with glow */}
            <View style={styles.iconWrapper}>
              <Animated.View
                style={[
                  styles.glow,
                  {
                    opacity: glowOpacity,
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.iconContainer,
                  {
                    transform: [{ scale: iconScale }, { rotate: iconRotation }],
                  },
                ]}
              >
                <Text style={styles.icon}>🌍</Text>
              </Animated.View>
            </View>

            {/* Title */}
            <Text style={styles.title}>{t('selectLanguage')}</Text>
            <Text style={styles.subtitle}>
              Choose your preferred language to continue
            </Text>

            {/* Language Buttons */}
            <View style={styles.buttonContainer}>
              <Animated.View
                style={{
                  transform: [{ scale: button1Scale }],
                }}
              >
                <TouchableOpacity
                  style={styles.languageButton}
                  onPress={() => handleLanguageSelect('en')}
                  activeOpacity={0.8}
                >
                  <View style={styles.languageIcon}>
                    <Text style={styles.flagIcon}>🇮🇳</Text>
                  </View>
                  <View style={styles.languageInfo}>
                    <Text style={styles.languageName}>English</Text>
                    <Text style={styles.languageSubtext}>English</Text>
                  </View>
                  <Text style={styles.checkIcon}>→</Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View
                style={{
                  transform: [{ scale: button2Scale }],
                }}
              >
                <TouchableOpacity
                  style={styles.languageButton}
                  onPress={() => handleLanguageSelect('or')}
                  activeOpacity={0.8}
                >
                  <View style={styles.languageIcon}>
                    <Text style={styles.flagIcon}>🇮🇳</Text>
                  </View>
                  <View style={styles.languageInfo}>
                    <Text style={styles.languageName}>ଓଡ଼ିଆ</Text>
                    <Text style={styles.languageSubtext}>Odia</Text>
                  </View>
                  <Text style={styles.checkIcon}>→</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>

          {/* Terms Text */}
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.link}>Terms of Service</Text> and{' '}
            <Text style={styles.link}>Privacy Policy</Text>.
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* Decorative circles (soft, subtle) */
  decorCircle1: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    top: -120,
    right: -80,
  },
  decorCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    bottom: 100,
    left: -100,
  },
  decorCircle3: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(59, 130, 246, 0.06)',
    top: '45%',
    right: -60,
  },

  /* Hero */
  heroContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  heroCard: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  heroImage: {
    width: '100%',
    height: '100%',
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
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  formSection: {
    flex: 1,
    justifyContent: 'center',
  },

  /* Globe icon */
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  glow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(59, 130, 246, 0.25)',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#CBD5F5',
  },
  icon: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#3B82F6',
  },

  /* Titles */
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
      fontFamily: 'Poppins-Regular',
    color: '#475569',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },

  /* Language buttons */
  buttonContainer: {
    gap: 16,
  },
  languageButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  languageIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  flagIcon: {
    fontSize: 28,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 20,
    fontWeight: '600',
       fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: 2,
  },
  languageSubtext: {
    fontSize: 14,
       fontFamily: 'Poppins-Regular',
    color: '#64748B',
  },
  checkIcon: {
    fontSize: 24,
       fontFamily: 'Poppins-Regular',
    color: '#2563EB',
    fontWeight: 'bold',
  },

  /* Footer text */
  termsText: {
    fontSize: 11,
       fontFamily: 'Poppins-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
  },
  link: {
    color: '#2563EB',
  },
});

export default LanguageSelection;