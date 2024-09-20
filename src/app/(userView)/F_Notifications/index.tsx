import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useFamilyNotificationList,
  useInsertFamilyNotification,
} from "@/api/f_notifications";
import F_NotificationCard from "@/components/Cards/F_NotificationCard";
import { useAuth } from "@/context/AuthProvider";
import { Ionicons } from "@expo/vector-icons"; // Icon for send button

const F_NotificationsScreen = () => {
  const [message, setMessage] = useState("");
  const { data: notifications, isLoading, error } = useFamilyNotificationList();
  const { mutate: insertNotifications } = useInsertFamilyNotification(); // Use this
  const { profile } = useAuth();

  // NOTIFIER
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching notifications</Text>;
  }

  const handleSendNotification = () => {
    if (message.trim() === "") {
      return;
    }

    insertNotifications(
      {
        user_id: profile?.id, // Assuming profile contains user id
        message,
        description: "New family notification", // Description or other relevant data
        timestamp: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          setMessage(""); // Clear the input field on success
        },
        onError: (error) => {
          console.log("Error sending notification:", error); // Handle error if needed
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.notification_id}
        renderItem={({ item }) => (
          <F_NotificationCard
            message={item.message}
            timestamp={item.timestamp}
            description={item.description}
          />
        )}
      />

      {profile?.group === "NOTIFIER" && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message"
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendNotification}
          >
            <Ionicons name="send" size={24} color="green" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 8,
  },
});

export default F_NotificationsScreen;
