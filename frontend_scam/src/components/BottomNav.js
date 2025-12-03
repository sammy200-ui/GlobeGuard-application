import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function BottomNav({ navigation, currentScreen }) {

  return (
    <View style={styles.bottomBar}>
      
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={currentScreen === 'Home' ? styles.activeText : styles.normalText}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate('Map')}
      >
        <Text style={currentScreen === 'Map' ? styles.activeText : styles.normalText}>
          Map
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate('Report')}
      >
        <Text style={currentScreen === 'Report' ? styles.activeText : styles.normalText}>
          Report
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={currentScreen === 'Profile' ? styles.activeText : styles.normalText}>
          Profile
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
    paddingBottom: 25,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  normalText: {
    fontSize: 14,
    color: '#888',
  },
  activeText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default BottomNav;
