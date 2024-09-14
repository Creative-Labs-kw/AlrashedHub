import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
import { Alert } from "react-native";
import { supabase } from "./supabase";

// Fetch payment sheet params from your Supabase function
const fetchPaymentSheetParams = async (amount: number) => {
  try {
    const { data, error } = await supabase.functions.invoke('payment-sheet', {
      body: { amount },
    });

    if (error || !data) {
      throw new Error('Error fetching payment sheet params');
    }

    return data;
  } catch (err) {
    Alert.alert("Error fetching payment sheet params", err.message);
    return null;
  }
};

// Initialize payment sheet
export const initialisePaymentSheet = async (amount: number) => {
  try {
    const { client_secret: clientSecret, PUBLISHABLE_KEY } = await fetchPaymentSheetParams(amount);

    if (!clientSecret || !PUBLISHABLE_KEY) {
      throw new Error("Missing client secret or publishable key");
    }

    // Initialize payment sheet with the required parameters
    const { error } = await initPaymentSheet({
      merchantDisplayName: "alrashed hub payment",
      paymentIntentClientSecret: clientSecret,
      defaultBillingDetails: {
        name: 'abdullah', // Custom billing name
      },
    });

    if (error) {
      throw new Error(`Payment sheet initialization error: ${error.message}`);
    }
  } catch (err) {
    Alert.alert("Error initializing payment sheet", err.message);
  }
};

// Open payment sheet
export const openPaymentSheet = async () => {
  try {
    const { error } = await presentPaymentSheet();

    if (error) {
      throw new Error(`Error presenting payment sheet: ${error.message}`);
    }

    return true;
  } catch (err) {
    Alert.alert("Payment failed", err.message);
    return false;
  }
};

// Call these in sequence during checkout
export const checkout = async (amount: number) => {
  await initialisePaymentSheet(amount); // Initialize the sheet with the amount
  const paymentSuccess = await openPaymentSheet(); // Show the payment sheet to the user

  if (paymentSuccess) {
    Alert.alert("Payment successful!", "Your order has been placed.");
  }
};
