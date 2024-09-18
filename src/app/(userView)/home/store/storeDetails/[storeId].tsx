import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useStoreById } from "@/api/stores";

const StoreDetailsScreen = () => {
  const { storeId } = useLocalSearchParams(); // Retrieves the storeId from the route parameters
  const storeIdString = Array.isArray(storeId) ? storeId[0] : storeId; // Ensure storeId is a string

  const { data: store, error, isLoading } = useStoreById(storeIdString); // Fetch store details based on storeId

  return (
    <SafeAreaView>
      <Text>{store?.store_name}</Text>
      <Text>Store StoreDetailsScreen</Text>
    </SafeAreaView>
  );
};

export default StoreDetailsScreen;

const styles = StyleSheet.create({});
