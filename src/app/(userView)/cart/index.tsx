import { useCart } from "@/context/CartProvider";
import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import CustomButton from "@/components/Buttons/CustomButton";
import CartItemCard from "@/components/Cards/CartItemCard";

const CartScreen = () => {
  const { items, total, updateQuantity, checkout } = useCart();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {items.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <CartItemCard
              key={item.item_id}
              item={item}
              onIncreaseQuantity={() => updateQuantity(item.item_id, 1)}
              onDecreaseQuantity={() => updateQuantity(item.item_id, -1)}
              onDelete={() => updateQuantity(item.item_id, -item.quantity)}
            />
          )}
          keyExtractor={(item) => item.item_id}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
        <CustomButton
          title="Checkout"
          handlePress={checkout}
          containerStyles={styles.checkoutButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  totalContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    marginTop: 10,
    width: "50%",
  },
});

export default CartScreen;
