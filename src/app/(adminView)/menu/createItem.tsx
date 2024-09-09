import { View, Text, Image, Alert } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/Buttons/CustomButton";
import CustomInput from "@/components/Forms/CustomInput";
import { defaultPizzaImage } from "@/components/ProductListItem";
import * as ImagePicker from "expo-image-picker";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useInsertProduct } from "@/api/products";

// Create Product screen(CreateItemScreen)
const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { productId } = useLocalSearchParams();
  const isUpdating = !!productId; // Check if we are updating an existing product based on whether a productId is provided

  // Call the mutate func to create or insert to the DB
  const { mutate: insertProduct } = useInsertProduct();
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
    insertProduct(
      {
        name,
        image,
        price: parseFloat(price), //make it number
      },
      {
        onSuccess: () => {
          restFields();
          router.back();
        },
      }
    );
  };
  const onUpdateProduct = () => {
    if (!validateInputs()) {
      return; //stop here
    }
    console.warn("Updating product: ", name);
    restFields();
  };

  const onSubmit = () => {
    if (isUpdating) {
      //update
      onUpdateProduct();
    } else {
      onCreateProduct();
    }
  };

  //+ Pick img from photos(pickers must be in separated file)
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

  // Delete / and check deleting:
  const onDelete = () => {
    console.warn("delete");
  };
  const confirmDelete = () => {
    // make a question box before deleting
    Alert.alert("Confirm", "Are you sure?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: isUpdating ? "Update/Edit Product" : "Create Product/Item",
        }}
      />
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
      <CustomButton
        title={isUpdating ? "update/edit" : "Create product"} // Set title based on whether a productId is present (update/edit vs. create product)
        handelPress={onSubmit}
      />
      {/* only id edit or updating show this */}
      {isUpdating && (
        <CustomButton
          title="Delete Product"
          handelPress={confirmDelete}
          containerStyles={{ borderColor: "red", borderWidth: 2 }}
        />
      )}
    </View>
  );
};

export default CreateProductScreen;
