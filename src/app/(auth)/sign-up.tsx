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
  const [phoneNumber, setPhoneNumber] = useState(""); // Added phone number state

  const signUpWithEmail = async () => {
    setLoading(true);
    console.log("Attempting to sign up...");

    try {
      // Handle user sign up with Supabase Auth
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (signUpError) {
        // Use type assertion to ensure the error is a SupabaseError
        throw new Error((signUpError as Error).message);
      }

      console.log("Sign up successful:", signUpData);

      const userId = signUpData.user?.id;
      if (userId) {
        console.log("User ID:", userId);

        // Insert or update the user's profile in the profiles table
        const { error: profileError } = await supabase.from("profiles").upsert([
          {
            id: userId,
            full_name: fullName,
            phone: phoneNumber,
            email: email, // Ensure the email is also added to the profile
          },
        ]);

        if (profileError) {
          throw new Error((profileError as unknown as Error).message);
        } else {
          console.log("Profile inserted successfully");
          Alert.alert("Success", "Account created successfully!");
          // Optionally redirect or clear the form here
        }
      } else {
        throw new Error("User ID not found");
      }
    } catch (error) {
      // Use type assertion to ensure the error is an instance of Error
      Alert.alert("Sign up error", (error as Error).message);
    } finally {
      setLoading(false);
    }
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

      <CustomInput
        title="Phone Number"
        handelChangeText={setPhoneNumber} // Ensure you have a state for phone number
        placeHolder="Enter your phone number"
        value={phoneNumber} // Ensure you have a state for phone number
        iconName="phone" // Use an appropriate icon for phone
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
