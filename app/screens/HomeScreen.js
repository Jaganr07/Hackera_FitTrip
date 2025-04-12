import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import * as Location from 'expo-location';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const gyms = [
  { id: '1', name: 'Slam Fitness center', rating: 5.0, image: require('../../assets/images/gym1.png'), crorable: true },
  { id: '2', name: 'Iron House Gym', rating: 4.8, image: require('../../assets/images/gym2.png'), crorable: false },
  { id: '3', name: 'Muscle Factory', rating: 4.9, image: require('../../assets/images/gym3.png'), crorable: true },
  { id: '4', name: 'Beast Mode Fitness', rating: 4.7, image: require('../../assets/images/gym4.png'), crorable: false },
  { id: '5', name: 'Titan Gym Pro', rating: 5.0, image: require('../../assets/images/gym5.png'), crorable: true },
];

export default function HomeScreen() {
  const [address, setAddress] = useState('Fetching location...');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  const fetchCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setAddress('Permission Denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let reverseGeocode = await Location.reverseGeocodeAsync(location.coords);

    if (reverseGeocode.length > 0) {
      const { name, district, city } = reverseGeocode[0];
      setAddress(`${name}, ${district}, ${city}`);
    }
  };

  const filteredGyms = gyms.filter((gym) =>
    gym.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <TouchableOpacity style={styles.header} onPress={() => setModalVisible(true)}>
          <Ionicons name="home-outline" size={22} color="#000" />
          <Text style={styles.locationText} numberOfLines={1}>
            {address}
          </Text>
          <Ionicons name="chevron-down" size={16} color="#000" />
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Where to workout ?"
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        {/* Gym Cards */}
        <FlatList
          data={filteredGyms}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({ pathname: '/screens/GymDetailScreen', params: { gymId: item.id } })
              }
            >
              <View style={styles.card}>
                <Image source={item.image} style={styles.cardImage} />
                <View style={styles.cardFooter}>
                  <View style={styles.nameRow}>
                    <Text style={styles.gymName}>{item.name}</Text>
                    {item.crorable && (
                      <FontAwesome5 name="crown" size={16} color="#f5c518" style={styles.crownIcon} />
                    )}
                  </View>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>⭐ {item.rating}</Text>
                    <MaterialIcons name="more-vert" size={18} color="#555" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Location Modal */}
        <Modal transparent visible={modalVisible} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Set Location</Text>
              <Text style={styles.modalSubtitle}>Choose an option</Text>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  fetchCurrentLocation();
                }}
              >
                <Text style={styles.modalButtonText}>USE CURRENT LOCATION</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  router.push('/screens/LocationInputScreen');
                }}
              >
                <Text style={styles.modalButtonText}>ENTER MANUALLY</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={[styles.modalButtonText, { color: '#999', marginTop: 10 }]}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Bottom Tab */}
        <View style={styles.bottomTab}>
          <TabIcon name="home" label="Home" onPress={() => router.push('/screens/HomeScreen')} />
          <TabIcon name="calendar-outline" label="Bookings" onPress={() => router.push('/screens/BookingScreen')} />
          <TabIcon name="person-outline" label="Profile" onPress={() => router.push('/screens/ProfileScreen')} />
          <TabIcon name="time-outline" label="History" onPress={() => router.push('/screens/HistoryScreen')} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

function TabIcon({ name, label, onPress }) {
  return (
    <TouchableOpacity style={styles.tabItem} onPress={onPress}>
      <Ionicons name={name} size={22} color="#000" />
      <Text style={styles.tabLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  card: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  gymName: {
    fontSize: 16,
    fontWeight: '600',
  },
  crownIcon: {
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 14,
    color: '#000',
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  modalButton: {
    paddingVertical: 12,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
});
