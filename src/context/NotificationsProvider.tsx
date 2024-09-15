import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { registerForPushNotificationsAsync } from "@/lib/notifications";
import { ExpoPushToken } from "expo-notifications";
import * as Notifications from "expo-notifications";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<String | undefined>();
  const { profile } = useAuth();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const savePushToken = async (newToken: string | undefined) => {
    // Only save the token if it's new or different
    if (newToken && newToken !== expoPushToken) {
      setExpoPushToken(newToken);

      // Update the token in the database
      await supabase
        .from("profiles")
        .update({ expo_push_token: newToken })
        .eq("id", profile.id);
    }
  };

  useEffect(() => {
    const initializePushNotifications = async () => {
      const token = await registerForPushNotificationsAsync();
      savePushToken(token);
    };

    initializePushNotifications(); // Call async function to register for push notifications

    // Set up listeners for notifications
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response);
      });

    // Cleanup listeners on component unmount
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once

  // console.log('Push token: ', expoPushToken);
  // console.log('Notification: ', notification);

  return <>{children}</>;
};

export default NotificationProvider;
