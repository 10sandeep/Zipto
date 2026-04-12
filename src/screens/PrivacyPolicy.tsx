import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  PixelRatio,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// ─── Responsive helpers ───────────────────────────────────────────────────────
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BASE_WIDTH  = 390;
const BASE_HEIGHT = 844;

const scaleW = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;
const scaleH = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

const ms = (size: number, factor = 0.45) =>
  size + (scaleW(size) - size) * factor;

const fs = (size: number) =>
  Math.round(PixelRatio.roundToNearestPixel(ms(size)));
// ─────────────────────────────────────────────────────────────────────────────

const PrivacyPolicy = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={ms(24)} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Privacy Policy</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.legalContent}>
            <Text style={styles.legalTitle}>Privacy Policy</Text>
            <Text style={styles.legalUpdate}>Effective: 11 April 2026 · Last updated: 11 April 2026</Text>

            <Text style={styles.welcomeText}>
              This Privacy Policy describes how Zipto Hyperlogistics Pvt. Ltd. ("Zipto", "Company", "We", "Us") collects, uses, and protects your information when you use the Zipto Customer Application, website, and related services. By using Zipto, you explicitly consent to the collection and use of your data as described in this policy.
            </Text>

            {/* 1. Company Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>1. Company Details</Text>
              <Text style={styles.sectionText}>
                Company Name: ZIPTO HYPERLOGISTICS PRIVATE LIMITED{'\n'}
                Registered Office: 781, Saheed Nagar, 780, Maharishi College Road, Saheed Nagar, Khorda, Bhubaneswar, Orissa, India – 751007{'\n'}
                Location: Bhubaneswar, Odisha, India
              </Text>
            </View>

            {/* 2. Information We Collect */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. Information We Collect</Text>

              <Text style={styles.subSectionTitle}>A. Personal Information</Text>
              <Text style={styles.bulletText}>• Full Name</Text>
              <Text style={styles.bulletText}>• Mobile Number</Text>
              <Text style={styles.bulletText}>• Email Address</Text>

              <Text style={styles.subSectionTitle}>B. Location Data</Text>
              <Text style={styles.sectionText}>
                We collect location data to enable pickup and delivery services, provide real-time tracking, and improve service accuracy. Location is collected only when required for active services.
              </Text>

              <Text style={styles.subSectionTitle}>C. Order & Transaction Data</Text>
              <Text style={styles.bulletText}>• Pickup and delivery addresses</Text>
              <Text style={styles.bulletText}>• Order details and history</Text>
              <Text style={styles.bulletText}>• Payment method (UPI, Cash, COD)</Text>

              <Text style={styles.subSectionTitle}>D. Device Information</Text>
              <Text style={styles.bulletText}>• Device type and model</Text>
              <Text style={styles.bulletText}>• IP address</Text>
              <Text style={styles.bulletText}>• App usage data and logs</Text>
            </View>

            {/* 3. How We Use Your Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
              <Text style={styles.sectionText}>We use your data to:</Text>
              <Text style={styles.bulletText}>• Provide delivery services</Text>
              <Text style={styles.bulletText}>• Connect you with delivery partners</Text>
              <Text style={styles.bulletText}>• Process orders and payments</Text>
              <Text style={styles.bulletText}>• Send updates and notifications</Text>
              <Text style={styles.bulletText}>• Improve user experience and service quality</Text>
            </View>

            {/* 4. Data Sharing */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>4. Data Sharing</Text>
              <Text style={styles.sectionText}>We may share your data with:</Text>

              <Text style={styles.subSectionTitle}>Delivery Partners:</Text>
              <Text style={styles.sectionText}>
                Limited information shared solely for order fulfillment purposes.
              </Text>

              <Text style={styles.subSectionTitle}>Payment Providers:</Text>
              <Text style={styles.sectionText}>
                Shared with secure third-party gateways to process transactions.
              </Text>

              <Text style={styles.subSectionTitle}>Service Providers:</Text>
              <Text style={styles.sectionText}>
                Analytics and support partners who assist in improving our platform.
              </Text>

              <Text style={styles.subSectionTitle}>Legal Authorities:</Text>
              <Text style={styles.sectionText}>
                Disclosed only if required by applicable law or government order.
              </Text>

              <Text style={styles.importantNote}>
                We do NOT sell your personal data to any third party.
              </Text>
            </View>

            {/* 5. Payment Security */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>5. Payment Security</Text>
              <Text style={styles.sectionText}>
                Payments are processed via secure third-party gateways. Zipto does NOT store:
              </Text>
              <Text style={styles.bulletText}>• Card details or banking credentials</Text>
              <Text style={styles.bulletText}>• UPI PIN or passwords</Text>
              <Text style={styles.bulletText}>• One-time passwords (OTP)</Text>
            </View>

            {/* 6. Data Retention */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>6. Data Retention</Text>
              <Text style={styles.sectionText}>
                We retain your data for as long as your account is active or as required by law. When your information is no longer needed, we will securely delete or anonymize it.
              </Text>
            </View>

            {/* 7. User Rights */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>7. Your Rights</Text>
              <Text style={styles.sectionText}>You may exercise the following rights at any time:</Text>
              <Text style={styles.bulletText}>• Access: Request access to the personal data we hold about you</Text>
              <Text style={styles.bulletText}>• Update: Correct or update your information through account settings</Text>
              <Text style={styles.bulletText}>• Deletion: Request permanent deletion of your account and data</Text>
              <Text style={styles.sectionText}>
                To exercise these rights, contact us at support@ridezipto.com
              </Text>
            </View>

            {/* 8. Account Deletion */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>8. Account Deletion</Text>
              <Text style={styles.sectionText}>
                Users can request account deletion by emailing support@ridezipto.com. Data will be deleted within a reasonable timeframe, subject to applicable legal requirements.
              </Text>
            </View>

            {/* 9. Cookies */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>9. Cookies</Text>
              <Text style={styles.sectionText}>
                We may use cookies and similar technologies to improve platform performance and enhance your user experience. You can manage cookie preferences through your device or browser settings.
              </Text>
            </View>

            {/* 10. Children's Privacy */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>10. Children's Privacy</Text>
              <Text style={styles.sectionText}>
                Zipto is not intended for users under 18 years of age. We do not knowingly collect personal information from minors. If you believe we have collected such information, please contact us immediately.
              </Text>
            </View>

            {/* 11. Changes to Policy */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>11. Changes to This Policy</Text>
              <Text style={styles.sectionText}>
                We may update this Privacy Policy at any time. Continued use of our services after changes are posted constitutes your acceptance of the revised policy. We will notify you of material changes through the app or your registered contact details.
              </Text>
            </View>

            {/* 12. Contact & Grievance */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>12. Contact & Grievance</Text>
              <Text style={styles.sectionText}>
                If you have any questions or concerns regarding this Privacy Policy, please reach out to us:
              </Text>
              <Text style={styles.contactText}>Email: support@ridezipto.com</Text>
              <Text style={styles.contactText}>Grievance Officer: Zipto Support Team</Text>
              <Text style={styles.contactText}>Response Time: Within 48 hours</Text>
              <Text style={styles.contactText}>Address: Bhubaneswar, Odisha, India</Text>
            </View>

            <View style={styles.acknowledgementCard}>
              <MaterialIcons name="security" size={ms(24)} color="#3B82F6" />
              <Text style={styles.acknowledgementText}>
                Your privacy is important to us. By using Zipto, you acknowledge that you have read and understood this Privacy Policy and consent to our data practices as described herein. © 2026 Zipto Hyperlogistics Pvt. Ltd.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

// ─── Derived responsive values ────────────────────────────────────────────────
const backBtnSize = ms(40);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  safeArea:  { flex: 1 },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleW(16),
    paddingVertical: scaleH(16),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: backBtnSize,
    height: backBtnSize,
    borderRadius: backBtnSize / 2,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fs(20),
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
  },
  placeholder: { width: backBtnSize },

  // ── Scroll ──
  scrollView:    { flex: 1 },
  scrollContent: { paddingBottom: scaleH(24) },
  legalContent:  { padding: scaleW(20) },

  // ── Title block ──
  legalTitle: {
    fontSize: fs(26),
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: scaleH(8),
  },
  legalUpdate: {
    fontSize: fs(13),
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    marginBottom: scaleH(20),
  },
  welcomeText: {
    fontSize: fs(14),
    fontFamily: 'Poppins-Regular',
    color: '#475569',
    lineHeight: fs(14) * 1.6,
    marginBottom: scaleH(24),
    padding: ms(16),
    backgroundColor: '#EFF6FF',
    borderRadius: ms(10),
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },

  // ── Sections ──
  section: { marginBottom: scaleH(24) },
  sectionTitle: {
    fontSize: fs(17),
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: scaleH(12),
  },
  subSectionTitle: {
    fontSize: fs(15),
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#1E40AF',
    marginBottom: scaleH(8),
    marginTop: scaleH(8),
  },
  sectionText: {
    fontSize: fs(14),
    fontFamily: 'Poppins-Regular',
    color: '#475569',
    lineHeight: fs(14) * 1.7,
    marginBottom: scaleH(12),
  },
  bulletText: {
    fontSize: fs(14),
    fontFamily: 'Poppins-Regular',
    color: '#475569',
    lineHeight: fs(14) * 1.7,
    marginBottom: scaleH(8),
    paddingLeft: scaleW(8),
  },
  importantNote: {
    fontSize: fs(14),
    fontFamily: 'Poppins-Regular',
    color: '#16A34A',
    lineHeight: fs(14) * 1.6,
    marginTop: scaleH(12),
    padding: ms(12),
    backgroundColor: '#F0FDF4',
    borderRadius: ms(8),
    borderLeftWidth: 3,
    borderLeftColor: '#16A34A',
  },
  contactText: {
    fontSize: fs(14),
    fontFamily: 'Poppins-Regular',
    color: '#3B82F6',
    lineHeight: fs(14) * 1.7,
    marginBottom: scaleH(6),
  },

  // ── Acknowledgement card ──
  acknowledgementCard: {
    flexDirection: 'row',
    backgroundColor: '#DBEAFE',
    padding: ms(16),
    borderRadius: ms(12),
    gap: scaleW(12),
    marginTop: scaleH(8),
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    alignItems: 'flex-start',
  },
  acknowledgementText: {
    flex: 1,
    fontSize: fs(13),
    fontFamily: 'Poppins-Regular',
    color: '#1E40AF',
    lineHeight: fs(13) * 1.55,
  },
});

export default PrivacyPolicy;