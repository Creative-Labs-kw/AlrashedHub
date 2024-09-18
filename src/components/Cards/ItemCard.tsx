import { Ionicons } from "@expo/vector-icons";
import { useRouter, useSegments } from "expo-router"; // Import useRouter for navigation
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { defaultStoreImage } from "../Lists/StoreListItem";

interface ItemCardProps {
  item: {
    item_id: string;
    item_img: string;
    item_name: string;
    item_description: string;
    price: string;
    quantity: number;
  };
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const segments = useSegments();
  const router = useRouter(); // Initialize router for navigation

  // Update total price whenever the quantity changes
  useEffect(() => {
    const priceNumber = parseFloat(item.price);
    setTotalPrice(quantity * priceNumber);
  }, [quantity, item.price]);

  // Handle increasing the quantity
  const handleIncrease = () => {
    if (quantity < item.quantity) {
      setQuantity(quantity + 1);
    }
  };

  // Handle decreasing the quantity
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  // Navigate to the item details screen
  const handlePress = () => {
    router.push(`${segments[0]}/home/item/${item.item_id}`); // Navigate to ItemDetails screen
  };

  return (
    <View
      style={[
        styles.container,
        item.quantity === 0 && styles.disabledContainer,
      ]}
    >
      <TouchableOpacity onPress={handlePress} style={styles.touchableArea}>
        <Image
          source={{ uri: item.item_img || defaultStoreImage }}
          style={styles.image}
        />
        <View style={styles.detailsContainer}>
          <Text
            style={[
              styles.itemName,
              item.quantity === 0 && styles.disabledText,
            ]}
          >
            {item.item_name}
          </Text>
          <View style={styles.priceContainer}>
            <Text
              style={[
                styles.itemPrice,
                item.quantity === 0 && styles.disabledText,
              ]}
            >
              ${totalPrice.toFixed(2)}
            </Text>
            <Ionicons
              name="cash-outline"
              size={24}
              color={item.quantity === 0 ? "#ccc" : "black"}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={handleDecrease}
          disabled={quantity === 0}
          style={styles.iconButton}
        >
          <Ionicons
            name="remove-circle-outline"
            size={24}
            color={quantity === 0 ? "#ccc" : "black"}
          />
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity
          onPress={handleIncrease}
          disabled={quantity >= item.quantity}
          style={styles.iconButton}
        >
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={quantity >= item.quantity ? "#ccc" : "black"}
          />
        </TouchableOpacity>
      </View>
      {item.quantity === 0 && (
        <View style={styles.comingSoonOverlay}>
          <Text style={styles.comingSoonText}>Coming Soon</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 10,
    padding: 5,
    elevation: 1,
    alignItems: "center",
  },
  disabledContainer: {
    backgroundColor: "#e0e0e0", // Grey background for disabled state
  },
  touchableArea: {
    flexDirection: "row",
    flex: 1,
    marginRight: 10, // Adding margin to separate the quantity controls
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  detailsContainer: {
    marginLeft: 10,
    flex: 1,
    position: "relative",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  disabledText: {
    color: "#ccc", // Grey color for disabled state
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "flex-end",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  iconButton: {
    padding: 5, // Add padding for touchable area
  },
  comingSoonOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  comingSoonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff0000", // Red color for "Coming Soon" text
  },
});

export default ItemCard;
