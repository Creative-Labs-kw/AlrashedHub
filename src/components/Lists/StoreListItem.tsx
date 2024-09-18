import Colors from "@/constants/Colors";
import { Tables } from "@/database.types";
import { Link, useSegments } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import RemoteImage from "../image/RemoteImage";

// Default image URL for stores if no image is provided
export const defaultStoreImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type StoreListItemProps = {
  store: Tables<"stores">;
};

export const StoreListItem = ({ store }: StoreListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/home/store/${store.store_id}`} asChild>
      <Pressable onPress={() => {}} style={styles.container} role="button">
        <View style={styles.row}>
          <RemoteImage
            fallback={defaultStoreImage}
            path={store.store_logo}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.storeInfo}>
            <Text style={styles.title}>{store.store_name}</Text>
            <Text style={styles.deliveryTime}>
              Delivery Time: {store.delivery_time} min
            </Text>
            <Text style={styles.deliveryPrice}>
              Delivery Price: ${store.delivery_price}
            </Text>
          </View>
        </View>
        <View style={styles.separator} />
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column", // Main container direction
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginVertical: 8, // Margin between items
    marginHorizontal: 5, // Add slight margin on the sides
    elevation: 1, // Light shadow for Android
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 }, // Light shadow for iOS
    shadowRadius: 1,
  },
  row: {
    flexDirection: "row", // Image and text in a row
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15, // Gap between image and text
  },
  storeInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  deliveryTime: {
    fontSize: 14,
    color: Colors.light.tint,
    marginTop: 4,
  },
  deliveryPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.light.tint,
    marginTop: 4,
  },
  separator: {
    height: 1, // Height of the line
    backgroundColor: "#E0E0E0", // Light gray line
    marginTop: 10, // Space between content and separator
  },
});
