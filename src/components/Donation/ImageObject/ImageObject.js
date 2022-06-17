import React from "react";
import { View } from "react-native"
import { Image } from "react-native-elements"
import { styles } from "./ImageObject.styles"


export function ImageObject(props) {
    const { formik } = props;

    const primeraImagen = formik.values.fotos[0];

    return (
        <View style={styles.content} >
            <Image
                source={primeraImagen ? { uri: primeraImagen } : require("../../../../assets/no-hay-imagen.png")}
                style={styles.image}
            />
        </View>
    );
}