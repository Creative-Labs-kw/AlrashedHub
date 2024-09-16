import { useStoreById } from "@/api/stores";
import CustomButton from "@/components/Buttons/CustomButton";
import RemoteImage from "@/components/image/RemoteImage";
import { defaultStoreImage } from "@/components/Lists/StoreListItem";
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

const StoreDetailsScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Boolean state for loading
  const { id } = useLocalSearchParams() as { id: string }; // Ensure id is a string
  const { items, AddItemToCart } = useCart(); // Assuming this is still relevant
  const { data: chosenStore, error, isLoading } = useStoreById(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch Store</Text>;
  }

  // Handles the button press, simulates adding the store to the cart with a delay
  const handleSubmit = () => {
    setIsSubmitting(true); // Start loading state
    setTimeout(() => {
      // Check if chosenStore is defined before adding to cart
      if (chosenStore) {
        // Create a new object with the required properties
        const storeToAdd = {
          ...chosenStore,
          created_at: new Date().toISOString(), // Add created_at with the current date
          price: chosenStore.delivery_price || 0, // Ensure price is included and default to 0 if null
        };
        AddItemToCart(storeToAdd); // Assuming the store can be added to cart
      }
      router.push("/cart");
      setIsSubmitting(false); // End loading state after the action is simulated
    }, 2000); // Simulate a delay of 2 seconds (e.g., simulating a network request)
  };

  return (
    <View style={style.container}>
      {/* Sets the title of the screen dynamically based on the store name */}
      <Stack.Screen
        options={{ title: chosenStore?.store_name || "Store Details" }}
      />
      {/* Store editing screen */}
      <Stack.Screen
        options={{
          title: "Edit Store",
          headerRight: () => (
            <View style={style.headerIconsContainer}>
              <Link href={`/(adminView)/stores/createStore?id=${id}`} asChild>
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
      {/* Displays the store logo */}
      <RemoteImage
        fallback={defaultStoreImage}
        path={chosenStore?.store_logo}
        style={style.image}
        resizeMode="contain"
      />
      {/* Displays the store details */}
      <Text style={style.title}>{chosenStore?.store_name || "N/A"}</Text>
      <Text style={style.description}>
        {chosenStore?.store_description || "N/A"}
      </Text>
      <Text style={style.phone}>{chosenStore?.phone_number || "N/A"}</Text>
      <Text style={style.deliveryTime}>
        Delivery Time: {chosenStore?.delivery_time || "N/A"}
      </Text>
      <Text style={style.deliveryPrice}>
        Delivery Price: ${chosenStore?.delivery_price || "N/A"}
      </Text>
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

export default StoreDetailsScreen;

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 10, // Added padding for better spacing
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  phone: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  deliveryTime: {
    fontSize: 14,
    color: Colors.light.tint,
    marginVertical: 5,
  },
  deliveryPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 5,
  },
  headerIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
