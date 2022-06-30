import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import {
  doc,
  setDoc,
  query,
  collection,
  onSnapshot,
  where,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Toast from "react-native-toast-message";
import { db, screen } from "../../../utils";
import { UserLoggedScreen } from "../../../screens/Account";
import { InformationPersonalForm } from "../../../components/Auth";
import { styles } from "./InformationPersonalScreen.styles";

import {
  initialValues,
  validationSchem,
} from "./InformationPersonalScreen.data";

let datosPer = [];

export function InformationPersonalScreen() {
  const [datosPersonales, setDatosPersonales] = useState(false);
  const [flagDonor, setFlagDonor] = useState(null);

  const navigation = useNavigation();

  if (!datosPersonales) {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
  } else {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
  }

  const auth = getAuth();
  const uid = auth.currentUser;
  useEffect(() => {
    const q = query(collection(db, "datosPersonales"));

    onSnapshot(q, async (snapshot) => {
      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "datosPersonales", data.id);
        const docSnap = await getDoc(docRef);

        const dato = docSnap.data();

        datosPer.push(dato.dni);
      }
    });
  }, [datosPer]);

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

  const cuestionarioDonante = () => {
    if (
      datosPer.find((elemento) => elemento === formik.values.dni) == undefined
    ) {
      setFlagDonor(true);
      formik.handleSubmit();
    } else {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "El DNI ya esta registrado",
      });
    }
  };

  const cuestionarioBeneficiario = () => {
    if (
      datosPer.find((elemento) => elemento === formik.values.dni) == undefined
    ) {
      setFlagDonor(false);
      formik.handleSubmit();
    } else {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "El DNI ya esta registrado",
      });
    }
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchem(),
    onSubmit: async (formValues) => {
      try {
        const nuevaData = formValues;
        nuevaData.idUsuario = uid.uid;
        nuevaData.id = uid.uid;
        nuevaData.email = auth.currentUser.email;
        if (flagDonor == true) {
          nuevaData.rolInicial = "Donante";
        } else if (flagDonor == false) {
          nuevaData.rolInicial = "Beneficiario";
        }
        await setDoc(doc(db, "datosPersonales", nuevaData.id), nuevaData);

        if (nuevaData.rolInicial == "Donante") {
          navigation.navigate(screen.account.donador);
        } else {
          navigation.navigate(screen.account.beneficiary);
        }

        setDatosPersonales(true);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return datosPersonales ? (
    <UserLoggedScreen />
  ) : (
    <View style={styles.screen}>
      <KeyboardAwareScrollView style={styles.content}>
        <InformationPersonalForm formik={formik} />

        <View style={{ flex: 1, flexDirection: "row" }}>
          <Button
            title="Donante"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={() => cuestionarioDonante()}
            loading={formik.isSubmitting}
          />
          <Button
            title="Beneficiario"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={() => cuestionarioBeneficiario()}
            loading={formik.isSubmitting}
          />
        </View>
        <Text style={styles.texto}>
          ¡No te preocupes! Sin importar el formulario que elijas podras tanto
          donar o solicitar objetos
        </Text>
      </KeyboardAwareScrollView>
    </View>
  );
}
