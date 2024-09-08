import { useProductById } from "@/api/products";
import CustomButton from "@/components/Buttons/CustomButton";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Colors from "@/constants/Colors";
import { useCart } from "@/context/CartProvider";
import { FontAwesome } from "@expo/vector-icons";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ProductDetailsScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Boolean state for loading
  const { productId } = useLocalSearchParams(); // Retrieves the productId from the route parameters
  const { items, AddItemToCart } = useCart();
  const { data: chosenProduct, error, isLoading } = useProductById(productId);

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
      {/* Product editing screen */}
      <Stack.Screen
        options={{
          title: "Edit Product",
          headerRight: () => (
            <View style={style.headerIconsContainer}>
              <Link
                href={`/(adminView)/menu/createItem?productId=${productId}`}
                asChild
              >
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
      <Image
        source={{ uri: chosenProduct.image || defaultPizzaImage }}
        style={style.image}
      />

      {/* Displays the product price */}
      <Text style={style.price}>${chosenProduct.price}</Text>

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
