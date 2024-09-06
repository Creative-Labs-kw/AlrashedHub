import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

const ProductDetailsScreen = () => {
  const { productId } = useLocalSearchParams(); //take form the params or the url or the routing +name of what in {} should match the one in the file naming
  return (
    <View>
      {/* You can use all options of screen in a file also without calling a name */}
      <Stack.Screen
        options={{ title: "ProductDetailsScreen" + " " + productId }}
      />
      <Text>ProductDetailsScreen</Text>
      <Text>{productId}</Text>
    </View>
  );
};

export default ProductDetailsScreen;
