import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import BottomNav from "../components/BottomNav";
import ScamCard from "../components/ScamCard";

function ProfileScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [savedScams, setSavedScams] = useState([]);
  const [userReports, setUserReports] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadSavedScams();
      loadUserReports();
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

  const loadUserReports = async () => {
    try {
      const reports = await AsyncStorage.getItem('userReports');
      if (reports) {
        setUserReports(JSON.parse(reports));
      } else {
        setUserReports([]);
      }
    } catch (error) {
      console.log('Error loading user reports:', error);
      setUserReports([]);
    }
  };

  const userData = {
    name: "Sameer Pawar",
    username: "sameer_2024",
    joinDate: "November 2024",
    reportsSubmitted: userReports.length,
    scamsSaved: savedScams.length,
    helpfulVotes: 12,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          
          <View style={styles.userCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userData.name.charAt(0)}</Text>
            </View>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userHandle}>@{userData.username}</Text>
            <Text style={styles.joinDate}>Member since {userData.joinDate}</Text>
          </View>

          <View style={styles.statsSection}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{userData.reportsSubmitted}</Text>
              <Text style={styles.statLabel}>Reports Submitted</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{userData.scamsSaved}</Text>
              <Text style={styles.statLabel}>Scams Saved</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{userData.helpfulVotes}</Text>
              <Text style={styles.statLabel}>Helpful Votes</Text>
            </View>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === "overview" && styles.tabActive]}
              onPress={() => setActiveTab("overview")}
            >
              <Text style={[styles.tabText, activeTab === "overview" && styles.tabTextActive]}>
                Overview
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === "saved" && styles.tabActive]}
              onPress={() => setActiveTab("saved")}
            >
              <Text style={[styles.tabText, activeTab === "saved" && styles.tabTextActive]}>
                Saved Scams
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === "overview" ? (
            <View style={styles.tabContent}>
              
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Your Submitted Reports</Text>
                {userReports.length === 0 ? (
                  <View style={styles.emptyActivity}>
                    <Text style={styles.emptyActivityText}>No reports submitted yet</Text>
                    <Text style={styles.emptyActivitySubtext}>
                      Use the Report tab to submit your first scam report
                    </Text>
                  </View>
                ) : (
                  userReports.slice(0, 5).map((report, index) => (
                    <View key={report.id} style={styles.activityItem}>
                      <View style={styles.activityDot} />
                      <View style={styles.activityContent}>
                        <Text style={styles.activityText}>Reported: {report.title}</Text>
                        <Text style={styles.activityLocation}>{report.location}</Text>
                        <Text style={styles.activityDate}>{report.date}</Text>
                      </View>
                    </View>
                  ))
                )}
              </View>

            </View>
          ) : (
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
          )}

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
});

export default ProfileScreen;
