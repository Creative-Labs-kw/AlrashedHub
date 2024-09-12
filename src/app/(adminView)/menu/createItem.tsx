import { View, Text, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/Buttons/CustomButton";
import CustomInput from "@/components/Forms/CustomInput";
import * as ImagePicker from "expo-image-picker";
import { router, Stack, useLocalSearchParams } from "expo-router";
import {
  useDeleteProduct,
  useInsertProduct,
  useProductById,
  useUpdateProduct,
} from "@/api/products";
import { defaultPizzaImage } from "@/components/Lists/ProductListItem";
import { supabase } from "@/lib/supabase";
import { randomUUID } from "expo-crypto";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
// Create Product screen(CreateItemScreen)
const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const { id } = useLocalSearchParams<{ id: string }>();
  const isUpdating = !!id; // Check if we are updating an existing product based on whether a id is provided

  // Call the mutate func to create or insert to the DB
  const { mutate: insertProduct } = useInsertProduct();
  // Call the mutate func to update product to the DB
  const { mutate: updateProduct } = useUpdateProduct();
  // Call the mutate func to get productById from the DB
  const { data: updatingProduct } = useProductById(id);
  //  Call Delete:
  const { mutate: deleteProduct } = useDeleteProduct();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

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

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const onCreateProduct = async () => {
    if (!validateInputs()) {
      return; //stop here
    }
    // save img in DB:
    const imagePath = await uploadImage();
    insertProduct(
      {
        name,
        image: imagePath, //link the img chosen by the user to be uplaod to DB
        price: parseFloat(price), //make it number
      },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };
  const onUpdateProduct = async () => {
    if (!validateInputs()) {
      return; //stop here
    }
    const imagePath = await uploadImage();

    updateProduct(
      {
        id,
        name,
        image: imagePath,
        price,
      },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
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
    if (!id) {
      console.error("Product ID is undefined or null");
      return;
    }
    deleteProduct(id, {
      onSuccess: () => {
        resetFields();
        router.replace("/(adminView)");
      },
      onError: (error) => {
        console.error("Error deleting product:", error);
      },
    });
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

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });

    if (data) {
      return data.path;
    }
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
        title={isUpdating ? "update/edit" : "Create product"} // Set title based on whether a id is present (update/edit vs. create product)
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
