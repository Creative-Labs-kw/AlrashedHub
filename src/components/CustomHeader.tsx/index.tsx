import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Using Ionicons, but you can replace it with your preferred icons
import { Link } from "expo-router";

// Define the prop types for the CustomHeader component
interface CustomHeaderProps {
  title?: string;
  location?: string;
  leftIconName?: keyof typeof Ionicons.glyphMap;
  rightIconName?: keyof typeof Ionicons.glyphMap;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  HeaderText?: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  location,
  leftIconName,
  rightIconName,
  onLeftIconPress,
  onRightIconPress,
  HeaderText,
}) => {
  return (
    <View style={styles.headerContainer}>
      <Text>{HeaderText}</Text>
      {leftIconName && (
        <TouchableOpacity onPress={onLeftIconPress} style={styles.iconButton}>
          <Ionicons name={leftIconName} size={24} color="black" />
        </TouchableOpacity>
      )}

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.locationText}>{location}</Text>
      </View>

      {rightIconName && (
        <TouchableOpacity onPress={onRightIconPress} style={styles.iconButton}>
          <Ionicons name={rightIconName} size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  iconButton: {
    padding: 10,
  },
  titleContainer: {
    flex: 1,
    // alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  locationText: {
    fontSize: 12,
    color: "#666",
  },
});
