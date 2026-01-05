import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#FF6D00', // Vibrant Orange
  secondary: '#2979FF', // Accent Blue
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  error: '#D32F2F',
  success: '#388E3C',
  warning: '#FBC02D',
  border: '#E0E0E0',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const FONTS = {
  regular: 'System', // Replace with custom font logic if needed
  medium: 'System',
  bold: 'System',
};

export const SIZES = {
  width,
  height,
  h1: 30,
  h2: 24,
  h3: 20,
  body1: 16,
  body2: 14,
  caption: 12,
};

export const THEME = {
  colors: COLORS,
  spacing: SPACING,
  fonts: FONTS,
  sizes: SIZES,
};
