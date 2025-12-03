import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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

const ScamCard = ({ scam, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.headerRow}>
        <View style={[styles.typeBadge, { backgroundColor: getTypeColor(scam.type) }]}>
          <Text style={styles.typeText}>{scam.type}</Text>
        </View>
        {scam.upvotes && (
          <Text style={styles.upvotes}>{scam.upvotes} reports</Text>
        )}
      </View>
      
      <Text style={styles.title}>{scam.title}</Text>
      <Text style={styles.location}>{scam.location}</Text>
      <Text style={styles.description} numberOfLines={2}>{scam.description}</Text>
      
      {scam.date && (
        <Text style={styles.date}>Reported: {scam.date}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  upvotes: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  location: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
});

export default ScamCard;