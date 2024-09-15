import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Link, Stack } from "expo-router";
import CustomButton from "@/components/Buttons/CustomButton";
import CustomInput from "@/components/Forms/CustomInput";
import { supabase } from "@/lib/supabase";
import Colors from "../../constants/Colors";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
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
      <Stack.Screen options={{ title: "Sign up" }} />

      <CustomInput
        title="Email"
        handelChangeText={setEmail}
        placeHolder="jon@gmail.com"
        value={email}
        iconName="envelope"
      />

      <CustomInput
        title="Password"
        handelChangeText={setPassword}
        placeHolder="Enter your password"
        value={password}
        iconName="lock"
      />

      <CustomButton
        handelPress={signUpWithEmail}
        title={loading ? "Creating..." : "Create account"}
        disabled={loading}
      />

      <Link href="/sign-in" style={styles.textButton}>
        Sign in
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
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignUpScreen;
