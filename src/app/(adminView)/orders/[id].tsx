import { useOrderById } from "@/api/orders";
import OrderItemListItem from "@/components/Items/OrderItemListItem";
import OrderListItem from "@/components/Lists/OrderListItem";
import Colors from "@/constants/Colors";
import { OrderStatusList } from "@/types";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const OrderDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const { data: order, error, isLoading } = useOrderById(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || order) {
    return <Text> Error to fetch orders</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Set the screen title to the order ID */}
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      {/* Display the order details one only have same id */}
      {/* if u add thi to the FlatList as header or footer it will be scrollable too */}
      <OrderListItem order={order} />

      {/* Render the items in the order using a FlatList */}
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }} // Adds space between list items
        ListFooterComponent={
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => console.warn("Update status")}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        }
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
