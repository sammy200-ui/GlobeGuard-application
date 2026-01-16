import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function BottomNav({ navigation, currentScreen }) {

  const getIcon = (screenName, focused) => {
    let iconName;
    switch (screenName) {
      case 'Home':
        iconName = focused ? 'home' : 'home-outline';
        break;
      case 'Map':
        iconName = focused ? 'map' : 'map-outline';
        break;
      case 'Report':
        iconName = focused ? 'add-circle' : 'add-circle-outline';
        break;
      case 'Profile':
        iconName = focused ? 'person' : 'person-outline';
        break;
      default:
        iconName = 'help-circle-outline';
    }
    return iconName;
  };

  const NavItem = ({ name, label }) => {
    const isFocused = currentScreen === name;
    return (
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate(name)}
      >
        <Ionicons
          name={getIcon(name, isFocused)}
          size={24}
          color={isFocused ? '#4338ca' : '#78716c'}
        />
        <Text style={[styles.navText, { color: isFocused ? '#4338ca' : '#78716c' }]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.bottomBar}>
      <NavItem name="Home" label="Home" />
      <NavItem name="Map" label="Map" />
      <NavItem name="Report" label="Report" />
      <NavItem name="Profile" label="Profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e7e5e4',
    paddingTop: 12,
    paddingBottom: 28, // Extra padding for iPhone home indicator
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
});

export default BottomNav;
