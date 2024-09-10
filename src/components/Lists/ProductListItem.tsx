import Colors from "@/constants/Colors";
import { Tables } from "@/database.types";
import { Link, useSegments } from "expo-router";
import { Image, Pressable, StyleSheet, Text } from "react-native";

// to be safe id no image and remove the ts error
export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Tables<"products">; // take the type from th DB using the HELPER
};
// object getting it from the dummy data / destruct it and use it
export const ProductListItem = ({ product }: ProductListItemProps) => {
  //+ check where the path u on it or who is here user or admin
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable onPress={() => {}} style={styles.container}>
        <Image
          style={styles.image}
          resizeMode="contain" //make sure the img all if it appear inside
          source={{ uri: product.image || defaultPizzaImage }} //use first img if u don't find it use the default one
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.title}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10, // size inside the container
    borderRadius: 5,
    shadowColor: "#000", // Color of the shadow
    shadowOffset: { width: 0, height: 2 }, // Offset of the shadow
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.5, // Radius of the shadow
    elevation: 5, // Android shadow effect
    maxWidth: "50%", // if you have item alone don't let it take all the size(from the flex)
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
