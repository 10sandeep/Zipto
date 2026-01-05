import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Splash = () => {
  const navigation = useNavigation<any>();

  // Animation values
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineTranslateY = useRef(new Animated.Value(30)).current;
  const truckTranslateX = useRef(new Animated.Value(-width)).current;
  const truckOpacity = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  
  // Floating circles animations
  const circle1Y = useRef(new Animated.Value(0)).current;
  const circle2Y = useRef(new Animated.Value(0)).current;
  const circle3Y = useRef(new Animated.Value(0)).current;
  const circle1Scale = useRef(new Animated.Value(1)).current;
  const circle2Scale = useRef(new Animated.Value(1)).current;
  const circle3Scale = useRef(new Animated.Value(1)).current;

  // Particles
  const particle1 = useRef(new Animated.Value(0)).current;
  const particle2 = useRef(new Animated.Value(0)).current;
  const particle3 = useRef(new Animated.Value(0)).current;
  const particle4 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Floating circles animation
    const floatingAnimation1 = Animated.loop(
      Animated.sequence([
        Animated.timing(circle1Y, {
          toValue: -20,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(circle1Y, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    const floatingAnimation2 = Animated.loop(
      Animated.sequence([
        Animated.timing(circle2Y, {
          toValue: 25,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(circle2Y, {
          toValue: 0,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    const floatingAnimation3 = Animated.loop(
      Animated.sequence([
        Animated.timing(circle3Y, {
          toValue: -15,
          duration: 3500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(circle3Y, {
          toValue: 0,
          duration: 3500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // Pulsing circles
    const pulseAnimation1 = Animated.loop(
      Animated.sequence([
        Animated.timing(circle1Scale, {
          toValue: 1.1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(circle1Scale, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    const pulseAnimation2 = Animated.loop(
      Animated.sequence([
        Animated.timing(circle2Scale, {
          toValue: 1.15,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(circle2Scale, {
          toValue: 1,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    const pulseAnimation3 = Animated.loop(
      Animated.sequence([
        Animated.timing(circle3Scale, {
          toValue: 1.08,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(circle3Scale, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // Start floating and pulsing animations
    floatingAnimation1.start();
    floatingAnimation2.start();
    floatingAnimation3.start();
    pulseAnimation1.start();
    pulseAnimation2.start();
    pulseAnimation3.start();

    // Truck entrance animation with bounce
    Animated.sequence([
      Animated.parallel([
        Animated.timing(truckTranslateX, {
          toValue: width / 2 - 100,
          duration: 1200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(truckOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Small bounce
      Animated.spring(truckTranslateX, {
        toValue: width / 2 - 80,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Logo entrance with rotation and scale
    setTimeout(() => {
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotate, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, 400);

    // Glow pulse effect
    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    setTimeout(() => {
      glowAnimation.start();
    }, 1000);

    // Tagline entrance
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(taglineTranslateY, {
          toValue: 0,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }, 900);

    // Particle animations
    const particleAnimation1 = Animated.loop(
      Animated.timing(particle1, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const particleAnimation2 = Animated.loop(
      Animated.timing(particle2, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const particleAnimation3 = Animated.loop(
      Animated.timing(particle3, {
        toValue: 1,
        duration: 3500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const particleAnimation4 = Animated.loop(
      Animated.timing(particle4, {
        toValue: 1,
        duration: 4500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    setTimeout(() => {
      particleAnimation1.start();
      particleAnimation2.start();
      particleAnimation3.start();
      particleAnimation4.start();
    }, 500);

    // Navigation
    const timer = setTimeout(() => {
      navigation.replace('LanguageSelection');
    }, 3500);

    return () => {
      clearTimeout(timer);
      floatingAnimation1.stop();
      floatingAnimation2.stop();
      floatingAnimation3.stop();
      pulseAnimation1.stop();
      pulseAnimation2.stop();
      pulseAnimation3.stop();
      glowAnimation.stop();
      particleAnimation1.stop();
      particleAnimation2.stop();
      particleAnimation3.stop();
      particleAnimation4.stop();
    };
  }, [navigation]);

  const rotation = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-10deg', '0deg'],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  // Particle interpolations
  const particle1Y = particle1.interpolate({
    inputRange: [0, 1],
    outputRange: [height, -100],
  });

  const particle2Y = particle2.interpolate({
    inputRange: [0, 1],
    outputRange: [height, -100],
  });

  const particle3Y = particle3.interpolate({
    inputRange: [0, 1],
    outputRange: [height, -100],
  });

  const particle4Y = particle4.interpolate({
    inputRange: [0, 1],
    outputRange: [height, -100],
  });

  return (
    <View style={styles.container}>
      {/* Animated background gradient circles */}
      <Animated.View
        style={[
          styles.circle1,
          {
            transform: [
              { translateY: circle1Y },
              { scale: circle1Scale },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.circle2,
          {
            transform: [
              { translateY: circle2Y },
              { scale: circle2Scale },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.circle3,
          {
            transform: [
              { translateY: circle3Y },
              { scale: circle3Scale },
            ],
          },
        ]}
      />

      {/* Floating particles */}
      <Animated.View
        style={[
          styles.particle,
          styles.particle1,
          { transform: [{ translateY: particle1Y }] },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          styles.particle2,
          { transform: [{ translateY: particle2Y }] },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          styles.particle3,
          { transform: [{ translateY: particle3Y }] },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          styles.particle4,
          { transform: [{ translateY: particle4Y }] },
        ]}
      />

      {/* Animated Truck */}
      <Animated.View
        style={[
          styles.truckContainer,
          {
            opacity: truckOpacity,
            transform: [{ translateX: truckTranslateX }],
          },
        ]}
      >
        <Text style={styles.truck}>🚚</Text>
        <View style={styles.truckTrail} />
      </Animated.View>

      {/* Glow effect behind logo */}
      <Animated.View
        style={[
          styles.glow,
          {
            opacity: glowOpacity,
          },
        ]}
      />

      {/* Logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }, { rotate: rotation }],
          },
        ]}
      >
        <View style={styles.logoWrapper}>
          <Text style={styles.logo}>Zipto</Text>
          <View style={styles.logoUnderline} />
        </View>
      </Animated.View>

      {/* Tagline */}
      <Animated.View
        style={{
          opacity: taglineOpacity,
          transform: [{ translateY: taglineTranslateY }],
        }}
      >
        <Text style={styles.tagline}>⚡ Intra-city Logistics</Text>
        <View style={styles.taglineDots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  circle1: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    top: -200,
    right: -150,
  },
  circle2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    bottom: -150,
    left: -100,
  },
  circle3: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(59, 130, 246, 0.06)',
    top: '40%',
    right: -100,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(59, 130, 246, 0.6)',
  },
  particle1: {
    left: '20%',
  },
  particle2: {
    left: '50%',
  },
  particle3: {
    left: '75%',
  },
  particle4: {
    left: '35%',
  },
  truckContainer: {
    position: 'absolute',
    top: '28%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  truck: {
    fontSize: 70,
  },
  truckTrail: {
    position: 'absolute',
    left: -80,
    width: 80,
    height: 2,
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
    borderRadius: 1,
  },
  glow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(59, 130, 246, 0.4)',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 10,
  },
  logoContainer: {
    marginBottom: 20,
    zIndex: 1,
  },
  logoWrapper: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 4,
    textShadowColor: 'rgba(59, 130, 246, 0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 20,
  },
  logoUnderline: {
    width: 120,
    height: 4,
    backgroundColor: '#3B82F6',
    borderRadius: 2,
    marginTop: 8,
  },
  tagline: {
    fontSize: 18,
    color: '#94A3B8',
    letterSpacing: 2,
    fontWeight: '400',
    textAlign: 'center',
  },
  taglineDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(148, 163, 184, 0.3)',
  },
  dotActive: {
    backgroundColor: '#3B82F6',
    width: 24,
  },
});

export default Splash;