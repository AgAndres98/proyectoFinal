import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Text, Icon, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { styles } from "./UserRequests.styles";
import { doc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { object } from "yup";
import { Modal, UserDataModal } from "../../Shared";
import { map } from "lodash";

import { getStorage, ref, getDownloadURL } from "firebase/storage";
export function UserRequests(props) {
  const [userModal, setUserModal] = useState(false);

  const { dato } = props;
  const { idUsuario } = dato;
  const { photoURL } = getAuth();

  const navigation = useNavigation();

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const selectComponent = () => {};

  // Create a reference to the file we want to download

  //   return(
  //     <View>{}dato.map((data)=>{

  //     })</View>
  //     );

  return (
    <View style={styles.screen}>
      <FlatList
        data={dato}
        renderItem={({ item }) => {
          // const peticion = doc.item.data();
          //  require("../../../../assets/icon.png")
          return (
            <View style={styles.objeto}>
              <Avatar
                size="large"
                icon={{ type: "material", name: "person" }}
                source={avatarUri(item.foto)}
                containerStyle={styles.imageContainer}
                avatarStyle={styles.image}
              />

              <View style={styles.container}>
                <View style={styles.informacion}>
                  <Text style={styles.name}>
                    {item.datosPersonales.nombre +
                      " " +
                      item.datosPersonales.apellido}
                  </Text>
                </View>

                <View style={styles.iconContainer}>
                  <Icon
                    solid="true"
                    type="material-community"
                    name="account-check-outline"
                    size={35}
                    containerStyle={styles.accept}
                    onPress={console.log("editar")}
                  />

                  <Icon
                    type="material-community"
                    name="account-remove-outline"
                    size={35}
                    containerStyle={styles.delete}
                    onPress={console.log("delete")}
                  />

                  <Icon
                    type="material-community"
                    name="account-search-outline"
                    size={35}
                    containerStyle={styles.eye}
                    onPress={console.log(selectComponent)}
                  />
                </View>
              </View>
            </View>
          );
        }}
      />
      <Modal show={userModal}>
        <Text>Información sobre el usuario</Text>
        <Avatar
          size="large"
          icon={{ type: "material", name: "person" }}
          containerStyle={styles.image}
        />
        <Text>Email</Text>
        <Text>Telefono</Text>
        <Text>Descripcion</Text>
      </Modal>
    </View>
  );

  function avatarUri(item) {
    if (item !== undefined) {
      return (uri = { uri: item });
    } else {
      return require("../../../../assets/usuario2.png");
    }
  }
}
