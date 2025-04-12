import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const historyData = [
  {
    id: '1',
    gymName: 'SLAM Fitness Center',
    date: '15 Apr 25',
    duration: '1 Day',
    image: require('../../assets/images/ticket.png'),
  },
  {
    id: '2',
    gymName: 'FIKA Fitness Center',
    date: '18 Mar 25',
    duration: '1 Day',
    image: require('../../assets/images/ticket.png'),
  },
];

export default function HistoryScreen() {
  const router = useRouter(); // ✅ useRouter hook

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Ionicons name="home-outline" size={22} color="#000" style={{ marginLeft: 8 }} />
        <Text style={styles.headerTitle}>History</Text>
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {historyData.map((item) => (
          <View key={item.id} style={styles.ticketCard}>
            <Image source={item.image} style={styles.ticketImage} />
            <View style={styles.ticketDetails}>
              <View>
                <Text style={styles.gymName}>{item.gymName}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
              <Text style={styles.durationText}>{item.duration}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  ticketCard: {
    marginBottom: 24,
  },
  ticketImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  ticketDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingHorizontal: 6,
  },
  gymName: {
    fontWeight: '700',
    fontSize: 14,
  },
  dateText: {
    marginTop: 4,
    color: '#333',
  },
  durationText: {
    alignSelf: 'flex-start',
    fontSize: 13,
  },
});

