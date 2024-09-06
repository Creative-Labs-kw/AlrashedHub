import Colors from "@/constants/Colors";
import { Product } from "@/types";
import { Image, StyleSheet, Text, View } from "react-native";

// to be safe id no image and remove the ts error
export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Product;
};
// object getting it from the dummy data / destruct it and use it
export const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: product.image || defaultPizzaImage }} //use first img if u don't find it use the default one
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.title}>${product.price}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
    padding: 10, // size inside the container
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    marginVertical: 10,
  },

  price: {
    color: Colors.light.tint, //import from other file
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    aspectRatio: 1, //calculate related to the width
  },
});
