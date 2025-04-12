import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Icon package

// Define the structure of place data from Nominatim
type NominatimPlace = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    [key: string]: string;
  };
};

export default function LocationInputScreen() {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState<NominatimPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (location.length > 2) {
        fetchSuggestions(location);
      } else {
        setSuggestions([]);
      }
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [location]);

  const fetchSuggestions = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&addressdetails=1&limit=5`,
        {
          headers: {
            'User-Agent': 'fittripp-app/1.0 (jaganr2005@gmail.com)', // Required by OSM
          },
        }
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (place: NominatimPlace) => {
    setLocation(place.display_name);
    setSuggestions([]);
    // Pass back or persist if needed
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="location-sharp" size={28} color="#ff5a5f" />
        <Text style={styles.title}>Select Location</Text>
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons name="search" size={20} color="#999" style={styles.inputIcon} />
        <TextInput
          placeholder="Search city or address"
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />
      </View>

      {loading && <ActivityIndicator size="small" color="#888" style={styles.loader} />}

      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSelect(item)}>
            <Ionicons name="location-outline" size={20} color="#666" style={{ marginRight: 10 }} />
            <Text style={styles.suggestionText}>{item.display_name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  loader: {
    marginVertical: 10,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  suggestionText: {
    flex: 1,
    fontSize: 15,
    color: '#444',
  },
});
