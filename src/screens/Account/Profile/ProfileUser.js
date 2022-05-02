import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";

export function ProfileUser() {

    const cerrarSesion = async () => {
        const auth = getAuth();
        await signOut(auth);
    }

    return (
        <View>
            <Text>Esta logeado</Text>
            <Button
                title="Cerrar sesion"
                onPress={cerrarSesion}
            />
        </View>
    );
}