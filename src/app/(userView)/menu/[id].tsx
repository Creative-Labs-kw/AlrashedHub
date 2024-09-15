import { useProductById } from "@/api/products";
import CustomButton from "@/components/Buttons/CustomButton";
import RemoteImage from "@/components/image/RemoteImage";
import { defaultPizzaImage } from "@/components/Lists/ProductListItem";
import { useCart } from "@/context/CartProvider";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const ProductDetailsScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Boolean state for loading
  const { id } = useLocalSearchParams(); // Retrieves the id from the route parameters
  const productId = Array.isArray(id) ? id[0] : id; // Ensure id is a string
  const { data: chosenProduct, error, isLoading } = useProductById(productId);
  const { items, AddItemToCart } = useCart();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch Products</Text>;
  }

  // Handles the button press, simulates adding the product to the cart with a delay
  const handleSubmit = () => {
    setIsSubmitting(true); // Start loading state
    setTimeout(() => {
      // Check if chosenProduct is defined before adding to cart
      if (chosenProduct) {
        // Create a new object with the required properties
        const productToAdd = {
          created_at: new Date().toISOString(), // or use an appropriate value
          id: chosenProduct.id,
          image: chosenProduct.image,
          name: chosenProduct.name,
          price: chosenProduct.price,
        };
        AddItemToCart(productToAdd);
      }
      router.push("/cart");
      setIsSubmitting(false); // End loading state after the action is simulated
    }, 2000); // Simulate a delay of 2 seconds (e.g., simulating a network request)
  };

  return (
    <View style={style.container}>
      {/* Sets the title of the screen dynamically based on the product name */}
      <Stack.Screen options={{ title: chosenProduct?.name || "Product" }} />
      {/* Displays the product image */}
      <RemoteImage
        fallback={defaultPizzaImage}
        path={chosenProduct?.image}
        style={style.image}
        resizeMode="contain"
      />
      {/* Displays the product price */}
      <Text style={style.price}>${chosenProduct?.price || "N/A"}</Text>{" "}
      {/* Added optional chaining and fallback value */}
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
