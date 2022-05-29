import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { styles } from "./InformationPersonalScreen.styles";
import { InformationPersonalForm } from "../../../components/Auth/InformationPersonalForm";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
import { db, screen } from "../../../utils";
import { getAuth } from "firebase/auth";
import { v4 as uuid } from "uuid";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  initialValues,
  validationSchem,
} from "./InformationPersonalScreen.data";

export function InformationPersonalScreen() {
  const navigation = useNavigation();

  const uid = getAuth().currentUser;

  const cuestionarioDonante = () => {
    formik.handleSubmit();
    navigation.navigate(screen.account.donador);
  };

  const cuestionarioBeneficiario = () => {
    formik.handleSubmit();
    navigation.navigate(screen.account.beneficiary);
  };

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
    },
  });

  return (
    <KeyboardAwareScrollView style={styles.content}>
      <InformationPersonalForm formik={formik} />
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Button
          title="Cuestionario donante"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={cuestionarioDonante}
          loading={formik.isSubmitting}
        />
        <Button
          title="Cuestionario beneficiario"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={cuestionarioBeneficiario}
          loading={formik.isSubmitting}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
