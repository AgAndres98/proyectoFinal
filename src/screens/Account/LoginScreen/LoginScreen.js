
import React from "react";
import { View } from "react-native";
import { Image } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LoginForm } from "../../../components/Auth"
import { styles } from "./LoginScreen.styles";

export function LoginScreen() {
    return (
        <KeyboardAwareScrollView>
            <Image source={require("../../../../assets/icon.png")}
                style={styles.image}
            />
            <View style={styles.content}>
                <LoginForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

