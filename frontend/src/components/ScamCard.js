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
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#4338ca', // Indigo shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e7e5e4', // Stone-200
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  upvotes: {
    fontSize: 13,
    color: '#78716c', // Stone-500
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1c1917', // Stone-900
    marginBottom: 6,
    lineHeight: 24,
  },
  location: {
    fontSize: 14,
    color: '#57534e', // Stone-600
    marginBottom: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 15,
    color: '#44403c', // Stone-700
    lineHeight: 22,
    marginBottom: 12,
  },
  date: {
    fontSize: 12,
    color: '#a8a29e', // Stone-400
    marginTop: 4,
    fontStyle: 'italic',
  },
});

export default ScamCard;