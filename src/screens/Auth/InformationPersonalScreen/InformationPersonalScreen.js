import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik"
import { styles } from "./InformationPersonalScreen.styles";
import { InformationPersonalForm } from "../../../components/Auth/InformationPersonalForm"
import {useNavigation} from "@react-navigation/native"
import {doc, setDoc} from "firebase/firestore"
import {db, screen} from "../../../utils"
import {getAuth} from "firebase/auth";
import { v4 as uuid} from "uuid"

import { initialValues, validationSchem } from "./InformationPersonalScreen.data"

export function InformationPersonalScreen() {
    const navigation = useNavigation();

    const uid = getAuth().currentUser;

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchem(),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
              const nuevaData = formValues;
              nuevaData.idUsuario = uid.uid;
              nuevaData.id = uuid();

              console.log(nuevaData);
    
              await setDoc(doc(db, "datosPersonales", nuevaData.id), nuevaData);
    
            } catch (error) {
              console.log(error);
            }
        }
      });

    return(
        <ScrollView style={styles.content}>

            <InformationPersonalForm formik={formik} />

            <Button title="Añadir datos" 
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={formik.handleSubmit}
                    loading={formik.isSubmitting}
            />
        </ScrollView>
    )
}
