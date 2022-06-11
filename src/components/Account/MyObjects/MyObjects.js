import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Switch } from "react-native";
import { Image, Text, Icon, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { styles } from "./MyObjects.styles";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useFormik } from "formik";
//import {UserRequest} from "../UserRequests/UserRequests";

export function MyObjects(props) {
  const { objects } = props;
  const navigation = useNavigation();

  const [isEnabled, setIsEnabled] = useState(true);
  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const toggleSwitch = (idObjeto, activa) => {
    try {
      console.log(activa);
      if (activa == true) {
        setIsEnabled(false);
      }
      if (activa == false) {
        setIsEnabled(true);
      }
      updateDoc(doc(db, "objetos", idObjeto), {
        activa: isEnabled ? true : false,
      });

    } catch (error) {
      console.log("error");
    }
  };

  const gotToRequest = (idObjeto, tipoObjeto) => {

    console.log(idObjeto);
    navigation.navigate(screen.account.userRequests, { idObjeto: idObjeto, tipoObjeto: tipoObjeto });
  }

  const onRemoveObject = async (id) => {
    try {
      const idObjeto = id;
      await deleteDoc(doc(db, "objetos", id));
      // await deleteDoc(doc(db, "favorites", idObjeto));
      // await deleteDoc(doc(db, "request", idObjeto));
    } catch (error) {
      console.log("error");
    }
  };



  return (
    <View style={styles.screen}>
      <FlatList
        data={objects}
        renderItem={(doc) => {
          const objeto = doc.item.data();
          return (
            <View style={styles.objetoContainer}>
              <View style={styles.objeto}>
                <Image source={{ uri: objeto.fotos[0] }} style={styles.image} />

                <View style={styles.container}>
                  <Text style={styles.name}>{objeto.titulo}</Text>

                  <View style={styles.switchView}>
                    <Text style={styles.active}>
                      {objeto.activa ? "Activa" : "Inactiva"}
                    </Text>
                    <Switch
                      trackColor={{ false: "#767577", true: "#767577" }}
                      thumbColor={objeto.activa ? "#62bd60" : "#f4f3f4"}
                      ios_backgroundColor="#62bd60"
                      onValueChange={() => { toggleSwitch(objeto.id, objeto.activa) }}
                      value={objeto.activa}
                      style={styles.switch}
                    />
                  </View>

                  <View style={styles.descripcionContainer}>
                    <Text style={styles.info}>{objeto.descripcion}</Text>
                  </View>

                  <Icon
                    type="material-community"
                    name="delete-outline"
                    size={35}
                    containerStyle={styles.delete}
                    onPress={() => { onRemoveObject(objeto.id) }}
                  />

                  <Icon
                    type="material-community"
                    name="account-eye-outline"
                    size={35}
                    containerStyle={styles.eye}
                    onPress={() => { gotToRequest(objeto.id, objeto.tipo) }}
                  />
                </View>
              </View>

              <View style={styles.content}>
                <Button
                  title={"Ver solicitudes"}
                  containerStyle={styles.btnContainer}
                  buttonStyle={styles.btnSolicitudes}
                  onPress={goToRequest}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
