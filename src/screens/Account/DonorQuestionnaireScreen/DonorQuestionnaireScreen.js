import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik"
import { styles } from "./DonorQuestionnaireScreen.styles";
import { DonorQuestionnaireForm } from "../../../components/Account/DonorQuestionnaireForm"
import {useNavigation} from "@react-navigation/native"
import {doc, setDoc} from "firebase/firestore"
import {db, screen} from "../../../utils"
import {getAuth} from "firebase/auth";
import { v4 as uuid} from "uuid"

import { initialValues, validationSchem } from "./DonorQuestionnaireScreen.data"

export function DonorQuestionnaireScreen() {
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
    
              await setDoc(doc(db, "cuestionarioDonador", nuevaData.id), nuevaData);

              navigation.navigate(screen.account.account);
    
            } catch (error) {
              console.log(error);
            }
        }
      });

    return(
        <ScrollView style={styles.content}>

            <DonorQuestionnaireForm formik={formik} />

            <Button title="Registrarme" 
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={formik.handleSubmit}
                    loading={formik.isSubmitting}
            />
        </ScrollView>
    )
}