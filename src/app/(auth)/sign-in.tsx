import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import { Link, Stack } from "expo-router";
import CustomButton from "@/components/Buttons/CustomButton";
import CustomInput from "@/components/Forms/CustomInput";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign in" }} />

      <CustomInput
        title="email"
        handelChangeText={setEmail}
        placeHolder="ex: batman@gmail.com"
        value={email}
        iconName="envelope"
      />

      <CustomInput
        title="Password"
        handelChangeText={setPassword}
        placeHolder="ex: joker09"
        value={password}
        iconName="lock"
      />
      <CustomButton
        handelPress={() => {
          console.log("pressed");
        }}
        title="Sign in"
      />
      <Link href="/sign-up" style={styles.textButton}>
        Create an account
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignInScreen;
