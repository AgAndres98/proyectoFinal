import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { useFormik } from "formik";
import { DonationCashCard } from "../../components/Donation/DonationCashCard";
import { DonationObjectCard } from "../../components/Donation/DonationObjectCard/DonationObjectCard";
import { UploadImageForm } from "../../components/Donation/UploadImage/UploadImageForm";
import { ImageObject } from "../../components/Donation/ImageObject/ImageObject";
import { styles } from "./DonationScreen.styles";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../utils";
import { getAuth } from "firebase/auth";
import { v4 as uuid } from "uuid";
import Toast from "react-native-toast-message";

import { initialValues, validationSchem } from "./DonationScreen.data";

export function DonationScreen() {
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
        nuevaData.createdAt = new Date();
        nuevaData.solicitudes = 0;

        await setDoc(doc(db, "objetos", nuevaData.id), nuevaData);
        resetForm(initialValues);
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Objeto añadido",
          text2: "¡Muchas gracias por donar!",
        });
        navigation.navigate(screen.objects.tab);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const resetForm = (initialValues) => {
    try {
      formik.resetForm(initialValues);
    } catch (error) {}
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.screen}>
      <Text style={styles.titulo}>¡Doná dinero!</Text>
      <DonationCashCard />
      <Text style={styles.titulo}>¡Doná un objeto!</Text>
      <View style={styles.content}>
        <ImageObject formik={formik} />
        <DonationObjectCard formik={formik} />
        <UploadImageForm formik={formik} />

        <Button
          title="Añadir objeto"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        />
      </View>
    </ScrollView>
  );
}
