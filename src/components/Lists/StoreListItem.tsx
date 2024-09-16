import Colors from "@/constants/Colors";
import { Tables } from "@/database.types";
import { Link, useSegments } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import RemoteImage from "../image/RemoteImage";

// Default image URL for stores if no image is provided
export const defaultStoreImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type StoreListItemProps = {
  store: Tables<"stores">; // Take the type from the DB using the HELPER
};

export const StoreListItem = ({ store }: StoreListItemProps) => {
  // Check where the path is or who is here (user or admin)
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/stores/${store.store_id}`} asChild>
      <Pressable
        onPress={() => {}}
        style={[styles.container, { pointerEvents: "auto" }]} // Add pointerEvents to style
        role="button" // Replace accessibilityRole with role
      >
        <RemoteImage
          fallback={defaultStoreImage}
          path={store.store_logo}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{store.store_name}</Text>
        <Text style={styles.description}>{store.store_description}</Text>
        <Text style={styles.phone}>{store.phone_number}</Text>
        <Text style={styles.deliveryTime}>
          Delivery Time: {store.delivery_time}
        </Text>
        <Text style={styles.deliveryPrice}>
          Delivery Price: ${store.delivery_price}
        </Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    maxWidth: "50%",
  },
  title: {
    fontSize: 18,
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
  image: {
    width: "50%",
    aspectRatio: 1, // Calculate related to the width
  },
});
