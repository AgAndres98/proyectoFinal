import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  doc,
  updateDoc,
  query,
  collection,
  onSnapshot,
  where,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { db, screen } from "../../../../utils";
import { BeneficiaryQuestionnaireForm } from "../../../../components/Account";
import { styles } from "./EditBeneficiaryQuestionnaireScreen.styles";

import {
  initialValues,
  validationSchem,
} from "./EditBeneficiaryQuestionnaireScreen.data";

export function EditBeneficiaryQuestionnaireScreen() {
  const navigation = useNavigation();

  const uid = getAuth().currentUser;

  const [cuestionario, setCuestionario] = useState(null);

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

        setCuestionario(dato);

        formik.setFieldValue("motivo", dato.motivo);
        formik.setFieldValue("descripcion", dato.descripcion);
        formik.setFieldValue("ubicacion", dato.ubicacion);
        formik.setFieldValue("ropa", dato.ropa);
        formik.setFieldValue("objetos", dato.objetos);
        formik.setFieldValue("alimentos", dato.alimentos);
        formik.setFieldValue("electrodomesticos", dato.electrodomesticos);
        formik.setFieldValue("utiles", dato.utiles);
        formik.setFieldValue("otros", dato.otros);
        formik.setFieldValue("herramientas", dato.herramientas);
        formik.setFieldValue("juguetes", dato.juguetes);
        formik.setFieldValue("libros", dato.libros);
        formik.setFieldValue("materiales", dato.materiales);
        formik.setFieldValue("muebles", dato.muebles);
        formik.setFieldValue("salud", dato.salud);
        formik.setFieldValue("servicio", dato.servicio);
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

        if (cuestionario != null) {
          await updateDoc(
            doc(db, "cuestionarioBeneficiario", uid.uid),
            nuevaData
          );
        } else {
          nuevaData.idUsuario = uid.uid;
          nuevaData.id = uid.uid;
          nuevaData.createdAt = new Date();

          await setDoc(
            doc(db, "cuestionarioBeneficiario", nuevaData.id),
            nuevaData
          );
        }
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
