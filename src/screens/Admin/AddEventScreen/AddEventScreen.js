import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { useFormik } from "formik";
import { CreateEventCard } from "../../../components/Admin/";
import { UploadImageForm } from "../../../components/Donation";
import { ImageObject } from "../../../components/Donation/ImageObject/ImageObject";
import { styles } from "./AddEventScreen.styles";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { getAuth } from "firebase/auth";
import { v4 as uuid } from "uuid";
import Toast from "react-native-toast-message";

import { initialValues, validationSchem } from "./AddEventScreen.data";

export function AddEventScreen() {
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

        await setDoc(doc(db, "eventos", nuevaData.id), nuevaData);

        resetForm(initialValues);
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Evento añadido",
        });
        navigation.navigate(screen.calendario.tab);
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
      <Text style={styles.titulo}>¡Crea un evento!</Text>
      <View style={styles.content}>
        <ImageObject formik={formik} />
        <CreateEventCard formik={formik} />
        <UploadImageForm formik={formik} />

        <Button
          title="Añadir evento"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        />
      </View>
    </ScrollView>
  );
}
