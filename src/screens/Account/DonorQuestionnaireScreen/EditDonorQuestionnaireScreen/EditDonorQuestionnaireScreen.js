import React, { useEffect } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import {
  doc,
  query,
  collection,
  where,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db, screen } from "../../../../utils";
import { DonorQuestionnaireForm } from "../../../../components/Account";
import { styles } from "./EditDonorQuestionnaireScreen.styles";

import {
  initialValues,
  validationSchem,
} from "./EditDonorQuestionnaireScreen.data";

export function EditDonorQuestionnaireScreen() {
  const uid = getAuth().currentUser;
  useEffect(() => {
    const q = query(
      collection(db, "cuestionarioDonador"),
      where("id", "==", uid.uid)
    );

    onSnapshot(q, async (snapshot) => {
      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "cuestionarioDonador", uid.uid);
        const docSnap = await getDoc(docRef);

        const dato = docSnap.data();

        formik.setFieldValue("incendios", dato.incendios);
        formik.setFieldValue("inundaciones", dato.inundaciones);
        formik.setFieldValue("tsunamis", dato.tsunamis);
        formik.setFieldValue("gente", dato.gente);
        formik.setFieldValue("grupoFamiliar", dato.grupoFamiliar);
        formik.setFieldValue("mayoresDeEdad", dato.mayoresDeEdad);
        formik.setFieldValue("cercania", dato.cercania);
        formik.setFieldValue("idUsuario", dato.idUsuario);
        formik.setFieldValue("id", dato.id);
      }
    });
  }, []);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchem(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const nuevaData = formValues;

        await updateDoc(doc(db, "cuestionarioDonador", uid.uid), nuevaData);

        navigation.navigate(screen.account.account);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <View style={styles.screen}>
      <KeyboardAwareScrollView style={styles.content}>
        <DonorQuestionnaireForm formik={formik} />
        <View style={styles.contentBtn}>
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
