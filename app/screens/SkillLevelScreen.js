import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SkillLevelScreen() {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleNext = () => {
    if (selectedLevel) {
      router.push('/screens/HomeScreen'); // <-- Make sure this matches your file path!
    }
  };

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

      <Text style={styles.title}>What's your skill level?</Text>

      {/* Skill Options */}
      <View style={styles.options}>
        {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.option,
              selectedLevel === level && styles.optionSelected,
            ]}
            onPress={() => setSelectedLevel(level)}
          >
            <Text
              style={[
                styles.optionText,
                selectedLevel === level && styles.optionTextSelected,
              ]}
            >
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={[
          styles.nextButton,
          { opacity: selectedLevel ? 1 : 0.4 },
        ]}
        onPress={handleNext}
        disabled={!selectedLevel}
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
    marginLeft: -20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
  options: {
    marginTop: 40,
    gap: 15,
  },
  option: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionSelected: {
    backgroundColor: '#111',
  },
  optionText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
  },
  optionTextSelected: {
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
