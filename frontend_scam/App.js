import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import all screens
import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";
import ReportScreen from "./src/screens/ReportScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // hide the top header and back button
        }}
      >
        {/* Home screen with scam list */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
        />
        
        {/* Map screen for location-based scams */}
        <Stack.Screen 
          name="Map" 
          component={MapScreen}
        />
        
        {/* Report screen to submit new scams */}
        <Stack.Screen 
          name="Report" 
          component={ReportScreen}
        />
        
        {/* Profile screen for user info */}
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
