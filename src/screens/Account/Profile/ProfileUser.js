import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";



export function ProfileUser() {
    const navigation = useNavigation();


    const cerrarSesion = async () => {
        const auth = getAuth();
        await signOut(auth);
    }

    const irFormulario = async () => {
        navigation.navigate(screen.account.informationPersonal);
    }

    return (
        <View>
            <Text>Esta logeado</Text>
            <Button
                title="Cerrar sesion"
                onPress={cerrarSesion}
            />
            <Button
                title="Formulario"
                onPress={irFormulario}
            />
        </View>
    );
}