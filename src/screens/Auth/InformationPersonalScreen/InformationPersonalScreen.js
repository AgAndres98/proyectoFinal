import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { styles } from "./InformationPersonalScreen.styles";
import { UserLoggedScreen } from "../../../screens/Account/UserLoggedScreen/UserLoggedScreen";
import { InformationPersonalForm } from "../../../components/Auth/InformationPersonalForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
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
import { db, screen } from "../../../utils";
import { getAuth } from "firebase/auth";
import { v4 as uuid } from "uuid";

import {
  initialValues,
  validationSchem,
} from "./InformationPersonalScreen.data";

export function InformationPersonalScreen() {
  const [datosPersonales, setDatosPersonales] = useState(false);
  const navigation = useNavigation();

  const uid = getAuth().currentUser;

  const cuestionarioDonante = () => {
    formik.handleSubmit();
    navigation.navigate(screen.account.donador);
    setDatosPersonales(true);
  };

  const cuestionarioBeneficiario = () => {
    formik.handleSubmit();
    navigation.navigate(screen.account.beneficiary);
    setDatosPersonales(true);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchem(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const nuevaData = formValues;
        nuevaData.idUsuario = uid.uid;
        nuevaData.id = uid.uid;

        await setDoc(doc(db, "datosPersonales", nuevaData.id), nuevaData);
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    const q = query(
      collection(db, "datosPersonales"),
      where("idUser", "==", uid.uid)
    );

    onSnapshot(q, async (snapshot) => {
      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "datosPersonales", uid.uid);
        const docSnap = await getDoc(docRef);

        let datosPersonales = docSnap.data();
        if (datosPersonales.dni > 0) {
          setDatosPersonales(true);
          navigation.navigate(screen.account.tab);
        }
      }
    });
  }, []);

  return datosPersonales ? (
    <UserLoggedScreen />
  ) : (
    <View style={styles.screen}>
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
    </View>
  );
}
