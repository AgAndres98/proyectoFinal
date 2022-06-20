import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { EditEventCard } from "../../../../components/Admin/EditEventCard/EditEventCard";
import { UploadImageForm } from "../../../../components/Donation/UploadImage/UploadImageForm";
import { ImageObject } from "../../../../components/Donation/ImageObject/ImageObject";
import { styles } from "./EditEventScreen.style";
import {
  doc,
  query,
  collection,
  where,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../../utils";
import { initialValues, validationSchem } from "./EditEventScreen.data";



let evento = [];

export function EditEventScreen(props) {
  const { route } = props;
  const [state, setState] = useState({});

  useEffect(() => {
    const q = query(
      collection(db, "eventos"),
      where("id", "==", route.params.idEvento)
    );

    onSnapshot(q, async (snapshot) => {
      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "eventos", route.params.idEvento);
        const docSnap = await getDoc(docRef);

        const dato = docSnap.data();

        formik.setFieldValue("titulo", dato.titulo);
        formik.setFieldValue("descripcion", dato.descripcion);
        formik.setFieldValue("organizador", dato.organizador);
        formik.setFieldValue("email", dato.email);
        formik.setFieldValue("telefono", dato.telefono);
        formik.setFieldValue("ubicacion", dato.ubicacion);
        formik.setFieldValue("fotos", dato.fotos);
        formik.setFieldValue("id", dato.id);
        formik.setFieldValue("direccion", dato.direccion);
      }
    });

    return () => {
      setState({}); // This worked for me
    };
  }, []);

  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchem(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const nuevaData = formValues;

        await updateDoc(doc(db, "eventos", route.params.idEvento), nuevaData);
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Evento editado",
        });
        navigation.navigate(screen.account.account);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.screen}>
      <Text style={styles.titulo}>¡Edita tu evento!</Text>
      <View style={styles.content}>
        <ImageObject formik={formik} />
        <EditEventCard formik={formik} />
        <UploadImageForm formik={formik} />

        <Button
          title="Editar objeto"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        />
      </View>
    </ScrollView>
  );
}
