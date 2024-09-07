import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/Buttons/CustomButton";
import CustomInput from "@/components/Forms/CustomInput";
import { defaultPizzaImage } from "@/components/ProductListItem";
import * as ImagePicker from "expo-image-picker";
import { Stack } from "expo-router";

// Create Product screen(CreateItemScreen)
const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const validateInputs = () => {
    setErrorMsg(""); // reset it
    if (!name) {
      setErrorMsg("Name is Required");
      return false;
    }
    if (!price) {
      setErrorMsg("Price is required");
      return false;
    }
    // IsNaN = must be num / parseFloat = convert string to num
    if (isNaN(parseFloat(price))) {
      setErrorMsg("Price is not a number");
      return false;
    }
    return true;
  };

  const restFields = () => {
    setName("");
    setPrice("");
  };

  const onCreateProduct = () => {
    if (!validateInputs()) {
      return; //stop here
    }
    console.warn("creating product: ", name);
    restFields();
  };

  //+ Pick img from photos
  const onPickImage = async () => {
    //Request permissions to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      // here you can add the more options like (allowsMultipleSelection)
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Enable editing option,
      aspect: [4, 3],
      quality: 1, //1 = full quality less is lower quality(0.5)
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Create Product/Item" }} />
      <Image
        source={{ uri: image || defaultPizzaImage }} //use the default img if there is not
        style={{ width: "50%", aspectRatio: 1, alignSelf: "center" }}
      />

      <Text
        onPress={onPickImage}
        style={{ alignSelf: "center", fontSize: 20, color: "blue" }}
      >
        Select Img
      </Text>
      <CustomInput
        value={name}
        title="Name"
        placeHolder="ex : abdullah"
        handelChangeText={setName}
      />
      <CustomInput
        value={price}
        title="Price"
        placeHolder="ex : 10KD"
        handelChangeText={setPrice}
      />
      <Text style={{ color: "red", fontSize: 20 }}> {errorMsg}</Text>
      <CustomButton title="Create product" handelPress={onCreateProduct} />
    </View>
  );
};

export default CreateProductScreen;
