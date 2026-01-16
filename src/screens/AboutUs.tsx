import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AboutUs = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const stats = [
    { icon: 'local-shipping', label: 'Deliveries', value: '1M+', color: '#3B82F6' },
    { icon: 'people', label: 'Active Users', value: '50K+', color: '#10B981' },
    { icon: 'location-city', label: 'Cities', value: '25+', color: '#F59E0B' },
    { icon: 'store', label: 'Partners', value: '5K+', color: '#8B5CF6' },
  ];

  const features = [
    { icon: 'track-changes', text: 'Real-time tracking for all deliveries' },
    { icon: 'verified-user', text: 'Verified and trained delivery partners' },
    { icon: 'attach-money', text: 'Competitive pricing with no hidden fees' },
    { icon: 'support-agent', text: '24/7 customer support' },
    { icon: 'security', text: 'Secure and encrypted transactions' },
    { icon: 'speed', text: 'Fast and reliable delivery service' },
  ];

  const team = [
    { name: 'Leadership Team', role: 'Driving innovation in delivery', icon: 'groups' },
    { name: 'Technology', role: 'Building cutting-edge solutions', icon: 'code' },
    { name: 'Operations', role: 'Ensuring smooth deliveries', icon: 'settings' },
    { name: 'Support', role: 'Always here to help you', icon: 'headset-mic' },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About Us</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/images/logo_zipto.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.appName}>Zipto</Text>
            <Text style={styles.tagline}>Fast. Reliable. Everywhere.</Text>
          </View>

          {/* Mission Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="flag" size={24} color="#3B82F6" />
              <Text style={styles.sectionTitle}>Our Mission</Text>
            </View>
            <Text style={styles.sectionText}>
              At Zipto, we're revolutionizing last-mile delivery across India. Our mission is to provide fast, reliable, and affordable delivery services that connect businesses and customers seamlessly. We believe in empowering local economies while delivering exceptional service.
            </Text>
          </View>

          {/* What We Do Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="info" size={24} color="#10B981" />
              <Text style={styles.sectionTitle}>What We Do</Text>
            </View>
            <Text style={styles.sectionText}>
              We offer on-demand pickup and delivery services for packages, documents, food, groceries, and more. With our network of verified delivery partners and advanced technology, we ensure your items reach their destination safely and on time, every time.
            </Text>
          </View>

          {/* Stats Grid */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="trending-up" size={24} color="#F59E0B" />
              <Text style={styles.sectionTitle}>Our Impact</Text>
            </View>
            <View style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}15` }]}>
                    <MaterialIcons name={stat.icon} size={32} color={stat.color} />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Why Choose Us Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="star" size={24} color="#8B5CF6" />
              <Text style={styles.sectionTitle}>Why Choose Zipto?</Text>
            </View>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <MaterialIcons name={feature.icon} size={20} color="#10B981" />
                </View>
                <Text style={styles.featureText}>{feature.text}</Text>
              </View>
            ))}
          </View>

          {/* Our Team Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="people" size={24} color="#EC4899" />
              <Text style={styles.sectionTitle}>Our Team</Text>
            </View>
            <View style={styles.teamGrid}>
              {team.map((member, index) => (
                <View key={index} style={styles.teamCard}>
                  <View style={styles.teamIconContainer}>
                    <MaterialIcons name={member.icon} size={28} color="#3B82F6" />
                  </View>
                  <Text style={styles.teamName}>{member.name}</Text>
                  <Text style={styles.teamRole}>{member.role}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Contact Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="contact-mail" size={24} color="#0EA5E9" />
              <Text style={styles.sectionTitle}>Get In Touch</Text>
            </View>
            <View style={styles.contactCard}>
              <TouchableOpacity 
                style={styles.contactItem}
                onPress={() => Linking.openURL('mailto:support@zipto.com')}
              >
                <View style={styles.contactIconContainer}>
                  <MaterialIcons name="email" size={20} color="#3B82F6" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Email</Text>
                  <Text style={styles.contactValue}>support@zipto.com</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#94A3B8" />
              </TouchableOpacity>

              <View style={styles.contactDivider} />

              <TouchableOpacity 
                style={styles.contactItem}
                onPress={() => Linking.openURL('tel:18001234567')}
              >
                <View style={styles.contactIconContainer}>
                  <MaterialIcons name="phone" size={20} color="#10B981" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Phone</Text>
                  <Text style={styles.contactValue}>1800-123-4567</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#94A3B8" />
              </TouchableOpacity>

              <View style={styles.contactDivider} />

              <TouchableOpacity style={styles.contactItem}>
                <View style={styles.contactIconContainer}>
                  <MaterialIcons name="location-on" size={20} color="#EF4444" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Address</Text>
                  <Text style={styles.contactValue}>123 Business Park, Bhubaneswar, Odisha</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Social Media Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="share" size={24} color="#EC4899" />
              <Text style={styles.sectionTitle}>Follow Us</Text>
            </View>
            <View style={styles.socialContainer}>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#1877F2' }]}>
                <MaterialIcons name="facebook" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#1DA1F2' }]}>
                <MaterialIcons name="twitter" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#E4405F' }]}>
                <MaterialIcons name="instagram" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#0A66C2' }]}>
                <MaterialIcons name="linkedin" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#25D366' }]}>
                <MaterialIcons name="whatsapp" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Values Section */}
          <View style={styles.valuesCard}>
            <Text style={styles.valuesTitle}>Our Core Values</Text>
            <View style={styles.valueItem}>
              <MaterialIcons name="verified" size={20} color="#3B82F6" />
              <Text style={styles.valueText}>Reliability & Trust</Text>
            </View>
            <View style={styles.valueItem}>
              <MaterialIcons name="favorite" size={20} color="#EF4444" />
              <Text style={styles.valueText}>Customer First</Text>
            </View>
            <View style={styles.valueItem}>
              <MaterialIcons name="flash-on" size={20} color="#F59E0B" />
              <Text style={styles.valueText}>Speed & Efficiency</Text>
            </View>
            <View style={styles.valueItem}>
              <MaterialIcons name="emoji-people" size={20} color="#10B981" />
              <Text style={styles.valueText}>Empowering Communities</Text>
            </View>
          </View>

          {/* App Info */}
          <View style={styles.appInfo}>
            <Text style={styles.versionText}>Zipto v1.0.0</Text>
            <Text style={styles.copyrightText}>© 2025 Zipto Technologies Pvt. Ltd.</Text>
            <Text style={styles.copyrightText}>All rights reserved.</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 16,
  },
  logoContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#BFDBFE',
    padding: 30,
  },
  logoImage: {
    width: '140%',
    height: '140%',
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#e45c33',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#4c89dd',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
  },
  sectionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#475569',
    lineHeight: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  featureIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#475569',
    fontWeight: '500',
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  teamCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  teamIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: 4,
    textAlign: 'center',
  },
  teamRole: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    textAlign: 'center',
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  contactIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
  },
  contactDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 74,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 8,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  valuesCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  valuesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: 16,
    textAlign: 'center',
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  valueText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#475569',
    fontWeight: '500',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    color: '#94A3B8',
    marginBottom: 8,
  },
  copyrightText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#CBD5E1',
    marginBottom: 2,
  },
});

export default AboutUs;