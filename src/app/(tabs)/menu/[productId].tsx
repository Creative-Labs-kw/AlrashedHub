import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const ProductDetailsScreen = () => {
  const { productId } = useLocalSearchParams(); //take form the params or the url or the routing +name of what in {} should match the one in the file naming
  return (
    <View>
      <Text>ProductDetailsScreen</Text>
      <Text>{productId}</Text>
    </View>
  );
};

export default ProductDetailsScreen;
