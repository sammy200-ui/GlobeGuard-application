import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from "../components/BottomNav";
import client from "../api/client";
import { AuthContext } from "../context/AuthContext";

function ReportScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [scamType, setScamType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const scamTypes = ["Travel", "Online", "Financial", "Other"];

  const { userToken, userInfo } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!userToken) {
      Alert.alert("Login Required", "You must be logged in to submit a report.", [
        { text: "Cancel", style: "cancel" },
        { text: "Login", onPress: () => navigation.navigate("Login") }
      ]);
      return;
    }

    if (!title.trim()) {
      Alert.alert("Missing Information", "Please enter a title for the scam");
      return;
    }
    if (!scamType) {
      Alert.alert("Missing Information", "Please select a scam type");
      return;
    }
    if (!location.trim()) {
      Alert.alert("Missing Information", "Please enter a location");
      return;
    }
    if (!description.trim()) {
      Alert.alert("Missing Information", "Please provide a description");
      return;
    }

    try {
      await client.post('/reports', {
        title: title.trim(),
        type: scamType,
        location: location.trim(),
        description: description.trim(),
        userId: userInfo.id
      }, {
        headers: { Authorization: `Bearer ${userToken}` }
      });

      Alert.alert(
        "Report Submitted",
        "Thank you for reporting this scam. Your report will help protect others in the community.",
        [
          {
            text: "OK",
            onPress: () => {
              setTitle("");
              setScamType("");
              setLocation("");
              setDescription("");
              navigation.navigate("Home");
            }
          }
        ]
      );
    } catch (error) {
      console.log('Error submitting report:', error);
      Alert.alert('Error', 'Failed to submit report. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Report a Scam</Text>
          <Text style={styles.subHeaderText}>Help others stay safe by sharing your experience</Text>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Scam Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Fake Taxi Overcharging"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Scam Type *</Text>
            <View style={styles.typeContainer}>
              {scamTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    scamType === type && styles.typeButtonSelected
                  ]}
                  onPress={() => setScamType(type)}
                >
                  <Text style={[
                    styles.typeButtonText,
                    scamType === type && styles.typeButtonTextSelected
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Bangkok, Thailand"
              value={location}
              onChangeText={setLocation}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe what happened, how the scam works, and any details that might help others avoid it..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              placeholderTextColor="#9CA3AF"
            />
            <Text style={styles.charCount}>{description.length} / 500</Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Report</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>

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
    marginBottom: 4,
  },
  subHeaderText: {
    fontSize: 14,
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textArea: {
    minHeight: 120,
    paddingTop: 12,
  },
  charCount: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
    marginTop: 4,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  typeButtonSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  typeButtonTextSelected: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  cancelButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReportScreen;


