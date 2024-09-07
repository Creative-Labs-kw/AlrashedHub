import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

interface CustomInputProps {
  title: string;
  value: string;
  handelChangeText: (text: string) => void;
  ContainerFormMoreStyle?: any; // You can pass additional style objects here
  keyBoardType?: TextInputProps["keyboardType"];
  TextMoreStyle?: any; // Additional text style
  placeHolder?: string;
  required?: boolean;
  iconName?: string; // New prop for FontAwesome icon name
}

const CustomInput: React.FC<CustomInputProps> = ({
  title,
  value,
  handelChangeText,
  ContainerFormMoreStyle,
  keyBoardType,
  TextMoreStyle,
  placeHolder,
  required = false,
  iconName, // Use the iconName prop
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, ContainerFormMoreStyle]}>
      <Text style={[styles.titleText, TextMoreStyle]}>
        {title} {required && <Text style={styles.requiredText}> *</Text>}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={placeHolder}
          placeholderTextColor={"#D3D3D3"}
          value={value}
          onChangeText={handelChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyBoardType}
        />
        {iconName && (
          <TouchableOpacity
            onPress={() => {
              if (title === "Password") {
                setShowPassword(!showPassword);
              }
            }}
          >
            <FontAwesome
              name={iconName}
              size={24}
              color="#808080"
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  titleText: {
    color: "black",
    fontFamily: "Poppins-Medium", // Example of font style
    fontSize: 16,
  },
  requiredText: {
    color: "red",
    fontSize: 16,
  },
  inputContainer: {
    width: "100%",
    height: 50,
    paddingHorizontal: 16,
    backgroundColor: "#fff", // Equivalent to primary color
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#000", // Example of light black border color
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    color: "#000",
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default CustomInput;
