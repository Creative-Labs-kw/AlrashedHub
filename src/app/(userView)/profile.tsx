import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import React from "react";
import { Button, StyleSheet, View } from "react-native";

const ProfileScreen = () => {
  // Make signOut function async
  const handleSignOut = async () => {
    try {
      // Sign out the user
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Replace route after successful sign-out
      router.replace("/sign-in");
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={handleSignOut} title="Sign out" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
