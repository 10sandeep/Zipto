import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FAQs = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      category: 'Orders & Delivery',
      faqs: [
        { 
          id: 1, 
          question: 'How do I track my order?', 
          answer: 'You can track your order in real-time from the Orders section. Click on any active order to see live tracking on the map with the delivery agent\'s current location and estimated delivery time.' 
        },
        { 
          id: 2, 
          question: 'Can I cancel my order?', 
          answer: 'Yes, you can cancel your order before it\'s picked up by the delivery agent. Go to Orders > Active Orders and select Cancel Order. If the order has already been picked up, cancellation may incur charges.' 
        },
        { 
          id: 3, 
          question: 'What are the delivery charges?', 
          answer: 'Delivery charges vary based on distance and are calculated automatically. Typically ₹20-50 for deliveries within 5km. You\'ll see the exact charges before confirming your order.' 
        },
      ],
    },
    {
      category: 'Payment & Wallet',
      faqs: [
        { 
          id: 4, 
          question: 'What payment methods are accepted?', 
          answer: 'We accept Cash on Delivery, UPI, Credit/Debit Cards, Net Banking, and Wallet payments. You can also use your Zipto Wallet for instant payments and get cashback on orders.' 
        },
        { 
          id: 5, 
          question: 'How do I add money to my wallet?', 
          answer: 'Go to Profile > Wallet and click on "Add Money". Enter the amount and choose your preferred payment method (UPI, Card, or Net Banking). Money will be credited instantly.' 
        },
        { 
          id: 6, 
          question: 'Is my payment information safe?', 
          answer: 'Yes, absolutely! We use industry-standard encryption and secure payment gateways. Your card details are never stored on our servers and all transactions are PCI-DSS compliant.' 
        },
      ],
    },
    {
      category: 'Account & Settings',
      faqs: [
        { 
          id: 7, 
          question: 'How do I change my phone number?', 
          answer: 'Go to Profile > Edit Profile and update your phone number. You\'ll receive an OTP on your new number for verification. Once verified, your number will be updated.' 
        },
        { 
          id: 8, 
          question: 'How do I delete my account?', 
          answer: 'Go to Profile > Settings > Delete Account. Please note that deleting your account is permanent and all your data including order history and wallet balance will be lost.' 
        },
        { 
          id: 9, 
          question: 'How do I manage notifications?', 
          answer: 'Go to Profile > Notification Settings to customize which notifications you want to receive. You can enable/disable order updates, promotions, and new feature announcements separately.' 
        },
      ],
    },
    {
      category: 'Delivery Partners',
      faqs: [
        { 
          id: 10, 
          question: 'How do I contact my delivery agent?', 
          answer: 'Once your order is picked up, you\'ll see a call button on the tracking screen. Click it to directly call your delivery agent. The number is masked for privacy protection.' 
        },
        { 
          id: 11, 
          question: 'Can I tip the delivery agent?', 
          answer: 'Yes! You can tip your delivery agent after the delivery is completed. Go to the order details and click "Add Tip". Tips go 100% to the delivery partner.' 
        },
      ],
    },
    {
      category: 'Refunds & Issues',
      faqs: [
        { 
          id: 12, 
          question: 'How long does a refund take?', 
          answer: 'Refunds are processed within 24-48 hours of cancellation. For wallet payments, refund is instant. For card/UPI payments, it may take 5-7 business days depending on your bank.' 
        },
        { 
          id: 13, 
          question: 'What if my order is damaged?', 
          answer: 'If your order arrives damaged, please report it immediately through the app. Go to Orders > Select Order > Report Issue. Upload photos and our support team will assist you with refund or replacement.' 
        },
      ],
    },
  ];

  const toggleFaq = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
          <Text style={styles.headerTitle}>FAQs</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={20} color="#94A3B8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for questions..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <MaterialIcons name="close" size={20} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>

          {/* FAQ Header */}
          <View style={styles.faqHeaderSection}>
            <Text style={styles.faqMainTitle}>Frequently Asked Questions</Text>
            <Text style={styles.faqSubtitle}>
              Find answers to common questions about using Zipto
            </Text>
          </View>

          {/* FAQ Categories */}
          {faqCategories.map((category, categoryIndex) => (
            <View key={categoryIndex} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{category.category}</Text>
              {category.faqs.map((faq) => (
                <TouchableOpacity
                  key={faq.id}
                  style={styles.faqCard}
                  onPress={() => toggleFaq(faq.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.faqQuestion}>
                    <View style={styles.questionIconContainer}>
                      <MaterialIcons 
                        name="help-outline" 
                        size={20} 
                        color="#3B82F6" 
                      />
                    </View>
                    <Text style={styles.faqQuestionText}>{faq.question}</Text>
                    <MaterialIcons 
                      name={expandedId === faq.id ? 'expand-less' : 'expand-more'} 
                      size={24} 
                      color="#64748B" 
                    />
                  </View>
                  {expandedId === faq.id && (
                    <View style={styles.faqAnswerContainer}>
                      <Text style={styles.faqAnswer}>{faq.answer}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}

          {/* Still Have Questions Card */}
          <View style={styles.helpCard}>
            <View style={styles.helpIconContainer}>
              <MaterialIcons name="support-agent" size={32} color="#3B82F6" />
            </View>
            <Text style={styles.helpCardTitle}>Still have questions?</Text>
            <Text style={styles.helpCardDesc}>
              Our support team is here to help you 24/7
            </Text>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => navigation.navigate('Support')}
            >
              <MaterialIcons name="chat" size={18} color="#FFFFFF" />
              <Text style={styles.contactButtonText}>Contact Support</Text>
            </TouchableOpacity>
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
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
    gap: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
  },
  faqHeaderSection: {
    marginBottom: 24,
  },
  faqMainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: 8,
  },
  faqSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    lineHeight: 20,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: 12,
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginRight: 8,
  },
  faqAnswerContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  faqAnswer: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    lineHeight: 22,
    paddingLeft: 46,
  },
  helpCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  helpIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  helpCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: 8,
  },
  helpCardDesc: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  contactButtonText: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
  },
});

export default FAQs;