import React, { useState } from "react";

import { View, Text, ScrollView, Alert } from "react-native";
import { Icon, Avatar } from "react-native-elements";
import { Input } from "react-native-elements";
import { styles } from "./BeneficiaryQuestionnaireForm.styles";
import { Picker } from "@react-native-picker/picker";
import { MapForm } from "../../Donation/MapForm";
import Checkbox from "expo-checkbox";
import { RadioButton } from "react-native-paper";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { map, filter } from "lodash";
import * as ImagePicker from "expo-image-picker";

export function BeneficiaryQuestionnaireForm(props) {
  const { formik } = props;

  const [showMap, setShowMap] = useState(false);

  const [isCheckedRopa, setCheckedRopa] = useState(false);
  const [isCheckedObjetos, setCheckedObjetos] = useState(false);
  const [isCheckedAlimentos, setCheckedAlimentos] = useState(false);
  const [isCheckedElectrodomesticos, setCheckedElectrodomesticos] =
    useState(false);
  const [isCheckedUtiles, setCheckedUtiles] = useState(false);
  const [isCheckedOtros, setCheckedOtros] = useState(false);

  const onOpenCloseMap = () => setShowMap((prevState) => !prevState);

  const changeRopa = () => {
    setCheckedRopa((isCheckedRopa) => !isCheckedRopa);
    formik.setFieldValue("ropa", !isCheckedRopa);
  };

  const changeObjetos = () => {
    setCheckedObjetos((isCheckedObjetos) => !isCheckedObjetos);
    formik.setFieldValue("objetos", !isCheckedObjetos);
  };

  const changeAlimentos = () => {
    setCheckedAlimentos((isCheckedAlimentos) => !isCheckedAlimentos);
    formik.setFieldValue("alimentos", !isCheckedAlimentos);
  };

  const changeElectrodomesticos = () => {
    setCheckedElectrodomesticos(
      (isCheckedElectrodomesticos) => !isCheckedElectrodomesticos
    );
    formik.setFieldValue("electrodomesticos", !isCheckedElectrodomesticos);
  };

  const changeUtiles = () => {
    setCheckedUtiles((isCheckedUtiles) => !isCheckedUtiles);
    formik.setFieldValue("utiles", !isCheckedUtiles);
  };

  const changeOtros = () => {
    setCheckedOtros((isCheckedOtros) => !isCheckedOtros);
    formik.setFieldValue("otros", !isCheckedOtros);
  };

  const abrirGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      guardarImagen(result.uri);
    }
  };

  const guardarImagen = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `beneficiario/${uuid()}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      updateFotoObjeto(snapshot.metadata.fullPath);
    });
  };

  const updateFotoObjeto = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    const imageUrl = await getDownloadURL(imageRef);
    formik.setFieldValue("fotos", [...formik.values.fotos, imageUrl]);
  };

  const eliminarImagen = (img) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Estás seguro que deseas eliminar esta imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            const result = filter(
              formik.values.fotos,
              (image) => image !== img
            );
            formik.setFieldValue("fotos", result);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <View style={styles.contentAdentro}>
        <Text style={{ marginLeft: 7 }}>Motivo</Text>
        <Picker
          selectedValue={formik.values.motivo}
          style={styles.selectDeObjeto}
          onValueChange={(itemValue, itemIndex) =>
            formik.setFieldValue("motivo", itemValue)
          }
        >
          <Picker.Item label="Incendio" value="incendio" />
          <Picker.Item label="Tsunami" value="tsunami" />
          <Picker.Item label="Inundación" value="inundacion" />
          <Picker.Item label="Situación de calle" value="gente" />
        </Picker>
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
        <Text style={styles.tituloNecesidad}>¿Cuales son tus necesidades?</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={formik.values.ropa}
              onValueChange={changeRopa}
              color={isCheckedRopa ? "#62bd60" : undefined}
            />
            <Text style={styles.paragraph}>Ropa</Text>
          </View>
          <View style={styles.sectionObjetos}>
            <Checkbox
              style={styles.checkbox}
              value={formik.values.objetos}
              onValueChange={changeObjetos}
              color={isCheckedObjetos ? "#62bd60" : undefined}
            />
            <Text style={styles.paragraph}>Objetos</Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={formik.values.alimentos}
              onValueChange={changeAlimentos}
              color={isCheckedAlimentos ? "#62bd60" : undefined}
            />
            <Text style={styles.paragraph}>Alimentos</Text>
          </View>
          <View style={styles.sectionElectrodomesticos}>
            <Checkbox
              style={styles.checkbox}
              value={formik.values.electrodomesticos}
              onValueChange={changeElectrodomesticos}
              color={isCheckedElectrodomesticos ? "#62bd60" : undefined}
            />
            <Text style={styles.paragraph}>Electrodomésticos</Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={formik.values.utiles}
              onValueChange={changeUtiles}
              color={isCheckedUtiles ? "#62bd60" : undefined}
            />
            <Text style={styles.paragraph}>Utiles escolares</Text>
          </View>
          <View style={styles.sectionOtros}>
            <Checkbox
              style={styles.checkbox}
              value={formik.values.otros}
              onValueChange={changeOtros}
              color={isCheckedOtros ? "#62bd60" : undefined}
            />
            <Text style={styles.paragraph}>Otros</Text>
          </View>
        </View>
        <Text style={styles.titulo}>¿Quienes necesitan ayuda?</Text>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <RadioButton
            value="yo"
            label="Únicamente yo"
            status={formik.values.ayuda === "yo" ? "checked" : "unchecked"}
            onPress={() => {
              formik.setFieldValue("ayuda", "yo");
            }}
          />
          <Text>Únicamente yo</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <RadioButton
            value="familia"
            label="Únicamente yo"
            status={formik.values.ayuda === "familia" ? "checked" : "unchecked"}
            onPress={() => {
              formik.setFieldValue("ayuda", "familia");
            }}
          />
          <Text>Mi familia y yo</Text>
        </View>
        <Input
          placeholder="Explique lo que le sucedio y sus necesidades"
          value={formik.values.descripcion}
          style={{ marginTop: 10 }}
          multiline={true}
          onChangeText={(text) => formik.setFieldValue("descripcion", text)}
          errorMessage={formik.errors.descripcion}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.viewImage}
        >
          <Icon
            type="material-community"
            name="camera"
            color="#62bd60"
            containerStyle={styles.containerIcon}
            onPress={abrirGaleria}
          />

          {map(formik.values.fotos, (image) => (
            <Avatar
              key={image}
              source={{ uri: image }}
              containerStyle={styles.imagenStyle}
              onPress={() => eliminarImagen(image)}
            />
          ))}
        </ScrollView>
        <Text style={styles.error}>{formik.errors.fotos}</Text>
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
