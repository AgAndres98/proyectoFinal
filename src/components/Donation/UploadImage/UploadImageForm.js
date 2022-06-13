import React, { useState } from "react";
import { ScrollView, Alert } from "react-native"
import { Icon, Avatar, Text } from "react-native-elements"
import { styles } from "./UploadImageForm.styles"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 as uuid } from "uuid"
import { map, filter } from "lodash"
import * as ImagePicker from "expo-image-picker"

export function UploadImageForm(props) {
    const { formik } = props;
    const [isLoading, setIsLoading] = useState(false);

    const abrirGaleria = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            guardarImagen(result.uri);
        }
    }

    const guardarImagen = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        const storage = getStorage();
        const storageRef = ref(storage, `objetos/${uuid()}`);

        uploadBytes(storageRef, blob).then((snapshot) => {
            updateFotoObjeto(snapshot.metadata.fullPath);
        });
    };


    const updateFotoObjeto = async (imagePath) => {
        const storage = getStorage();
        const imageRef = ref(storage, imagePath);

        const imageUrl = await getDownloadURL(imageRef);
        formik.setFieldValue("fotos", [...formik.values.fotos, imageUrl]);
    };

    const eliminarImagen = (img) => {
        Alert.alert(
            "Eliminar imagen",
            "¿Estás seguro que deseas eliminar esta imagen?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                        const result = filter(formik.values.fotos, (image) => image !== img);
                        formik.setFieldValue("fotos", result);
                    },
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.viewImage} >
                <Icon type="material-community" name="camera" color="#62bd60" containerStyle={styles.containerIcon} onPress={abrirGaleria} />

                {map(formik.values.fotos, (image) => (
                    <Avatar
                        key={image}
                        source={{ uri: image }}
                        containerStyle={styles.imagenStyle}
                        onPress={() => eliminarImagen(image)}
                    />
                ))}
            </ScrollView>
            <Text style={styles.error} >{formik.errors.fotos}</Text>

            {/* me falta el loading */}
        </>
    );
}