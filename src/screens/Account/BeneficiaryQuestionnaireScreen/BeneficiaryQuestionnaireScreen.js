import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { db, screen } from "../../../utils";
import { BeneficiaryQuestionnaireForm } from "../../../components/Account/BeneficiaryQuestionnaireForm";
import {
  initialValues,
  validationSchem,
} from "./BeneficiaryQuestionnaireScreen.data";
import { styles } from "./BeneficiaryQuestionnaireScreen.styles";

export function BeneficiaryQuestionnaireScreen() {
  const [datosBeneficiario, setDatosBeneficiario] = useState(false);
  const navigation = useNavigation();

  const uid = getAuth().currentUser;

  useEffect(() => {
    onSnapshot(doc(db, "datosPersonales", uid.uid), (doc) => {
      let datosPersonales = doc.data();
      if (datosPersonales.cuestionarioBeneficiario.length > 0) {
        setDatosBeneficiario(true);
        navigation.navigate(screen.account.account);
      }
    });
  }, []);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchem(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const nuevaData = formValues;
        nuevaData.idUsuario = uid.uid;
        nuevaData.id = uid.uid;
        nuevaData.createdAt = new Date();

        await setDoc(
          doc(db, "cuestionarioBeneficiario", nuevaData.id),
          nuevaData
        );
        await updateDoc(doc(db, "datosPersonales", uid.uid), {
          cuestionarioBeneficiario: nuevaData,
        });

        setDatosBeneficiario(true);
        navigation.navigate(screen.account.account);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <View style={styles.screen}>
      <KeyboardAwareScrollView>
        <View style={styles.content}>
          <BeneficiaryQuestionnaireForm formik={formik} />

          <Button
            title="Registrarme"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={formik.handleSubmit}
            loading={formik.isSubmitting}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
