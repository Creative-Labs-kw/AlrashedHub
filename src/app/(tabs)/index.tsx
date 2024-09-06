import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import products from "../../../assets/data/products";

const product1 = products[0];
export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: product1.image }} />
      <Text style={styles.title}>{product1.name}</Text>
      <Text style={styles.title}>${product1.price}</Text>
    </View>
  );
}

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
    color: Colors.light.tint,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    aspectRatio: 1, //calculate related to the width
  },
});
