import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";
import ReportScreen from "./src/screens/ReportScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ScamDetailScreen from "./src/screens/ScamDetailScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import { AuthProvider } from "./src/context/AuthContext";

const Stack = createStackNavigator();

function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="Report" component={ReportScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />

            <Stack.Screen
              name="ScamDetail"
              component={ScamDetailScreen}
              options={{ headerShown: true, title: 'Scam Details', headerBackTitleVisible: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: true, title: '', headerTransparent: true, headerBackTitleVisible: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: true, title: '', headerTransparent: true, headerBackTitleVisible: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

export default App;
