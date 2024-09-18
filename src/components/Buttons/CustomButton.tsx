import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface CustomButtonProps extends TouchableOpacityProps {
  handelPress: () => void;
  textStyle?: TextStyle; // Change from string to TextStyle to support inline styling
  title: string;
  isLoading?: boolean;
  containerStyles?: ViewStyle; // Change from string to ViewStyle to support inline styling
}

//  You can provide default styles and overwrite them with passed styles
const CustomButton: React.FC<CustomButtonProps> = ({
  handelPress,
  textStyle,
  title,
  isLoading,
  containerStyles,
}) => {
  return (
    <TouchableOpacity
      onPress={handelPress}
      style={[
        styles.buttonContainer,
        containerStyles,
        isLoading && styles.loading,
      ]}
      disabled={isLoading}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      {isLoading && (
        <ActivityIndicator animating={isLoading} color="#fff" size="small" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#D8BFD8", // Equivalent to Tailwind's bg-secondary
    borderRadius: 12, // Equivalent to rounded-xl
    minHeight: 62, // Equivalent to min-h-[62px]
    justifyContent: "center", // Equivalent to justify-center
    alignItems: "center", // Equivalent to items-center
    flexDirection: "row", // Ensure that the ActivityIndicator is inline with the text
  },
  buttonText: {
    color: "#fff", // Equivalent to Tailwind's text-primary
    fontWeight: "600", // Equivalent to font-psemibold
    fontSize: 18, // Equivalent to text-lg
  },
  loading: {
    opacity: 0.5, // Equivalent to opacity-50 when loading
  },
});

export default CustomButton;
