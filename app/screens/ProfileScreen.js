import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons, FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear user session if needed
    router.replace('/screens/AuthScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/screens/HomeScreen')}>
          <Ionicons name="home-outline" size={22} color="#000" style={{ marginLeft: 12 }} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Profile Banner */}
        <View style={styles.banner}>
          <View style={styles.avatarWrapper}>
            <Ionicons name="person-circle-outline" size={100} color="#080707" />
          </View>
          <Text style={styles.name}>Name</Text>
          <Text style={styles.email}>Email ID</Text>
        </View>

        {/* Options Card */}
        <View style={styles.card}>
          <Option
            icon={<Feather name="settings" size={20} color="#000" />}
            label="Settings"
            onPress={() => router.push('/screens/SettingsScreen')}
          />
          <Option
            icon={<FontAwesome name="thumbs-o-up" size={20} color="#000" />}
            label="Rate our App"
            external
            onPress={() => console.log('Rate app')}
          />
          <Option
            icon={<Feather name="file-text" size={20} color="#000" />}
            label="Terms & Conditions"
            onPress={() => router.push('/screens/TermsScreen')}
          />
          <Option
            icon={<Feather name="help-circle" size={20} color="#000" />}
            label="Help & Feedback"
            onPress={() => router.push('/screens/HelpFeedbackScreen')}
          />

          {/* Logout Option in red */}
          <TouchableOpacity style={styles.option} onPress={handleLogout}>
            <View style={styles.optionLeft}>
              <MaterialIcons name="logout" size={20} color="#e74c3c" />
              <Text style={[styles.optionText, { color: '#e74c3c' }]}>Logout</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#e74c3c" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Option = ({ icon, label, external, onPress }) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <View style={styles.optionLeft}>
      {icon}
      <Text style={styles.optionText}>{label}</Text>
    </View>
    {external ? (
      <MaterialIcons name="open-in-new" size={18} color="#777" />
    ) : (
      <Ionicons name="chevron-forward" size={18} color="#777" />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  banner: {
    backgroundColor: '#fff',
    paddingVertical: 32,
    alignItems: 'center',
  },
  avatarWrapper: {
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0a0808',
  },
  email: {
    fontSize: 14,
    color: '#0a0808',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 12,
    paddingVertical: 8,
    elevation: 2,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
});
