import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useAuthStore } from '../store/useAuthStore';

const Splash = () => {
  const navigation = useNavigation<any>();
  const { isAuthenticated, token } = useAuthStore();

  useEffect(() => {
    // Check if user is already authenticated and log token
    if (isAuthenticated && token) {
      console.log('👤 Already authenticated! Bearer Token:', token);
    }

    // Simple timeout instead of complex animations
    const timer = setTimeout(() => {
      navigation.replace('LanguageSelection');
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, [navigation, isAuthenticated, token]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        {/* Logo Container */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logo_zipto.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 240,
    height: 240,
  },
});

export default Splash;
