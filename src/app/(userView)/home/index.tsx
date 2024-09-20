import { useStoreList } from "@/api/stores";
import { StoreListItem } from "@/components/Lists/StoreListItem";
import { useLocation } from "@/hooks/useLocation";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomHeader from "@/components/CustomHeader";
import SearchBar from "@/components/SearchBar";
import { router } from "expo-router";
import { useSearch } from "@/hooks/useSearch"; // Import the custom hook

const HomeScreen = () => {
  const { location, errorMsg } = useLocation();
  const { data: stores, error, isLoading } = useStoreList();

  const {
    searchQuery,
    suggestions,
    handleSearch,
    handleSuggestionSelect,
    filteredData: filteredStores,
  } = useSearch(stores, "store_name");

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch Products</Text>;
  }

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
