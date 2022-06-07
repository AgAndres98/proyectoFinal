import React, { useState } from "react";

import { View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { styles } from "./CreateEventCard.styles";
import { MapForm } from "../../Donation";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export function CreateEventCard(props) {
  const { formik } = props;

  const [showMap, setShowMap] = useState(false);

  const [selectObjecto, setSelectObjecto] = useState();

  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setIsPickerShow(false);
    setDate(value);
    formik.setFieldValue("fecha", value.toLocaleDateString("en-GB"));
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  const onOpenCloseMap = () => setShowMap((prevState) => !prevState);

  return (
    <>
      <View style={styles.contentAdentro}>
        <Input
          style={styles.input}
          placeholder="Titulo"
          onChangeText={(text) => formik.setFieldValue("titulo", text)}
          errorMessage={formik.errors.titulo}
        />
        <Input
          style={styles.input}
          placeholder="Organizador"
          onChangeText={(text) => formik.setFieldValue("organizador", text)}
          errorMessage={formik.errors.organizador}
        />
        <Input
          placeholder="Descripción"
          multiline={true}
          onChangeText={(text) => formik.setFieldValue("descripcion", text)}
          errorMessage={formik.errors.descripcion}
        />
        <Input
          placeholder="Número de celular"
          keyboardType="number-pad"
          onChangeText={(text) => formik.setFieldValue("telefono", text)}
          errorMessage={formik.errors.telefono}
        />

        <Input
          placeholder="Email"
          onChangeText={(text) => formik.setFieldValue("email", text)}
          errorMessage={formik.errors.email}
        />
        <Input
          style={styles.input}
          placeholder="Dirección"
          onChangeText={(text) => formik.setFieldValue("direccion", text)}
          errorMessage={formik.errors.direccion}
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

        <Input
          placeholder="Fecha"
          value={date.toLocaleDateString("en-GB")}
          disabled={true}
          rightIcon={{
            type: "material-community",
            name: "calendar",
            color: "#62bd60",
            onPress: showPicker,
          }}
          errorMessage={formik.errors.fecha}
        />

        {/* The date picker */}
        {isPickerShow && (
          <DateTimePicker
            value={date}
            mode={"date"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChange}
            style={styles.datePicker}
          />
        )}
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
