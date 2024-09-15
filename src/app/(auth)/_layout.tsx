import { useAuth } from "@/context/AuthProvider";
import { Redirect, Stack } from "expo-router";
import React from "react";

const Layout = () => {
  const { session } = useAuth();

  // Redirect if user is already authenticated
  if (session) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
