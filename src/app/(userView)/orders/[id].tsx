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
  const orderId = Array.isArray(id) ? id[0] : id; // Keep as string

  const { data, error, isLoading } = useOrderById(orderId); // Pass as string

  useUpdateOrderSubscription(Number(orderId)); // Convert to number

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
      {/* Display the order details only if data is defined */}
      {data && <OrderListItem order={data} />}
      {/* Ensure data is defined before accessing order_items */}
      <FlatList
        data={data?.order_items} // Use optional chaining
        renderItem={({ item }) => (
          <OrderItemListItem
            item={{
              ...item,
              products: item.products
                ? {
                    ...item.products,
                    created_at: "", // Provide a default value
                    image: null, // Provide a default value
                  }
                : { created_at: "", image: null, id: 0, name: "", price: null }, // Default object
            }}
          />
        )}
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
