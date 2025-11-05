import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import BottomNav from "../components/BottomNav";

function ReportScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Main content */}
      <View style={styles.mainContent}>
        <Text style={styles.bigText}>Report a scam</Text>
        <Text style={styles.smallText}>Form coming soon...</Text>
      </View>
      
      {/* Bottom navigation */}
      <BottomNav navigation={navigation} currentScreen="Report" />
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

export default ReportScreen;


