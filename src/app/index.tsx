import { useAuth } from "@/context/AuthProvider";
import { Link, Redirect } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


//  For testing this should be the "Welcome Screen"
const Index = () => {
  const { session, error, loading, isAdmin } = useAuth();

  // if loading
  if (loading) {
    return <ActivityIndicator />;
  }
  // If there is an error, display it
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  // If no session, redirect to sign-in
  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  // if he not admin
  if (!isAdmin) {
    return <Redirect href={"/(userView)"} />;
  }
  return (
    <View style={styles.container}>
      <Link href={"/(userView)"} asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>User</Text>
        </TouchableOpacity>
      </Link>
      <Link href={"/(adminView)"} asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Admin</Text>
        </TouchableOpacity>
      </Link>

      {/* <Link href={"/"} asChild>
        <TouchableOpacity style={styles.button}>
          <Text onPress={() => supabase.auth.signOut} style={styles.buttonText}>
            SignOut
          </Text>
        </TouchableOpacity>
      </Link> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Index;
