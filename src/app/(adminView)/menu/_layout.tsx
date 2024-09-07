import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React from "react";
import { Pressable, View, StyleSheet } from "react-native";

// We use the _layout to separate screen shapes and to have specific useContext
const MenuStack = () => {
  return (
    <Stack>
      {/* Main menu screen */}
      <Stack.Screen
        name="index"
        options={{
          title: "Menu",
          headerRight: () => (
            <View style={styles.headerIconsContainer}>
              {/* CART SCREEN */}
              <Link href="/cart" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="shopping-cart"
                      size={25}
                      color={Colors.light.tint}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              {/* Create screen */}
              <Link href="/menu/createItem" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="plus-square-o"
                      size={25}
                      color={Colors.light.tint}
                      style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            </View>
          ),
        }}
      />

      {/* Product editing screen */}
      <Stack.Screen
        name="[productId]"
        options={{
          title: "Edit Product",
          headerRight: () => (
            <View style={styles.headerIconsContainer}>
              <Link href="/" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="pencil"
                      size={25}
                      color={Colors.light.tint}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            </View>
          ),
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  headerIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default MenuStack;
