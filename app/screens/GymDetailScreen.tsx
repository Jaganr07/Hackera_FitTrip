import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const sampleTimeSlots = [
  '6:00 AM - 7:00 AM',
  '7:00 AM - 8:00 AM',
  '8:00 AM - 9:00 AM',
  '5:00 PM - 6:00 PM',
  '6:00 PM - 7:00 PM',
];

export default function GymDetailScreen() {
  const router = useRouter();
  const { gymName } = useLocalSearchParams();

  const [selectedSlot, setSelectedSlot] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleBook = () => {
    if (selectedSlot) {
      console.log(`Booked slot: ${selectedSlot} at ${gymName}`);
      setModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{gymName}</Text>
      </View>

      {/* Time Slots */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Available Time Slots</Text>
        {sampleTimeSlots.map((slot, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.slotCard,
              selectedSlot === slot && { backgroundColor: '#d0ebff' },
            ]}
            onPress={() => setSelectedSlot(slot)}
          >
            <Ionicons name="time-outline" size={20} color="#000" />
            <Text style={styles.slotText}>{slot}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Book Button */}
      {selectedSlot !== '' && (
        <View style={styles.bookContainer}>
          <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
            <Text style={styles.bookButtonText}>Book</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Confirmation Modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={60} color="#4BB543" />
            <Text style={styles.modalTitle}>Slot Booked!</Text>
            <Text style={styles.modalMessage}>
              Your slot at {gymName} for {selectedSlot} is confirmed.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                setSelectedSlot('');
              }}
            >
              <Text style={styles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  slotCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
  },
  slotText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#000',
  },
  bookContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 12,
    color: '#333',
  },
  modalMessage: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
