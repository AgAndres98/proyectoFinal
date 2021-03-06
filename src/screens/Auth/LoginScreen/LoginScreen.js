import React from "react";
import { View, Text } from "react-native";
import { Image } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { LoginForm } from "../../../components/Auth";
import { styles } from "./LoginScreen.styles";

export function LoginScreen() {
  const navigation = useNavigation();

  const irARegistrarse = () => {
    navigation.navigate(screen.auth.register);
  };
  return (
    <KeyboardAwareScrollView style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../../assets/iconv2.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <LoginForm />
        <Text style={styles.textRegister}>
          ¿Aun no tienes cuenta?{" "}
          <Text style={styles.btnRegister} onPress={irARegistrarse}>
            Registrate
          </Text>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}
