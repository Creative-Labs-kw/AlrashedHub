import { useProductList } from "@/api/products";
import { ProductListItem } from "@/components/ProductListItem";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

// menu user view
export default function MenuScreen() {
  // use react-query
  //+ call use Query + queryKey(forCaching) + queryFn + isLoading
  // Use the useQuery hook to fetch data from the "products" table
  const {
    data: products, //reName it data to products
    error,
    isLoading,
  } = useProductList(); // call the Hook to fetch all data

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch Products</Text>;
  }
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
