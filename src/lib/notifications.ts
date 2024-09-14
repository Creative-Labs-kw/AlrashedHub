import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// Set up the notification handler to configure how notifications are displayed
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // Display the notification alert
    shouldPlaySound: false, // Do not play a sound for the notification
    shouldSetBadge: false, // Do not update the app icon badge
  }),
});

// Function to send a push notification
async function sendPushNotification(expoPushToken: Notifications.ExpoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default', // Play default notification sound
    title: 'Original Title', // Notification title
    body: 'And here is the body!', // Notification body text
    data: { someData: 'goes here' }, // Optional additional data
  };

  // Send the notification to Expo's push notification service
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message), // Send the notification payload as JSON
  });
}

// Function to register for push notifications
export async function registerForPushNotificationsAsync() {
  let token;

  // Set up notification channel for Android devices
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // Ensure the code is running on a physical device
  if (Device.isDevice) {
    // Check and request notification permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    // Alert the user if permissions are not granted
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Get the Expo push token
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas.projectId, // Replace with your actual project ID if needed
    })).data;
    console.log(token); // Log the token for debugging
  } else {
    alert('Must use a physical device for Push Notifications'); // Alert for simulator usage
  }

  return token; // Return the push token
}
