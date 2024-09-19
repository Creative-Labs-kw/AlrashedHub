import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CartItem } from "@/types";

const CartItemCard = ({ item }: { item: CartItem }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.itemName}>{item.item.item_name}</Text>
      <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
      <Text style={styles.itemPrice}>Price: ${item.item.price.toFixed(2)}</Text>
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
});

export default CartItemCard;
