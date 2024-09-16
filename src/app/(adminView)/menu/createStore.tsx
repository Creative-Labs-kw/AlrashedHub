import { View, Text, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/Buttons/CustomButton";
import CustomInput from "@/components/Forms/CustomInput";
import * as ImagePicker from "expo-image-picker";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { supabase } from "@/lib/supabase";
import { randomUUID } from "expo-crypto";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import {
  useDeleteStore,
  useInsertStore,
  useStoreById,
  useUpdateStore,
} from "@/api/stores";
import { defaultStoreImage } from "@/components/Lists/StoreListItem";

// Create Product screen(CreateItemScreen)
const CreateProductScreen = () => {
  const [storeName, setStoreName] = useState("");
  const [deliveryPrice, setDeliveryPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const { id } = useLocalSearchParams<{ id: string }>();
  const isUpdating = !!id; // Check if we are updating an existing product based on whether an id is provided

  // Call the mutate func to create or insert to the DB
  const { mutate: insertStore } = useInsertStore();
  // Call the mutate func to update Store in the DB
  const { mutate: updateStore } = useUpdateStore();
  // Call the mutate func to get StoreById from the DB
  const { data: updatingStore } = useStoreById(id);
  // Call Delete:
  const { mutate: deleteStore } = useDeleteStore();

  useEffect(() => {
    if (updatingStore) {
      setStoreName(updatingStore.store_name);
      setDeliveryPrice(updatingStore.delivery_price?.toString() || ""); // Handle possible null
      setImage(updatingStore.store_logo); // Assuming store_logo is used for the image
    }
  }, [updatingStore]);

  const validateInputs = () => {
    setErrorMsg(""); // reset it
    if (!storeName) {
      setErrorMsg("Store Name is Required");
      return false;
    }
    if (!deliveryPrice) {
      setErrorMsg("Delivery Price is required");
      return false;
    }
    // IsNaN = must be num / parseFloat = convert string to num
    if (isNaN(parseFloat(deliveryPrice))) {
      setErrorMsg("Delivery Price is not a number");
      return false;
    }
    return true;
  };

  const resetFields = () => {
    setStoreName("");
    setDeliveryPrice("");
  };

  const onCreateProduct = async () => {
    if (!validateInputs()) {
      return; //stop here
    }
    // save img in DB:
    const imagePath = await uploadImage();
    insertStore(
      {
        store_name: storeName,
        store_logo: imagePath || "", // Provide a default empty string if imagePath is undefined
        delivery_price: parseFloat(deliveryPrice), // make it number
      },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const onUpdateStore = async () => {
    if (!validateInputs()) {
      return; //stop here
    }
    const imagePath = await uploadImage();

    updateStore(
      {
        id,
        store_name: storeName,
        store_logo: imagePath,
        delivery_price: parseFloat(deliveryPrice),
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
      // update
      onUpdateStore();
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
      // here you can add more options like (allowsMultipleSelection)
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Enable editing option
      aspect: [4, 3],
      quality: 1, //1 = full quality; less is lower quality (0.5)
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Delete / and check deleting:
  const onDelete = () => {
    if (!id) {
      console.error("Store ID is undefined or null");
      return;
    }
    deleteStore(id, {
      onSuccess: () => {
        resetFields();
        router.replace("/(adminView)");
      },
      onError: (error) => {
        console.error("Error deleting Store:", error);
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
        source={{ uri: image || defaultStoreImage }} // use the default img if there is none
        style={{ width: "50%", aspectRatio: 1, alignSelf: "center" }}
      />

      <Text
        onPress={onPickImage}
        style={{ alignSelf: "center", fontSize: 20, color: "blue" }}
      >
        Select Img
      </Text>
      <CustomInput
        value={storeName}
        title="Store Name"
        placeHolder="ex : Abdullah's Store"
        handelChangeText={setStoreName}
      />
      <CustomInput
        value={deliveryPrice}
        title="Delivery Price"
        placeHolder="ex : 10KD"
        handelChangeText={setDeliveryPrice}
      />
      <Text style={{ color: "red", fontSize: 20 }}> {errorMsg}</Text>
      <CustomButton
        title={isUpdating ? "Update/Edit" : "Create Product"} // Set title based on whether an id is present (update/edit vs. create product)
        handelPress={onSubmit}
      />
      {/* Only show this if updating */}
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
