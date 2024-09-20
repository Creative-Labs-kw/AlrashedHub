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

        if (error) {
          throw error;
        }

        setItem(data);
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

  const itemPrice = parseFloat(item.price);

  const handleIncrease = () => {
    if (quantity < item.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    AddItemToCart({ ...item, quantity }); // Pass quantity
    router.push(`/(userView)/cart`);
  };

  const totalPrice = (itemPrice * quantity).toFixed(2);

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
              disabled={quantity >= item.quantity}
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
            handelPress={() => {
              router.back();
            }}
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
