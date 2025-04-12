import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Switch,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../ThemeContext'; // Make sure this path is correct

export default function SettingsScreen() {
  const router = useRouter();
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(true);

  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === 'dark';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#fff' }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Profile Section */}
        <View style={[styles.profileSection, { backgroundColor: isDarkTheme ? '#111' : '#f6f6f6' }]}>
          <Image
            source={require('../../assets/images/profile-placeholder.png')}
            style={styles.avatar}
          />
          <Text style={[styles.name, { color: isDarkTheme ? '#fff' : '#000' }]}>Jagan R</Text>
          <Text style={[styles.email, { color: isDarkTheme ? '#aaa' : '#666' }]}>
            jaganr2005@gmail.com
          </Text>
        </View>

        {/* Settings Options */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#aaa' : '#999' }]}>
            Account
          </Text>

          <SettingItem
            icon={<Ionicons name="person-outline" size={20} color={isDarkTheme ? '#fff' : '#444'} />}
            label="Edit Profile"
            onPress={() => router.push('/screens/edit-profile')}
            dark={isDarkTheme}
          />
          <SettingItem
            icon={<MaterialIcons name="lock-outline" size={20} color={isDarkTheme ? '#fff' : '#444'} />}
            label="Change Password"
            onPress={() => router.push('/screens/ChangePasswordScreen')}
            dark={isDarkTheme}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#aaa' : '#999' }]}>
            Preferences
          </Text>

          <ToggleItem
            icon={<Ionicons name="notifications-outline" size={20} color={isDarkTheme ? '#fff' : '#444'} />}
            label="Notifications"
            value={isNotificationsEnabled}
            onValueChange={(value: boolean) => setNotificationsEnabled(value)}
            dark={isDarkTheme}
          />

          <ToggleItem
            icon={<Ionicons name="moon-outline" size={20} color={isDarkTheme ? '#fff' : '#444'} />}
            label="Dark Theme"
            value={isDarkTheme}
            onValueChange={toggleTheme}
            dark={isDarkTheme}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type SettingItemProps = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  labelStyle?: object;
  dark?: boolean;
};

function SettingItem({ icon, label, onPress, labelStyle = {}, dark = false }: SettingItemProps) {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={[styles.label, { color: dark ? '#fff' : '#333' }, labelStyle]}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={dark ? '#888' : '#bbb'} />
    </TouchableOpacity>
  );
}

type ToggleItemProps = {
  icon: React.ReactNode;
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  dark?: boolean;
};

function ToggleItem({ icon, label, value, onValueChange, dark = false }: ToggleItemProps) {
  return (
    <View style={styles.settingItem}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={[styles.label, { color: dark ? '#fff' : '#333' }]}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '500',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  iconContainer: {
    width: 30,
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
});
