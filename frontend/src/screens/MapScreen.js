import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from "../components/BottomNav";
import ScamCard from "../components/ScamCard";
import { scams } from "../data/dummy";

function MapScreen({ navigation }) {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [...new Set(scams.map(scam => scam.location))].sort();

  const filteredLocations = locations.filter(location => 
    location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  const scamsInLocation = selectedLocation 
    ? scams.filter(scam => scam.location === selectedLocation)
    : [];

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setSearchLocation("");
  };

  const handleReset = () => {
    setSelectedLocation(null);
    setSearchLocation("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        
        <View style={styles.header}>
          <Text style={styles.headerText}>Search by Location</Text>
          <Text style={styles.subHeaderText}>Find scams reported in specific areas</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a city or country..."
            value={searchLocation}
            onChangeText={setSearchLocation}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {!selectedLocation ? (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>
              {searchLocation ? 'Matching Locations' : 'All Locations'}
            </Text>
            <FlatList
              data={filteredLocations}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.locationItem}
                  onPress={() => handleLocationSelect(item)}
                >
                  <View style={styles.locationIcon}>
                    <Text style={styles.locationIconText}>📍</Text>
                  </View>
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationName}>{item}</Text>
                    <Text style={styles.locationCount}>
                      {scams.filter(s => s.location === item).length} scam(s) reported
                    </Text>
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.listContainer}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No locations found</Text>
                </View>
              }
            />
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.selectedLocationHeader}>
              <View>
                <Text style={styles.selectedLocationTitle}>{selectedLocation}</Text>
                <Text style={styles.selectedLocationSubtitle}>
                  {scamsInLocation.length} scam(s) reported
                </Text>
              </View>
              <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={scamsInLocation}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ScamCard 
                  scam={item} 
                  onPress={() => navigation.navigate('ScamDetail', { scam: item })}
                />
              )}
              contentContainerStyle={styles.scamListContainer}
            />
          </View>
        )}
      </View>
      
      <BottomNav navigation={navigation} currentScreen="Map" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5',
  },
  mainContent: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subHeaderText: {
    fontSize: 14,
    color: '#6B7280',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  searchInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1F2937',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
  },
  listContainer: {
    paddingBottom: 20,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationIconText: {
    fontSize: 20,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  locationCount: {
    fontSize: 13,
    color: '#6B7280',
  },
  chevron: {
    fontSize: 24,
    color: '#D1D5DB',
    fontWeight: '300',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  selectedLocationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#EEF2FF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  selectedLocationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  selectedLocationSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  resetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  scamListContainer: {
    paddingTop: 8,
    paddingBottom: 20,
  },
});

export default MapScreen;


