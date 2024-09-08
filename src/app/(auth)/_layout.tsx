import { useAuth } from "@/context/AuthProvider";
import { Redirect, Stack } from "expo-router";
import React from "react";

const _layout = () => {
  const { session } = useAuth();

  //  to protect from users > going back
  if (session) {
    return <Redirect href={"/"} />;
  }

  return <Stack />;
};

export default _layout;
