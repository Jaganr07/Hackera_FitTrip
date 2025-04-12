// app/screens/BookingsScreen.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const bookings = [
  {
    id: '1',
    name: 'Slam Fitness Center',
    date: '15 Apr 25',
    duration: '1 Day',
  },
  {
    id: '2',
    name: 'FIKA Fitness Center',
    date: '27 May 25',
    duration: '2 Day',
  },
];

export default function BookingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Ionicons name="calendar-outline" size={22} color="#000" style={{ marginLeft: 12 }} />
        <Text style={styles.headerText}>Bookings</Text>
      </View>

      {/* Bookings List */}
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={require('../../assets/images/ticket.png')} // use your ticket icon here
              style={styles.ticketIcon}
              resizeMode="contain"
            />
            <View style={styles.cardDetails}>
              <Text style={styles.gymName}>{item.name}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <Text style={styles.duration}>{item.duration}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  ticketIcon: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  cardDetails: {
    flex: 1,
  },
  gymName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  duration: {
    fontSize: 14,
    fontWeight: '500',
  },
});
