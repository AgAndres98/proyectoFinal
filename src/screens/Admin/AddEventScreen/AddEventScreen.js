import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { useFormik } from "formik";
import { DonationObjectCard } from "../../../components/Donation/DonationObjectCard/DonationObjectCard";
import { UploadImageForm } from "../../../components/Donation/UploadImage/UploadImageForm";
import { ImageObject } from "../../../components/Donation/ImageObject/ImageObject";
import { styles } from "./AddEventScreen.styles";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { getAuth } from "firebase/auth";
import { v4 as uuid } from "uuid";

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

        await setDoc(doc(db, "objetos", nuevaData.id), nuevaData);

        navigation.navigate(screen.objects.tab);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.screen}>
      <Text style={styles.titulo}>¡Crea un evento!</Text>
      <View style={styles.content}>
        <ImageObject formik={formik} />
        <DonationObjectCard formik={formik} />
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
