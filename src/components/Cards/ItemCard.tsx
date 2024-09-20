import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { defaultStoreImage } from "../Lists/StoreListItem";

interface ItemCardProps {
  item: {
    item_id: string;
    item_img: string;
    item_name: string;
    item_description: string;
    price: string;
    quantity: number;
  };
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/item/${item.item_id}`); // Navigate to ItemDetails screen
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.touchableArea}>
        <Image
          source={{ uri: item.item_img || defaultStoreImage }}
          style={styles.image}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.itemName}>{item.item_name}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 10,
    padding: 5,
    elevation: 1,
    alignItems: "center",
  },
  touchableArea: {
    flexDirection: "row",
    flex: 1,
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  detailsContainer: {
    marginLeft: 10,
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    color: "#555",
  },
});

export default ItemCard;
