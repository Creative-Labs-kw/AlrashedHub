import { Stack } from "expo-router";
import React from "react";

// we use the _layout to separate screens shapes and to have specif useContext
const MenuStack = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Orders" }} />
    </Stack>
  );
};

export default MenuStack;
