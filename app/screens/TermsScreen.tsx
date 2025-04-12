import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TermsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Ionicons name="document-text-outline" size={20} color="#000" style={styles.icon} />
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.text}>
          Welcome to FitTrip. By using our app, you agree to be bound by these Terms and Conditions.
          Please read them carefully.
        </Text>

        <Text style={styles.title}>1. User Accounts</Text>
        <Text style={styles.text}>
          You must be 16 years or older to create an account. You agree to provide accurate and complete
          information. You are responsible for maintaining the confidentiality of your login credentials.
        </Text>

        <Text style={styles.title}>2. Service Description</Text>
        <Text style={styles.text}>
          FitTrip connects users with partner gyms, allowing flexible access without long-term contracts.
          Additional features include:
        </Text>
        <Text style={styles.bullet}>• Location-based gym discovery</Text>
        <Text style={styles.bullet}>• Workout tracking</Text>
        <Text style={styles.bullet}>• Subscription plan management</Text>

        <Text style={styles.title}>3. Subscription & Payments</Text>
        <Text style={styles.text}>
          Some features require a paid subscription. Subscriptions auto-renew unless canceled at least
          24 hours before the renewal date. Refunds are subject to app store policies.
        </Text>

        <Text style={styles.title}>4. User Conduct</Text>
        <Text style={styles.text}>
          You agree not to misuse the app, interfere with its functionality, impersonate others, or access
          data without authorization.
        </Text>

        <Text style={styles.title}>5. Privacy</Text>
        <Text style={styles.text}>
          We value your privacy. Please review our [Privacy Policy] to understand how we collect, use,
          and protect your data.
        </Text>

        <Text style={styles.title}>6. Termination</Text>
        <Text style={styles.text}>
          We reserve the right to suspend or terminate your account if you violate these Terms.
        </Text>

        <Text style={styles.title}>7. Modifications</Text>
        <Text style={styles.text}>
          We may update these Terms from time to time. Continued use after changes implies acceptance.
        </Text>

        <Text style={styles.title}>8. Contact Us</Text>
        <Text style={styles.text}>
          For any questions or concerns, reach out at: 📧 fittripapp@support.com
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    marginTop: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
    color: '#333',
  },
  bullet: {
    marginLeft: 16,
    fontSize: 14,
    marginTop: 4,
    color: '#333',
  },
});

