import { useStoreItems } from "@/api/items";
import { useStoreById } from "@/api/stores";
import CustomButton from "@/components/Buttons/CustomButton";
import ItemCard from "@/components/Cards/ItemCard";
import CustomHeader from "@/components/CustomHeader";
import RemoteImage from "@/components/image/RemoteImage";
import { defaultStoreImage } from "@/components/Lists/StoreListItem";
import SearchBar from "@/components/SearchBar";
import { useSearch } from "@/hooks/useSearch";
import { ValidSegments } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Href, router, useLocalSearchParams, useSegments } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const StoreItemsScreen = () => {
  const { storeId } = useLocalSearchParams();
  const storeIdString = Array.isArray(storeId) ? storeId[0] : storeId;

  const {
    data: store,
    error: storeError,
    isLoading: storeLoading,
  } = useStoreById(storeIdString);

  const {
    data: items = [],
    error: itemsError,
    isLoading: itemsLoading,
  } = useStoreItems(storeIdString);

  const segment = useSegments();
  const segmentOne = segment[0] as ValidSegments;

  const {
    searchQuery,
    suggestions,
    handleSearch,
    handleSuggestionSelect,
    filteredData: filteredItems,
  } = useSearch(items, "item_name");

  if (storeLoading || itemsLoading) {
    return <ActivityIndicator />;
  }

  if (storeError || itemsError) {
    return <Text>Failed to fetch store details or items</Text>;
  }

  // Safely accessing store properties
  const storeIdToUse = store?.store_id;
  const storeName = store?.store_name;

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        rightIconName="menu"
        onRightIconPress={() =>
          router.push(
            `/${segmentOne}/store/storeDetails/${storeIdToUse}` as Href
          )
        }
        HeaderText={storeName || "Store Name"} // Fallback text
      />
      <SearchBar
        onSearch={handleSearch}
        suggestions={suggestions}
        onSuggestionSelect={handleSuggestionSelect}
      />

      <View style={styles.imageContainer}>
        <RemoteImage
          fallback={defaultStoreImage}
          path={store?.store_logo}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.iconContainer}>
          <Ionicons name="timer" size={24} color="black" />
          <Text style={styles.iconText}>{store?.delivery_time || "N/A"}</Text>
          <Ionicons name="cash" size={24} color="black" />
          <Text style={styles.iconText}>${store?.delivery_price || "N/A"}</Text>
        </View>
      </View>

      {items.length === 0 ? (
        <Text>No items available in this store</Text>
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={({ item }) => <ItemCard item={item} />}
          keyExtractor={(item) => item.item_id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <CustomButton
        title="Cart Go"
        handelPress={() => router.push("/cart")}
        containerStyles={{ width: "30%", height: "5%", alignSelf: "center" }}
      />
    </SafeAreaView>
  );
};

export default StoreItemsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 100,
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: "50%",
  },
  iconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 5,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    marginLeft: 5,
    marginRight: 10,
    fontSize: 12,
    color: "#555",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    alignSelf: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
});
