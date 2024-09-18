import { useStoreById } from "@/api/stores";
import CustomButton from "@/components/Buttons/CustomButton";
import CustomHeader from "@/components/CustomHeader.tsx";
import RemoteImage from "@/components/image/RemoteImage";
import { defaultStoreImage } from "@/components/Lists/StoreListItem";
import { useCart } from "@/context/CartProvider";
import { router, Stack, useLocalSearchParams, useSegments } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const StoreItemsScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Boolean state for loading
  const { storeId } = useLocalSearchParams(); // Retrieves the storeId from the route parameters

  // Ensure storeId is a string
  const storeIdString = Array.isArray(storeId) ? storeId[0] : storeId;

  const { data: store, error, isLoading } = useStoreById(storeIdString);

  const { items, AddItemToCart } = useCart();
  const segments = useSegments();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch store details</Text>;
  }

  const handleSubmit = () => {
    setIsSubmitting(true); // Start loading state
    setTimeout(() => {
      if (store) {
        const storeToAdd = {
          created_at: new Date().toISOString(),
          id: store.store_id,
          image: store.store_logo,
          name: store.store_name,
          price: store.delivery_price,
        };
        AddItemToCart(storeToAdd);
      }
      router.push("/cart");
      setIsSubmitting(false); // End loading state after the action is simulated
    }, 2000); // Simulate a delay of 2 seconds
  };
  // console.log(segments[0]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        rightIconName="menu"
        onRightIconPress={() =>
          router.push(
            `/${segments[0]}/home/store/storeDetails/${store?.store_id}`
          )
        }
      />
      <Stack.Screen options={{ title: store?.store_name || "Store" }} />
      <Text>Store StoreItemsScreen</Text>
      <RemoteImage
        fallback={defaultStoreImage}
        path={store?.store_logo}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{store?.store_name || "N/A"}</Text>
      <Text style={styles.deliveryTime}>
        Delivery Time: {store?.delivery_time || "N/A"}
      </Text>
      <Text style={styles.deliveryPrice}>
        Delivery Price: ${store?.delivery_price || "N/A"}
      </Text>
      <CustomButton
        title="Add To Cart"
        handelPress={handleSubmit}
        isLoading={isSubmitting}
        containerStyles={{ marginTop: 10 }}
      />
    </SafeAreaView>
  );
};

export default StoreItemsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  deliveryTime: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  deliveryPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginVertical: 5,
  },
});
