import React from "react";
import { View } from "react-native";
import { Image } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RegisterForm } from "../../../components/Auth";
import { styles } from "./RegisterScreen.styles";

export function RegisterScreen() {
  return (
    <KeyboardAwareScrollView style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../../assets/iconv2.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  );
}
