import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import ScamCard from "../components/ScamCard";
import BottomNav from "../components/BottomNav";
import { scams } from "../data/dummy";

function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredScams = scams.filter((scam) => {
    return scam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scam.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scam.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const sortedScams = [...filteredScams].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        
        <View style={styles.header}>
          <Text style={styles.headerText}>Trending Scams</Text>
          <Text style={styles.subHeaderText}>Stay informed about the latest scams worldwide</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search scams by title, location..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.resultsContainer}>
          <Text style={styles.resultsText}>
            {sortedScams.length} scam{sortedScams.length !== 1 ? 's' : ''} found
          </Text>
        </View>
        
        <FlatList
          data={sortedScams}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ScamCard 
              scam={item} 
              onPress={() => navigation.navigate('ScamDetail', { scam: item })}
            />
          )}
          contentContainerStyle={styles.listPadding}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No scams found matching your criteria</Text>
            </View>
          }
        />
      </View>
      
      <BottomNav navigation={navigation} currentScreen="Home" />
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
  resultsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  resultsText: {
    fontSize: 13,
    color: '#6B7280',
  },
  listPadding: {
    paddingBottom: 20,
    paddingTop: 8,
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
});

export default HomeScreen;

