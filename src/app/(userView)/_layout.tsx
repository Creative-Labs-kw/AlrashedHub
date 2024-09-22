import { useAuth } from "@/context/AuthProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { useClientOnlyValue } from "../../components/useClientOnlyValue";
import Colors from "../../constants/Colors";

//+ USER VIEW LAYOUT
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();

  //  to protect from users > going back
  if (!session) {
    return <Redirect href={"/"} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      {/* To remove the tab from the tab bar not using */}
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="store/[storeId]"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="store/storeDetails/[storeId]"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen name="cart/index" options={{ href: null }} />
      <Tabs.Screen name="item/[itemId]" options={{ href: null }} />
      <Tabs.Screen name="orders/[id]" options={{ href: null }} />
      <Tabs.Screen name="orders/index" options={{ href: null }} />

      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="F_Notifications/index"
        options={{
          title: "F_Notifications",
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
