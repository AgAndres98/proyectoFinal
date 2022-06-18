import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { useFormik } from "formik";
import { DonationObjectCard } from "../../../../components/Donation/DonationObjectCard/DonationObjectCard";
import { UploadImageForm } from "../../../../components/Donation/UploadImage/UploadImageForm";
import { ImageObject } from "../../../../components/Donation/ImageObject/ImageObject";
import { styles } from "./EditObjectScreen.styles";
import { doc, query, collection, where, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../../utils";
import { initialValues, validationSchem } from "./EditObjectScreen.data";

//const idObjeto = "8d0c77c6-0db9-4b05-9243-6286eb44af08";

let objeto = [];

export function EditObjectScreen(props) {

  const {route} = props;

  useEffect(() => {
    const q = query(
      collection(db, "objetos"),
      where("id", "==", route.params.idObjeto)
    );

    onSnapshot(q, async (snapshot) => {
      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "objetos", route.params.idObjeto);
        const docSnap = await getDoc(docRef);

        const dato = docSnap.data();

        formik.setFieldValue("tipo", dato.tipo);
        formik.setFieldValue("titulo", dato.titulo);
        formik.setFieldValue("descripcion", dato.descripcion);
        formik.setFieldValue("ubicacion", dato.ubicacion);
        formik.setFieldValue("fotos", dato.fotos);
        formik.setFieldValue("activa", dato.activa);
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

        await updateDoc(doc(db, "objetos", idObjeto), nuevaData);

        navigation.navigate(screen.objects.tab);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (

    <ScrollView showsVerticalScrollIndicator={false} style={styles.screen}>
      <Text style={styles.titulo}>¡Edita tu objeto!</Text>
      <View style={styles.content}>
        <ImageObject formik={formik} />
        <DonationObjectCard formik={formik} />
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