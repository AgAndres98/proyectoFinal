import React, { useEffect } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import { useFormik } from "formik";
import { BeneficiaryQuestionnaireForm } from "../../../../components/Account/BeneficiaryQuestionnaireForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./EditBeneficiaryQuestionnaireScreen.styles";
import {
  doc,
  updateDoc,
  query,
  collection,
  onSnapshot,
  where,
  getDoc,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../../utils";
import { getAuth } from "firebase/auth";

import {
  initialValues,
  validationSchem,
} from "./EditBeneficiaryQuestionnaireScreen.data";

export function EditBeneficiaryQuestionnaireScreen() {
  const navigation = useNavigation();

  const uid = getAuth().currentUser;

  useEffect(() => {
    const q = query(
      collection(db, "cuestionarioBeneficiario"),
      where("id", "==", uid.uid)
    );

    onSnapshot(q, async (snapshot) => {
      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "cuestionarioBeneficiario", uid.uid);
        const docSnap = await getDoc(docRef);

        const dato = docSnap.data();

        formik.setFieldValue("motivo", dato.motivo);
        formik.setFieldValue("descripcion", dato.descripcion);
        formik.setFieldValue("ubicacion", dato.ubicacion);
        formik.setFieldValue("ropa", dato.ropa);
        formik.setFieldValue("objetos", dato.objetos);
        formik.setFieldValue("alimentos", dato.alimentos);
        formik.setFieldValue("electrodomesticos", dato.electrodomesticos);
        formik.setFieldValue("utiles", dato.utiles);
        formik.setFieldValue("otros", dato.otros);
        formik.setFieldValue("fotos", dato.fotos);
        formik.setFieldValue("ayuda", dato.ayuda);
        formik.setFieldValue("idUsuario", dato.idUsuario);
        formik.setFieldValue("id", dato.id);
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

        //await setDoc(doc(db, "cuestionarioBeneficiario", nuevaData.id), nuevaData);
        await updateDoc(
          doc(db, "cuestionarioBeneficiario", uid.uid),
          nuevaData
        );
        await updateDoc(doc(db, "datosPersonales", uid.uid), {
          cuestionarioBeneficiario: nuevaData,
        });

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
            title="Modificar"
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
