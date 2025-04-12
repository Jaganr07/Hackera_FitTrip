import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PersonalDetailsScreen() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState('Male');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backIcon}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Header Title */}
      <Text style={styles.headerTitle}>Tell us more about you</Text>

      {/* Profile Image */}
      <Text style={styles.subtitle}>Add your best photo of yourself</Text>
      <Image
        source={require('../../assets/images/profile-placeholder.png')}
        style={styles.profileImage}
      />

      {/* Gender Selection */}
      <Text style={styles.label}>Gender</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, selectedGender === 'Female' && styles.genderSelected]}
          onPress={() => setSelectedGender('Female')}
        >
          <Text
            style={[styles.genderText, selectedGender === 'Female' && styles.genderTextSelected]}
          >
            Female
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, selectedGender === 'Male' && styles.genderSelected]}
          onPress={() => setSelectedGender('Male')}
        >
          <Text
            style={[styles.genderText, selectedGender === 'Male' && styles.genderTextSelected]}
          >
            Male
          </Text>
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => router.push('/screens/SkillLevelScreen')}
      >
        <Ionicons name="arrow-forward" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  backIcon: {
    marginRight: 10,
  },
  logo: {
    width: 80,
    height: 30,
    marginLeft: -20, // Shifted left by 4 steps
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20, // Adjusted margin to position it right after the logo
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    marginVertical: 20,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignSelf: 'center',
    backgroundColor: '#ccc',
  },
  label: {
    marginTop: 40,
    marginBottom: 10,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  genderButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
  },
  genderSelected: {
    backgroundColor: '#111',
  },
  genderText: {
    color: '#aaa',
    fontWeight: '500',
  },
  genderTextSelected: {
    color: '#fff',
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 30,
  },
});

