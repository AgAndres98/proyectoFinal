import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { useFormik } from "formik";
import { BeneficiaryQuestionnaireForm } from "../../../components/Account/BeneficiaryQuestionnaireForm";
import { UserLoggedScreen } from "../../../screens/Account/UserLoggedScreen/UserLoggedScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./BeneficiaryQuestionnaireScreen.styles";
import {
  doc,
  setDoc,
  updateDoc,
  query,
  collection,
  onSnapshot,
  where,
  getDoc,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { getAuth } from "firebase/auth";
import { v4 as uuid } from "uuid";

import {
  initialValues,
  validationSchem,
} from "./BeneficiaryQuestionnaireScreen.data";

export function BeneficiaryQuestionnaireScreen() {
  const [datosBeneficiario, setDatosBeneficiario] = useState(false);
  const navigation = useNavigation();

  const uid = getAuth().currentUser;

  useEffect(() => {
    onSnapshot(doc(db, "datosPersonales", uid.uid), (doc) => {
      console.log(doc.data());
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
        nuevaData.id = uuid();

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

  return datosBeneficiario ? (
    <UserLoggedScreen />
  ) : (
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
