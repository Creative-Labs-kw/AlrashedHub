import { StyleSheet, View } from "react-native";
import { ProductListItem } from "@/components/ProductListItem";
import products from "@assets/data/products";

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <ProductListItem product={products[0]} />
      <ProductListItem product={products[1]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
