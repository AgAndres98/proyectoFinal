import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import { styles } from "./EditEventCard.styles";
import { MapForm } from "../../Donation/MapForm";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export function EditEventCard(props) {
  const { formik } = props;

  const [showMap, setShowMap] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [selectObjecto, setSelectObjecto] = useState();

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
          placeholder="Organizador"
          value={formik.values.organizador}
          multiline={true}
          onChangeText={(text) => formik.setFieldValue("organizador", text)}
          errorMessage={formik.errors.organizador}
        />

        <TouchableOpacity onPress={showPicker}>
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
        </TouchableOpacity>

        {/* The date picker */}
        {isPickerShow && (
          <DateTimePicker
            value={date}
            mode={"date"}
            minimumDate={new Date()}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChange}
            style={styles.datePicker}
          />
        )}

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
