import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import ScamCard from "../components/ScamCard";
import BottomNav from "../components/BottomNav";
import { scams } from "../data/dummy";

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        
        {/* Header section */}
        <Text style={styles.headerText}>Trending Scams</Text>
        
        {/* List of scam cards */}
        <FlatList
          data={scams}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ScamCard scam={item} />}
          contentContainerStyle={styles.listPadding}
        />
      </View>
      
      {/* Bottom navigation bar */}
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listPadding: {
    paddingBottom: 20,
  },
});

export default HomeScreen;

