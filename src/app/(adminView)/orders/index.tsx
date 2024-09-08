import { FlatList } from "react-native";
import orders from "../../../../assets/data/orders";
import { Stack } from "expo-router";
import OrderListItem from "@/components/Lists/OrderListItem";

const OrdersScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Orders" }} />
      {/* show all list orders */}
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
};
export default OrdersScreen;
