import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HelpFeedbackScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Ionicons name="help-circle-outline" size={20} color="#000" style={styles.icon} />
        <Text style={styles.headerTitle}>Help & Feedback</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.text}>
          We’re here to help! Below are some frequently asked questions and ways you can reach us if
          you need more assistance.
        </Text>

        <Text style={styles.title}>Frequently Asked Questions</Text>
        <Text style={styles.question}>How do I reset my password?</Text>
        <Text style={styles.answer}>
          Go to Settings &gt; Account &gt; Change Password and follow the instructions.
        </Text>

        <Text style={styles.question}>How do I contact support?</Text>
        <Text style={styles.answer}>
          You can email us at 📧 support@fittripapp.com or use the contact form below.
        </Text>

        <Text style={styles.question}>How do I cancel my subscription?</Text>
        <Text style={styles.answer}>
          Navigate to Settings &gt; Subscriptions and tap "Cancel Plan". Or follow your app store’s subscription
          management steps.
        </Text>

        <Text style={styles.title}>Submit Feedback</Text>
        <Text style={styles.text}>
          Your feedback helps us improve! Please share your thoughts by contacting us at 📧
          feedback@fittripapp.com
        </Text>

        <Text style={styles.text}>
          You can also leave a review on the app store – we’d love to hear from you!
        </Text>
      </ScrollView>
    </View>
  );
};

export default HelpFeedbackScreen;

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
  question: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    color: '#000',
  },
  answer: {
    fontSize: 14,
    marginTop: 4,
    color: '#333',
  },
});
