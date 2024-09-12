import { useOrderById } from "@/api/orders";
import { useUpdateOrderSubscription } from "@/api/orders/subscriptions";
import OrderItemListItem from "@/components/Items/OrderItemListItem";
import OrderListItem from "@/components/Lists/OrderListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

const OrderDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const { data, error, isLoading } = useOrderById(id);

  useUpdateOrderSubscription(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text> Error to fetch orders</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Set the screen title to the order ID */}
      <Stack.Screen options={{ title: `Order #${id}` }} />
      {/* Display the order details one only have same id */}
      {/* if u add thi to the FlatList as header or footer it will be scrollable too */}
      <OrderListItem order={data} />
      {/* Render the items in the order using a FlatList */}
      <FlatList
        data={data.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }} // Adds space between list items
      />
    </View>
  );
};

// Styles for the component container
const styles = StyleSheet.create({
  container: {
    padding: 10, // Padding around the container
    flex: 1, // Flex to fill the available space
    gap: 10, // Gap between child components
  },
});

export default OrderDetailScreen;
