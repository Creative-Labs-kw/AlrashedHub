import { View, Text, StyleSheet, FlatList } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "../../../../assets/data/orders";
import OrderListItem from "@/components/Lists/OrderListItem";
import OrderItemListItem from "@/components/Items/OrderItemListItem";

const OrderDetailScreen = () => {
  // Get the orderId from the route parameters
  const { orderId } = useLocalSearchParams();

  // Find the order that matches the provided orderId
  const order = orders.find((o) => o.id.toString() === orderId);

  // If no order is found, display a message
  if (!order) {
    return <Text>Order not found!</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Set the screen title to the order ID */}
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      {/* Display the order details one only have same orderId */}
      {/* if u add thi to the FlatList as header or footer it will be scrollable too */}
      <OrderListItem order={order} />

      {/* Render the items in the order using a FlatList */}
      <FlatList
        data={order.order_items}
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
