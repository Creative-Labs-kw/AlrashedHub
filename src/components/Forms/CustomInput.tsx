import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  TextInputProps,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { defaultPizzaImage } from "@/components/ProductListItem";

interface CustomInputProps {
  title: string;
  value: string;
  handelChangeText: (text: string) => void;
  ContainerFormMoreStyle?: any; // You can pass additional style objects here
  keyBoardType?: TextInputProps["keyboardType"];
  TextMoreStyle?: any; // Additional text style
  placeHolder?: string;
  required?: boolean;
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
          placeholderTextColor={"white"}
          value={value}
          onChangeText={handelChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyBoardType}
        />
        {title === "Password" && (
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          >
            <Image
              resizeMode="contain"
              style={styles.icon}
              source={{ uri: defaultPizzaImage }}
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
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: "#3498db", // Equivalent to primary color
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0", // Example of light black border color
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    color: "white",
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default CustomInput;
