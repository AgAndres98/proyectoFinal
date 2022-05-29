import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { useFormik } from "formik";
import { BeneficiaryQuestionnaireForm} from "../../../components/Account/BeneficiaryQuestionnaireForm"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./BeneficiaryQuestionnaireScreen.styles";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { getAuth } from "firebase/auth";
import { v4 as uuid } from "uuid";

import { initialValues, validationSchem } from "./BeneficiaryQuestionnaireScreen.data";

export function BeneficiaryQuestionnaireScreen() {
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

        await setDoc(doc(db, "custionarioBeneficiario", nuevaData.id), nuevaData);

        navigation.navigate(screen.objects.tab);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
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
  );
}
