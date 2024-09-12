import { supabase } from "@/lib/supabase";
import React from "react";
import { Button, View } from "react-native";

// ! Why when sign out not working well
const ProfileScreen = () => {
  return (
    <View>
      <Button
        onPress={async () => await supabase.auth.signOut()}
        title="Sign out"
      />
    </View>
  );
};

export default ProfileScreen;
