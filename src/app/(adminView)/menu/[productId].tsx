import CustomButton from "@/components/Buttons/CustomButton";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { useCart } from "@/context/CartProvider";
import products from "@assets/data/products";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const ProductDetailsScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Boolean state for loading
  const { productId } = useLocalSearchParams(); // Retrieves the productId from the route parameters
  const { items, AddItemToCart } = useCart();
  // Finds the product that matches the productId
  const chosenProduct = products.find((p) => p.id.toString() === productId);

  // To handle the case where the product is not found
  if (!chosenProduct) {
    return (
      <View>
        <Text>No Product Found</Text>
      </View>
    );
  }

  // Handles the button press, simulates adding the product to the cart with a delay
  const handleSubmit = () => {
    setIsSubmitting(true); // Start loading state
    setTimeout(() => {
      // add items to cart with chosen product
      AddItemToCart(chosenProduct);
      router.push("/cart");
      setIsSubmitting(false); // End loading state after the action is simulated
    }, 2000); // Simulate a delay of 2 seconds (e.g., simulating a network request)
  };

  return (
    <View style={style.container}>
      {/* Sets the title of the screen dynamically based on the product name */}
      <Stack.Screen options={{ title: chosenProduct.name }} />

      {/* Displays the product image */}
      <Image
        source={{ uri: chosenProduct.image || defaultPizzaImage }}
        style={style.image}
      />

      {/* Displays the product price */}
      <Text style={style.price}>${chosenProduct.price}</Text>

      {/* CustomButton handles the "Add to Cart" action, displays loading state when submitting */}
      <CustomButton
        title="Add To Cart"
        handelPress={handleSubmit} // Handles the press event and triggers handleSubmit
        isLoading={isSubmitting} // Displays the loading indicator based on the isSubmitting state
        containerStyles={{ marginTop: 10 }}
      />
    </View>
  );
};

export default ProductDetailsScreen;

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
