import { useProductById } from "@/api/products";
import CustomButton from "@/components/Buttons/CustomButton";
import RemoteImage from "@/components/image/RemoteImage";
import { defaultPizzaImage } from "@/components/Lists/ProductListItem";
import Colors from "@/constants/Colors";
import { useCart } from "@/context/CartProvider";
import { FontAwesome } from "@expo/vector-icons";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ProductDetailsScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Boolean state for loading
  const { id } = useLocalSearchParams() as { id: string }; // Ensure id is a string
  const { items, AddItemToCart } = useCart();
  const { data: chosenProduct, error, isLoading } = useProductById(id);

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
          ...chosenProduct,
          created_at: new Date().toISOString(), // Add created_at with the current date
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
      <Stack.Screen
        options={{ title: chosenProduct?.name || "Product Details" }}
      />
      {/* Product editing screen */}
      <Stack.Screen
        options={{
          title: "Edit Product",
          headerRight: () => (
            <View style={style.headerIconsContainer}>
              <Link href={`/(adminView)/menu/createItem?id=${id}`} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="pencil" // to show edit
                      size={25}
                      color={Colors.light.tint}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            </View>
          ),
        }}
      />
      {/* Displays the product image */}
      <RemoteImage
        fallback={defaultPizzaImage}
        path={chosenProduct?.image}
        style={style.image}
        resizeMode="contain"
      />
      {/* Displays the product price */}
      <Text style={style.price}>${chosenProduct?.price || "N/A"}</Text>{" "}
      {/* Use optional chaining and fallback value */}
      {/* CustomButton handles the "Add to Cart" action, displays loading state when submitting */}
      <CustomButton
        title={"Add To Cart"}
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
  headerIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
