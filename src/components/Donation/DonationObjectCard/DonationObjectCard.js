import React, { useState } from "react";

import { View, Text } from "react-native";
import { Input , Icon, Button } from "react-native-elements";
import { styles } from "./DonationObjectCard.styles"
import { MapForm } from "../MapForm";
import { Picker } from "@react-native-picker/picker"


export function DonationObjectCard(props) {

    const { formik } = props;

    const [showMap, setShowMap] = useState(false);

    const [selectObjecto, setSelectObjecto] = useState();

    const onOpenCloseMap = () => setShowMap((prevState) => !prevState);

    return (
        <>
        <View style={styles.contentAdentro} >
            <Input style={styles.input} placeholder="Titulo" onChangeText={(text) => formik.setFieldValue("titulo", text)} errorMessage={formik.errors.titulo}/>
            <Input placeholder="Descripción" multiline={true} onChangeText={(text) => formik.setFieldValue("descripcion", text)} errorMessage={formik.errors.descripcion}/>
            <Input placeholder={formik.values.ubicacion ? "Ubicación registrada" : "Ingrese ubicación"}
                editable={false}
                rightIcon={{
                    type: "material-community",
                    name: "map-marker-radius",
                    color: getColorIconoMapa(formik),
                    onPress: onOpenCloseMap,
                }}
            />
            <Text style={styles.textoSelect} >Elegir objeto a publicar</Text>
            <Picker
                selectedValue={formik.values.tipo}
                style={styles.selectDeObjeto}
                onValueChange={(itemValue, itemIndex) =>
                    formik.setFieldValue("tipo", itemValue)
                }>
                <Picker.Item label="Ropa" value="ropa" />
                <Picker.Item label="Electrodomesticos" value="electrodomesticos" />
                <Picker.Item label="Utiles escolares" value="utiles escolares" />
                <Picker.Item label="Objetos" value="objetos" />
                <Picker.Item label="Alimentos" value="alimentos" />
                <Picker.Item label="Otros" value="otros" />
            </Picker>
        </View>
      <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />
      </>
    );
  }


  const getColorIconoMapa = (formik) => {
      if(formik.errors.ubicacion) return "#ff0000";

      if(formik.values.ubicacion) return "#62bd60";

      return "#c2c2c2";
  }
