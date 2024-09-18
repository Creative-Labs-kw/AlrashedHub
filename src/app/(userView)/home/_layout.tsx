import { Stack } from "expo-router";
import React from "react";

// we use the _layout to separate screens shapes and to have specif useContext
const HomeStack = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "HomeScreen" }} />
      <Stack.Screen
        name="store/storeDetails/[storeId]"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
};

export default HomeStack;
