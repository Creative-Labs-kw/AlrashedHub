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
    </Stack>
  );
};

export default HomeStack;
