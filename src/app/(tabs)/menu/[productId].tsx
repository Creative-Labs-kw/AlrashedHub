import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import CustomButton from "@/components/Buttons/CustomButton";

const sizes = ["S", "M", "L"];

const ProductDetailsScreen = () => {
  const [SizeSelection, setSizeSelection] = useState("M"); // State to track selected size
  const [isSubmitting, setIsSubmitting] = useState(false); // Boolean state for loading
  const { productId } = useLocalSearchParams(); // Retrieves the productId from the route parameters

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
      console.log("Product added to cart");
      setIsSubmitting(false); // End loading state after the action is simulated
    }, 2000); // Simulate a delay of 2 seconds (e.g., simulating a network request)
  };

  return (
    <View style={style.container}>
      {/* Sets the title of the screen dynamically based on the product name */}
      <Stack.Screen
        options={{ title: "ProductDetailsScreen" + " " + chosenProduct.name }}
      />

      {/* Displays the product image */}
      <Image
        source={{ uri: chosenProduct.image || defaultPizzaImage }}
        style={style.image}
      />

      {/* Displays the product price */}
      <Text style={style.price}>${chosenProduct.price}</Text>

      {/* Renders available size options and handles size selection */}
      {sizes.map((size) => (
        <Text
          key={size}
          onPress={() => {
            setSizeSelection(size); // Update the size selection state
          }}
          style={[
            // List of styles
            style.size,
            {
              backgroundColor: SizeSelection === size ? "gainsboro" : "#fff", // Changes background color based on the selected size
            },
          ]}
        >
          {size}
        </Text>
      ))}

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
  size: {
    margin: 2,
    fontSize: 20,
    borderRadius: 3,
  },
});
