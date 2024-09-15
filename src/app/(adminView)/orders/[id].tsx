import { useOrderById, useUpdateOrder } from "@/api/orders";
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
  const orderId = Array.isArray(id) ? id[0] : id; // Ensure id is a string

  const { data: order, error, isLoading } = useOrderById(orderId);
  const { mutate: updateOrder } = useUpdateOrder();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !order) {
    return <Text>Error to fetch orders</Text>;
  }

  const updateStatus = async (status: string) => {
    const result = await updateOrder({
      id: Number(id), // Convert id to a number
      updateFields: { status }, // Changed from updatedFields to updateFields
    });
    if (order) {
      // notifyUserAboutOrderUpdate({ ...order, status });
    }
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !order) {
    return <Text>Failed to fetch</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Set the screen title to the order ID */}
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      {/* Display the order details one only have same id */}
      {/* if u add thi to the FlatList as header or it will be scrollable too */}
      <OrderListItem order={order} />

      {/* Render the items in the order using a FlatList */}
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => (
          <OrderItemListItem
            item={{
              ...item,
              products: {
                ...item.products,
                image:
                  (
                    item.products as {
                      image?: string;
                      created_at?: string;
                      id: number;
                      name: string;
                      price: number;
                    }
                  ).image || null, // Ensure image is included
                created_at:
                  (item.products as { created_at?: string }).created_at || "", // Default value for created_at
                id: item.products?.id || 0, // Provide a default value for id
                name: item.products?.name || "", // Provide a default value for name
                price: item.products?.price || null, // Provide a default value for price
              },
            }}
          />
        )}
        contentContainerStyle={{ gap: 10 }} // Adds space between list items
        ListFooterComponent={
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
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
