
import React from "react";
import { View, Text } from "react-native";
import { Image } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LoginForm } from "../../../components/Auth"
import { useNavigation } from "@react-navigation/native"
import { screen } from "../../../utils"
import { styles } from "./LoginScreen.styles";

export function LoginScreen() {

    const navigation = useNavigation();

    const irARegistrarse = () => {
        navigation.navigate(screen.account.register);
    }
    return (
        <KeyboardAwareScrollView>
            <Image source={require("../../../../assets/logo.jpeg")}
                style={styles.image}
            />
            <View style={styles.content}>
                <LoginForm />
                <Text style={styles.textRegister}>
                    ¿Aun no tienes cuenta? <Text style={styles.btnRegister} onPress={irARegistrarse}>Registrate</Text> 
                </Text>
            </View>
        </KeyboardAwareScrollView>
    );
}

