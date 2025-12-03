import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get badge color based on scam type
const getTypeColor = (type) => {
  switch (type) {
    case 'Travel':
      return '#10B981';
    case 'Online':
      return '#3B82F6';
    case 'Financial':
      return '#EF4444';
    case 'Other':
      return '#8B5CF6';
    default:
      return '#6B7280';
  }
};

function ScamDetailScreen({ route, navigation }) {
  const { scam } = route.params;
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    checkIfSaved();
  }, []);

  const checkIfSaved = async () => {
    try {
      const savedScams = await AsyncStorage.getItem('savedScams');
      if (savedScams) {
        const scamsArray = JSON.parse(savedScams);
        const isAlreadySaved = scamsArray.some(s => s.id === scam.id);
        setIsSaved(isAlreadySaved);
      }
    } catch (error) {
      console.log('Error checking saved status:', error);
    }
  };

  const handleSaveScam = async () => {
    try {
      const savedScams = await AsyncStorage.getItem('savedScams');
      let scamsArray = savedScams ? JSON.parse(savedScams) : [];
      
      if (isSaved) {
        // Remove from saved
        scamsArray = scamsArray.filter(s => s.id !== scam.id);
        await AsyncStorage.setItem('savedScams', JSON.stringify(scamsArray));
        setIsSaved(false);
        Alert.alert('Removed', 'Scam removed from your profile');
      } else {
        // Add to saved
        scamsArray.push(scam);
        await AsyncStorage.setItem('savedScams', JSON.stringify(scamsArray));
        setIsSaved(true);
        Alert.alert('Saved', 'Scam saved to your profile');
      }
    } catch (error) {
      console.log('Error saving scam:', error);
      Alert.alert('Error', 'Failed to save scam');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scam Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          
          <View style={[styles.typeBadge, { backgroundColor: getTypeColor(scam.type) }]}>
            <Text style={styles.typeText}>{scam.type}</Text>
          </View>

          <Text style={styles.title}>{scam.title}</Text>

          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Location:</Text>
            <Text style={styles.location}>{scam.location}</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{scam.upvotes || 0}</Text>
              <Text style={styles.statLabel}>Reports</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{scam.date || 'N/A'}</Text>
              <Text style={styles.statLabel}>Date Reported</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{scam.description}</Text>
          </View>

          {scam.reportedBy && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Reported By</Text>
              <Text style={styles.reportedBy}>@{scam.reportedBy}</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How to Avoid</Text>
            <View style={styles.tipContainer}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Research the area or service before traveling</Text>
            </View>
            <View style={styles.tipContainer}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Ask locals or hotel staff for trusted recommendations</Text>
            </View>
            <View style={styles.tipContainer}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Keep copies of important documents separately</Text>
            </View>
            <View style={styles.tipContainer}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Trust your instincts - if something feels wrong, walk away</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.primaryButton, isSaved && styles.savedButton]} 
              onPress={handleSaveScam}
            >
              <Text style={styles.primaryButtonText}>
                {isSaved ? 'Remove from Profile' : 'Save to Profile'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    paddingVertical: 8,
  },
  backText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  typeBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  typeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  locationLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  location: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 8,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#6B7280',
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
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
  },
  reportedBy: {
    fontSize: 15,
    color: '#3B82F6',
    fontWeight: '500',
  },
  tipContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tipBullet: {
    fontSize: 15,
    color: '#6B7280',
    marginRight: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
  },
  actionButtons: {
    marginTop: 8,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  savedButton: {
    backgroundColor: '#10B981',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ScamDetailScreen;
