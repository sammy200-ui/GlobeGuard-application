import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import BottomNav from "../components/BottomNav";

function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Main content */}
      <View style={styles.mainContent}>
        <Text style={styles.bigText}>User Profile</Text>
        <Text style={styles.smallText}>Login & Saved Scams (Future)</Text>
      </View>
      
      {/* Bottom navigation */}
      <BottomNav navigation={navigation} currentScreen="Profile" />
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

export default ProfileScreen;
