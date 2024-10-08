import { Item } from "@/types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CartItemCardProps {
  item: Item; // Ensure this matches your Item structure
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onDelete: () => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onDelete,
}) => {
  const { item_id, quantity, item_name, price } = item;

  if (quantity <= 0) {
    return null;
  }

  return (
    <View style={styles.card}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item_name}</Text>
        <Text style={styles.itemQuantity}>Quantity: {quantity}</Text>
        <Text style={styles.itemPrice}>
          Price: ${(price * quantity).toFixed(2)}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={onDecreaseQuantity}
          style={styles.actionButton}
        >
          <Ionicons name="remove-circle-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onIncreaseQuantity}
          style={styles.actionButton}
        >
          <Ionicons name="add-circle-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
          <FontAwesome name="trash" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemQuantity: {
    fontSize: 16,
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: "#333",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    marginHorizontal: 5,
  },
});

export default CartItemCard;
