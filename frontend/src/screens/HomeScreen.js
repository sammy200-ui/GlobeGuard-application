import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScamCard from "../components/ScamCard";
import BottomNav from "../components/BottomNav";
import client from "../api/client";
import { COLORS, SPACING, SHADOWS } from "../theme";

const CATEGORIES = ["All", "Online", "Travel", "Financial", "Shopping", "Other"];

function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [scams, setScams] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchScams = async () => {
    try {
      setLoading(true);
      const response = await client.get('/reports');
      setScams(response.data);
    } catch (error) {
      console.log('Error fetching scams:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScams();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchScams();
    });
    return unsubscribe;
  }, [navigation]);

  const filteredScams = scams.filter((scam) => {
    const matchesSearch =
      (scam.title && scam.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (scam.location && scam.location.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || scam.type === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedScams = [...filteredScams].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Safety First!</Text>
          <Text style={styles.headerTitle}>Stay Ahead of Scams</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search scams, locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryPill,
              selectedCategory === cat && styles.categoryPillActive
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === cat && styles.categoryTextActive
            ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Recent Reports</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <FlatList
            data={sortedScams}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={renderHeader}
            renderItem={({ item }) => (
              <ScamCard
                scam={item}
                onPress={() => navigation.navigate('ScamDetail', { scam: item })}
              />
            )}
            contentContainerStyle={styles.listPadding}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="search-outline" size={48} color={COLORS.textSecondary} />
                <Text style={styles.emptyText}>No scams found</Text>
                <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
              </View>
            }
          />
        )}
      </View>
      <BottomNav navigation={navigation} currentScreen="Home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mainContent: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.m,
    paddingTop: SPACING.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
  },
  profileButton: {
    padding: SPACING.s,
    backgroundColor: COLORS.card,
    borderRadius: 50,
    ...SHADOWS.sm,
  },
  searchContainer: {
    marginTop: SPACING.m,
    marginHorizontal: SPACING.m,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: SPACING.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  searchIcon: {
    marginRight: SPACING.s,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.text,
  },
  categoryContainer: {
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.m,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.card,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    ...SHADOWS.md,
  },
  categoryText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
    fontSize: 14,
  },
  categoryTextActive: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginLeft: SPACING.m,
    marginBottom: SPACING.s,
  },
  listPadding: {
    paddingBottom: 80,
  },
  emptyContainer: {
    padding: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;

