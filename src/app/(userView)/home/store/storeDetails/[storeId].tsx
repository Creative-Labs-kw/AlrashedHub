import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useStoreById } from "@/api/stores";
import { defaultStoreImage } from "@/components/Lists/StoreListItem";

const StoreDetailsScreen = () => {
  const { storeId } = useLocalSearchParams(); // Retrieves the storeId from the route parameters
  const storeIdString = Array.isArray(storeId) ? storeId[0] : storeId; // Ensure storeId is a string

  const { data: store, error, isLoading } = useStoreById(storeIdString); // Fetch store details based on storeId

  if (isLoading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Failed to fetch store details</Text>;
  }

  const handleInstagramPress = () => {
    if (store?.instagram_url) {
      Linking.openURL(store.instagram_url).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: store?.store_logo || defaultStoreImage }}
            style={styles.storeImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.storeName}>{store?.store_name || "N/A"}</Text>
        <Text style={styles.description}>
          {store?.store_description || "No description available"}
        </Text>
        <Text style={styles.deliveryTime}>
          Delivery Time: {store?.delivery_time || "N/A"}
        </Text>
        <Text style={styles.deliveryPrice}>
          Delivery Price: ${store?.delivery_price || "N/A"}
        </Text>
        <Text style={styles.phoneNumber}>
          Phone: {store?.phone_number || "N/A"}
        </Text>
        {store?.instagram_url && (
          <TouchableOpacity onPress={handleInstagramPress}>
            <Text style={styles.instagram}>
              Instagram: <Text style={styles.link}>{store.instagram_url}</Text>
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StoreDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 16,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  storeImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  storeName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  deliveryTime: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  deliveryPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 8,
  },
  phoneNumber: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  instagram: {
    fontSize: 16,
    color: "#555",
  },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
});
