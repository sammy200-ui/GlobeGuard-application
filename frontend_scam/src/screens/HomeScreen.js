import React from "react";
import { View, FlatList } from "react-native";
import ScamCard from "../components/ScamCard";
import { scams } from "../data/dummy";

export default function HomeScreen() {
  return (
    <View>
      <FlatList
        data={scams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ScamCard scam={item} />}
      />
    </View>
  );
}
