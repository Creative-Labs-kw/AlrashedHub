import { useStoreList } from "@/api/stores";
import { StoreListItem } from "@/components/Lists/StoreListItem";
import { useLocation } from "@/hooks/useLocation";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import CustomHeader from "@/components/CustomHeader.tsx";
import SearchBar from "@/components/SearchBar";
import { router } from "expo-router";

const HomeScreen = () => {
  const { location, errorMsg } = useLocation();
  const { data: stores, error, isLoading } = useStoreList();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch Products</Text>;
  }

  // Filter stores based on search query
  const filteredStores = (stores || []).filter((store) =>
    store.store_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate suggestions based on the search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
    if (lowerCaseQuery.length > 0 && stores) {
      // Check if stores is defined
      const newSuggestions = stores
        .filter((store) =>
          store.store_name.toLowerCase().includes(lowerCaseQuery)
        )
        .map((store) => store.store_name);
      setSuggestions(Array.from(new Set(newSuggestions))); // Remove duplicates
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomHeader
          title="Store Menu"
          location={errorMsg ? errorMsg : location}
          rightIconName="cart"
          onRightIconPress={() => router.push("/cart")}
        />
        <SearchBar
          onSearch={handleSearch}
          suggestions={suggestions}
          onSuggestionSelect={handleSuggestionSelect}
        />
      </View>
      <FlatList
        data={filteredStores}
        renderItem={({ item }) => <StoreListItem store={item} />}
        keyExtractor={(item) => `${item.id}-${item.store_name}`}
        contentContainerStyle={{ padding: 5 }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  headerContainer: {
    marginBottom: 10,
  },
});
