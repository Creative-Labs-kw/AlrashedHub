import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Link, Stack } from "expo-router";
import CustomButton from "@/components/Buttons/CustomButton";
import CustomInput from "@/components/Forms/CustomInput";
import { supabase } from "@/lib/supabase";
import Colors from "../../constants/Colors";

const SignUpScreen = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(""); // Added email state
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {
    setLoading(true);
    console.log("Attempting to sign up...");

    // Handle user sign up with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log("Sign up error:", error.message);
      Alert.alert("Sign up error", error.message);
    } else {
      console.log("Sign up successful:", data);

      // Optionally, store the full name in the user profile or in a separate table
      const userId = data?.user?.id;
      if (userId) {
        console.log("User ID:", userId);
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert([{ id: userId, full_name: fullName }]); // Use upsert to handle both insert and update

        if (profileError) {
          console.log("Profile insert error:", profileError.message);
          Alert.alert("Profile error", profileError.message);
        } else {
          console.log("Profile inserted successfully");
        }
      } else {
        console.log("User ID not found");
      }
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign up" }} />

      <CustomInput
        title="Full Name"
        handelChangeText={setFullName}
        placeHolder="Enter your full name"
        value={fullName}
        iconName="user"
      />

      <CustomInput
        title="Email"
        handelChangeText={setEmail}
        placeHolder="Enter your email"
        value={email}
        iconName="envelope" // Use an appropriate icon for email
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
