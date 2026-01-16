import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import BottomNav from "../components/BottomNav";
import ScamCard from "../components/ScamCard";
import { AuthContext } from "../context/AuthContext";

function ProfileScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [savedScams, setSavedScams] = useState([]);
  const { userInfo, userToken, logout } = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      loadSavedScams();
    }, [])
  );

  const loadSavedScams = async () => {
    try {
      const saved = await AsyncStorage.getItem('savedScams');
      if (saved) {
        setSavedScams(JSON.parse(saved));
      } else {
        setSavedScams([]);
      }
    } catch (error) {
      console.log('Error loading saved scams:', error);
      setSavedScams([]);
    }
  };

  if (!userToken) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Profile</Text>
          </View>
          <View style={styles.guestContainer}>
            <Text style={styles.guestTitle}>Welcome to GlobeGuard</Text>
            <Text style={styles.guestSubtitle}>
              Sign in to track your reports and save scams for later.
            </Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.registerButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
        <BottomNav navigation={navigation} currentScreen="Profile" />
      </SafeAreaView>
    );
  }

  const userData = {
    name: userInfo?.name || "User",
    username: userInfo?.email || "user@example.com",
    joinDate: "Member",
    reportsSubmitted: 0, // Placeholder
    scamsSaved: savedScams.length,
    helpfulVotes: 0,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>

          <View style={styles.userCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userData.name.charAt(0)}</Text>
            </View>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userHandle}>{userData.username}</Text>
            <Text style={styles.joinDate}>{userData.joinDate}</Text>
          </View>

          <View style={styles.statsSection}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{userData.reportsSubmitted}</Text>
              <Text style={styles.statLabel}>Reports</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{userData.scamsSaved}</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{userData.helpfulVotes}</Text>
              <Text style={styles.statLabel}>Votes</Text>
            </View>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "overview" && styles.tabActive]}
              onPress={() => setActiveTab("overview")}
            >
              <Text style={[styles.tabText, activeTab === "overview" && styles.tabTextActive]}>
                Saved Scams
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabContent}>
            <Text style={styles.savedScamsHeader}>
              You have saved {savedScams.length} scam(s) for reference
            </Text>
            {savedScams.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No saved scams yet</Text>
                <Text style={styles.emptyStateSubtext}>
                  Tap "Save to Profile" on any scam detail page to save it here
                </Text>
              </View>
            ) : (
              savedScams.map((scam) => (
                <ScamCard
                  key={scam.id}
                  scam={scam}
                  onPress={() => navigation.navigate('ScamDetail', { scam })}
                />
              ))
            )}
          </View>

        </ScrollView>
      </View>

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
  },
  scrollView: {
    flex: 1,
  },
  userCard: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userHandle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#3B82F6',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  tabContent: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginTop: 6,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 2,
    fontWeight: '500',
  },
  activityLocation: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  emptyActivity: {
    padding: 20,
    alignItems: 'center',
  },
  emptyActivityText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  emptyActivitySubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  savedScamsHeader: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
  guestContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  guestSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
  },
  registerButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    position: 'absolute',
    right: 16,
    top: 20,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
