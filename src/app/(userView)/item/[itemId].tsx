import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/context/CartProvider";
import { supabase } from "@/lib/supabase";
import { router, useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/Buttons/CustomButton";
import { defaultStoreImage } from "@/components/Lists/StoreListItem";
import { Item } from "@/types";

const ItemDetails: React.FC = () => {
  const { itemId } = useLocalSearchParams();
  const [item, setItem] = useState<Item | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { AddItemToCart } = useCart();

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        if (!itemId) return;

        const { data, error } = await supabase
          .from("items")
          .select("*")
          .eq("item_id", itemId)
          .single();

        if (error || !data) {
          throw error || new Error("No item found");
        }

        // Ensure the data matches the Item type
        const fetchedItem: Item = {
          item_id: data.item_id,
          item_img: data.item_img || defaultStoreImage,
          item_name: data.item_name,
          item_description: data.item_description || "No description available",
          price: data.price,
          quantity: data.quantity ?? 1,
          store_id: data.store_id || null,
          created_at: data.created_at || null, // Adjust based on your data structure
          updated_at: data.updated_at || null, // Adjust based on your data structure
        };

        setItem(fetchedItem);
      } catch (error) {
        console.error("Error fetching item details:", error);
        setError("Failed to load item details.");
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (!item) {
    return <Text style={styles.loadingText}>Item not found</Text>;
  }

  const handleIncrease = () => {
    if (item.quantity !== null && quantity < (item.quantity || 1)) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (!item) return;

    AddItemToCart({
      ...item,
      quantity,
      created_at: null, // Set defaults as necessary
      updated_at: null, // Set defaults as necessary
    });

    router.push(`/(userView)/cart`);
  };

  const totalPrice = (item.price * quantity).toFixed(2);

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
            <Text style={styles.itemPrice}>Total: ${totalPrice}</Text>
            <Ionicons name="cash-outline" size={24} color="black" />
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={handleDecrease}
              disabled={quantity === 1}
              style={styles.iconButton}
            >
              <Ionicons name="remove-circle-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              onPress={handleIncrease}
              disabled={quantity >= (item.quantity || 1)} // Fallback to 1
              style={styles.iconButton}
            >
              <Ionicons name="add-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <CustomButton
            handelPress={handleAddToCart}
            title="Add to Cart"
            containerStyles={styles.button}
          />
          <CustomButton
            handelPress={() => router.back()}
            title="Back button"
            containerStyles={styles.backButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  detailsContainer: {
    alignItems: "center",
  },
  itemName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  itemPrice: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quantity: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  iconButton: {
    padding: 5,
  },
  button: {
    marginTop: 20,
    width: "100%",
  },
  backButton: {
    marginTop: 20,
    width: "100%",
    color: "red",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    color: "red",
  },
});

export default ItemDetails;
