import CustomButton from "@/components/Buttons/CustomButton";
import CustomInput from "@/components/Forms/CustomInput";
import { supabase } from "@/lib/supabase";
import { Link, Stack } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    // take the error from the function
    const { error } = await supabase.auth.signInWithPassword({
      // add options to make the function work
      email,
      password,
    });
    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  };
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
        handelPress={signInWithEmail}
        title={loading ? "sign in ..." : "Sign in"}
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
