import { FlatList, StyleSheet, View } from "react-native";
import { ProductListItem } from "@/components/ProductListItem";
import products from "@assets/data/products";

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />} //item is obj but only one item from the products obj
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} //make more columns
        contentContainerStyle={{ gap: 10, padding: 5 }} //style of the list container + to put space between the border and list put padding
        columnWrapperStyle={{ gap: 10 }} // style each row alone
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10, // size inside the container
    borderRadius: 5,
  },
});
