import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import { defaultStoreImage } from "@/components/Lists/StoreListItem";
import CustomButton from "@/components/Buttons/CustomButton";

const ItemDetails: React.FC = () => {
  const { itemId } = useLocalSearchParams();

  const [item, setItem] = useState<{
    item_id: string;
    item_img: string;
    item_name: string;
    item_description: string;
    price: string;
    quantity: number;
  } | null>(null);

  const router = useRouter(); // Initialize router for navigation

  // Fetch item details from Supabase
  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!itemId) return;

      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("item_id", itemId)
        .single();

      if (error) {
        console.error("Error fetching item details:", error);
        return;
      }

      setItem(data);
    };

    fetchItemDetails();
  }, [itemId]);

  if (!item) {
    return <Text style={styles.loadingText}>Loading...</Text>; // Show a loading state while fetching data
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={{ uri: item.item_img || defaultStoreImage }}
          style={styles.image}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.itemName}>{item.item_name}</Text>
          <Text style={styles.itemDescription}>{item.item_description}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.itemPrice}>${item.price}</Text>
            <Ionicons name="cash-outline" size={24} color="black" />
          </View>
          <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CustomButton
        title="Cart Go"
        handelPress={() => router.push("/cart")}
        containerStyles={{ width: "30%", height: "5%", alignSelf: "center" }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
  },
  detailsContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 1,
  },
  itemName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 5,
  },
  itemQuantity: {
    fontSize: 16,
    marginVertical: 10,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
  },
});

export default ItemDetails;
