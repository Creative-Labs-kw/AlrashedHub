import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";

//  For testing this should be <<welcome screen>>
const Index = () => {
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
});

export default Index;
