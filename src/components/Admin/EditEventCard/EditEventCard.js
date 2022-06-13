import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input } from "react-native-elements";
import { styles } from "./EditEventCard.styles";
import { MapForm } from "../../Donation/MapForm";
import { Picker } from "@react-native-picker/picker";

export function EditEventCard(props) {
  const { formik } = props;

  const [showMap, setShowMap] = useState(false);

  const [selectObjecto, setSelectObjecto] = useState();

  const onOpenCloseMap = () => setShowMap((prevState) => !prevState);

  return (
    <>
      <View style={styles.contentAdentro}>
        <Input
          style={styles.input}
          value={formik.values.titulo}
          placeholder="Titulo"
          onChangeText={(text) => formik.setFieldValue("titulo", text)}
          errorMessage={formik.errors.titulo}
        />
        <Input
          placeholder="Descripción"
          value={formik.values.descripcion}
          multiline={true}
          onChangeText={(text) => formik.setFieldValue("descripcion", text)}
          errorMessage={formik.errors.descripcion}
        />
        <Input
          placeholder={
            formik.values.ubicacion
              ? "Ubicación registrada"
              : "Ingrese ubicación"
          }
          editable={false}
          rightIcon={{
            type: "material-community",
            name: "map-marker-radius",
            color: getColorIconoMapa(formik),
            onPress: onOpenCloseMap,
          }}
        />
      </View>
      <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />
    </>
  );
}

const getColorIconoMapa = (formik) => {
  if (formik.errors.ubicacion) return "#ff0000";

  if (formik.values.ubicacion) return "#62bd60";

  return "#c2c2c2";
};
