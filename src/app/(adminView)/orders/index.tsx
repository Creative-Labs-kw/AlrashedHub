import { useAdminOrderList } from "@/api/orders";
import OrderListItem from "@/components/Lists/OrderListItem";
import { Stack } from "expo-router";
import { ActivityIndicator, FlatList, Text } from "react-native";

const OrdersScreen = () => {
  const { data, error, isLoading } = useAdminOrderList({ archived: false });

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch orders</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ title: "Orders" }} />
      {/* show all list orders */}
      <FlatList
        data={data}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
};
export default OrdersScreen;
