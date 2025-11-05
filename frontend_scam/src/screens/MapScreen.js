import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import BottomNav from "../components/BottomNav";

function MapScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Main content area */}
      <View style={styles.mainContent}>
        <Text style={styles.bigText}>Map will be shown here</Text>
        <Text style={styles.smallText}>Search scams by location</Text>
      </View>
      
      {/* Bottom navigation */}
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
    justifyContent: "center", 
    alignItems: "center",
  },
  bigText: { 
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  smallText: {
    fontSize: 14,
    color: '#666',
  },
});

export default MapScreen;


