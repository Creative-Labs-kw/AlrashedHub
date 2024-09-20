import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface NotificationCardProps {
  message: string;
  timestamp: string;
  description: string;
}

const F_NotificationCard: React.FC<NotificationCardProps> = ({
  message,
  timestamp,
  description,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.timestamp}>{timestamp}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  message: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginTop: 2,
  },
});

export default F_NotificationCard;
