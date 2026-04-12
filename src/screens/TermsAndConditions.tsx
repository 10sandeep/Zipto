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

const TermsAndConditions = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={ms(24)} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Terms & Conditions</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.legalContent}>
            <Text style={styles.legalTitle}>Terms and Conditions</Text>
            <Text style={styles.legalUpdate}>Effective: 11 April 2026 · Last updated: 11 April 2026</Text>

            <Text style={styles.welcomeText}>
              These Terms & Conditions constitute a legally binding agreement between you ("User", "Customer") and Zipto Hyperlogistics Pvt. Ltd. ("Zipto", "Company", "We", "Us"). By accessing or using the Zipto Customer Application, website, or services, you agree to be bound by these Terms.
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

            {/* 2. Platform Nature */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. Platform Nature</Text>
              <Text style={styles.sectionText}>
                Zipto is a technology platform that connects customers with independent delivery partners. Zipto does NOT directly provide delivery services. The Company acts solely as an intermediary facilitating the connection between users and delivery partners.
              </Text>
            </View>

            {/* 3. Eligibility */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>3. Eligibility</Text>
              <Text style={styles.bulletText}>• Must be 18 years of age or older to use our services</Text>
              <Text style={styles.bulletText}>• Must provide accurate, complete, and current information at all times</Text>
            </View>

            {/* 4. Services */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>4. Services</Text>
              <Text style={styles.sectionText}>Zipto enables the following delivery services:</Text>
              <Text style={styles.bulletText}>• Food delivery</Text>
              <Text style={styles.bulletText}>• Parcel delivery</Text>
              <Text style={styles.bulletText}>• Medicine delivery</Text>
              <Text style={styles.bulletText}>• Goods transportation</Text>
            </View>

            {/* 5. User Obligations */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>5. User Obligations</Text>
              <Text style={styles.sectionText}>By using our platform, you agree to:</Text>
              <Text style={styles.bulletText}>• Provide correct and accurate pickup and delivery details</Text>
              <Text style={styles.bulletText}>• Properly package items before dispatch</Text>
              <Text style={styles.bulletText}>• Avoid sending illegal, restricted, or prohibited goods</Text>
              <Text style={styles.sectionText}>
                You are responsible for safeguarding your account credentials. You agree not to disclose your password or OTP to any third party.
              </Text>
            </View>

            {/* 6. Pricing & Payments */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>6. Pricing & Payments</Text>
              <Text style={styles.sectionText}>
                All fees are payable in Indian Rupees (INR). Prices are dynamic and may vary based on distance, demand, and other factors. Accepted payment methods include:
              </Text>
              <Text style={styles.bulletText}>• UPI</Text>
              <Text style={styles.bulletText}>• Cash</Text>
              <Text style={styles.bulletText}>• Cash on Delivery (COD)</Text>
              <Text style={styles.sectionText}>
                All prices and charges are subject to change. However, changes will not affect orders already placed and confirmed.
              </Text>
            </View>

            {/* 7. Cancellation */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>7. Cancellation Policy</Text>
              <Text style={styles.bulletText}>• Before assignment: Free cancellation, no charges apply</Text>
              <Text style={styles.bulletText}>• After assignment: Cancellation charges apply</Text>
              <Text style={styles.bulletText}>• After pickup: Cancellation is not permitted</Text>
            </View>

            {/* 8. Refunds */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>8. Refund Policy</Text>
              <Text style={styles.sectionText}>Refunds are applicable only in the following cases:</Text>
              <Text style={styles.bulletText}>• Failed transactions</Text>
              <Text style={styles.bulletText}>• Duplicate payments</Text>
              <Text style={styles.bulletText}>• Cancellation initiated by Zipto</Text>
              <Text style={styles.sectionText}>
                Refunds will be processed within 5–7 business days to the original payment method.
              </Text>
            </View>

            {/* 9. Prohibited Items */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>9. Prohibited Items</Text>
              <Text style={styles.sectionText}>
                Users are strictly prohibited from sending the following items. The user is fully responsible for the contents of their shipment.
              </Text>

              <Text style={styles.subSectionTitle}>Illegal Items:</Text>
              <Text style={styles.bulletText}>• Narcotics, drugs, or controlled substances</Text>
              <Text style={styles.bulletText}>• Weapons, firearms, or explosives</Text>
              <Text style={styles.bulletText}>• Counterfeit or stolen goods</Text>

              <Text style={styles.subSectionTitle}>Hazardous Materials:</Text>
              <Text style={styles.bulletText}>• Flammable or combustible substances</Text>
              <Text style={styles.bulletText}>• Toxic or corrosive chemicals</Text>
              <Text style={styles.bulletText}>• Dangerous or biohazardous materials</Text>

              <Text style={styles.subSectionTitle}>Restricted Goods:</Text>
              <Text style={styles.bulletText}>• Cash or currency</Text>
              <Text style={styles.bulletText}>• Precious items or jewellery without declaration</Text>
              <Text style={styles.bulletText}>• Alcohol or government-regulated goods</Text>

              <Text style={styles.importantNote}>
                Violation of this policy may result in immediate account suspension and legal action.
              </Text>
            </View>

            {/* 10. Account & Security */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>10. Account & Security</Text>
              <Text style={styles.sectionText}>
                Users are solely responsible for maintaining the confidentiality of their account credentials. Zipto is not liable for any unauthorized access or misuse arising from user negligence.
              </Text>
            </View>

            {/* 11. Third-Party Services */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>11. Third-Party Services</Text>
              <Text style={styles.sectionText}>
                Zipto may integrate third-party services such as payment gateways and mapping tools to enhance platform functionality. We are not responsible for the performance, availability, or actions of these third-party services.
              </Text>
            </View>

            {/* 12. Limitation of Liability */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>12. Limitation of Liability</Text>
              <Text style={styles.sectionText}>
                To the maximum extent permitted by law, Zipto shall not be liable for:
              </Text>
              <Text style={styles.bulletText}>• Delivery delays caused by traffic, weather, or unforeseen circumstances</Text>
              <Text style={styles.bulletText}>• Loss or damage due to improper packaging by the user</Text>
              <Text style={styles.bulletText}>• Errors or losses arising from incorrect information provided by the user</Text>
              <Text style={styles.bulletText}>• Actions or failures of third-party service providers</Text>
            </View>

            {/* 13. Indemnification */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>13. Indemnification</Text>
              <Text style={styles.sectionText}>
                You agree to indemnify and hold Zipto, its affiliates, officers, agents, and employees harmless from any claim, damage, or legal cost arising from your misuse of the platform, breach of these Terms, or violation of any applicable law.
              </Text>
            </View>

            {/* 14. Termination */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>14. Termination</Text>
              <Text style={styles.sectionText}>
                Zipto reserves the right to suspend or permanently terminate accounts for:
              </Text>
              <Text style={styles.bulletText}>• Fraudulent activity</Text>
              <Text style={styles.bulletText}>• Abusive behaviour towards partners or staff</Text>
              <Text style={styles.bulletText}>• Violations of these Terms or any applicable policy</Text>
            </View>

            {/* 15. Intellectual Property */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>15. Intellectual Property</Text>
              <Text style={styles.sectionText}>
                All content, branding, and technology on the Zipto platform are the exclusive intellectual property of Zipto Hyperlogistics Pvt. Ltd. Unauthorized use is strictly prohibited.
              </Text>
            </View>

            {/* 16. Privacy */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>16. Privacy</Text>
              <Text style={styles.sectionText}>
                Your use of the Zipto platform is governed by our Privacy Policy. By using our services, you consent to the collection and use of your data as described therein.
              </Text>
            </View>

            {/* 17. Force Majeure */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>17. Force Majeure</Text>
              <Text style={styles.sectionText}>
                Zipto shall not be held liable for delays or failures caused by events beyond our reasonable control, including natural disasters, government actions, network outages, or other force majeure events.
              </Text>
            </View>

            {/* 18. Governing Law */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>18. Governing Law</Text>
              <Text style={styles.sectionText}>
                These Terms are governed by and construed in accordance with the laws of India. All disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Bhubaneswar, Odisha.
              </Text>
            </View>

            {/* 19. Modification of Terms */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>19. Modification of Terms</Text>
              <Text style={styles.sectionText}>
                Zipto may update or modify these Terms at any time without prior notice. Continued use of the platform after changes are posted constitutes your acceptance of the revised Terms.
              </Text>
            </View>

            {/* 20. Contact & Grievance */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>20. Contact & Grievance</Text>
              <Text style={styles.sectionText}>
                If you have any questions or concerns regarding these Terms, please contact us:
              </Text>
              <Text style={styles.contactText}>Email: support@ridezipto.com</Text>
              <Text style={styles.contactText}>Grievance Officer: Zipto Support Team</Text>
              <Text style={styles.contactText}>Response Time: Within 48 hours</Text>
              <Text style={styles.contactText}>Address: Bhubaneswar, Odisha, India</Text>
            </View>

            <View style={styles.acknowledgementCard}>
              <MaterialIcons name="info-outline" size={ms(24)} color="#3B82F6" />
              <Text style={styles.acknowledgementText}>
                By using Zipto's services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. © 2026 Zipto Hyperlogistics Pvt. Ltd.
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
  scrollView: { flex: 1 },
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
    backgroundColor: '#DCFCE7',
    padding: ms(16),
    borderRadius: ms(12),
    gap: scaleW(12),
    marginTop: scaleH(8),
    borderLeftWidth: 4,
    borderLeftColor: '#16A34A',
    alignItems: 'flex-start',
  },
  acknowledgementText: {
    flex: 1,
    fontSize: fs(13),
    fontFamily: 'Poppins-Regular',
    color: '#166534',
    lineHeight: fs(13) * 1.55,
  },
});

export default TermsAndConditions;