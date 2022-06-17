import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { Text, Icon, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./UserRequests.styles";
import { getAuth } from "firebase/auth";
import { Modal } from "../../Shared";
import { db } from "../../../utils";
import { size, forEach } from "lodash";

import {
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
export function UserRequests(props) {
  const [userModal, setUserModal] = useState(false);

  const { dato } = props;
  // const { idUsuario } = dato;
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

  const acceptReq = async (dato) => {
    try {
      const response = await getRequest(dato);
      forEach(response, async (item) => {
        await updateDoc(doc(db, "requests", item.id), {
          status: "Aceptado",
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const declineReq = async (dato) => {
    try {
      const response = await getRequest(dato);
      forEach(response, async (item) => {
        await updateDoc(doc(db, "requests", item.id), {
          status: "Rechazado",
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getRequest = async (dato) => {
    const q = query(
      collection(db, "requests"),
      where("idObjeto", "==", dato.idObjeto),
      where("idUserReq", "==", dato.idUserReq)
    );

    const result = await getDocs(q);
    return result.docs;
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={dato}
        renderItem={({ item }) => {
          console.log("idobjet " + item.idObjeto);
          console.log("id userreq " + item.idUserReq);

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
                    onPress={() => {
                      acceptReq(item);
                    }}
                  />

                  <Icon
                    type="material-community"
                    name="account-remove-outline"
                    size={35}
                    containerStyle={styles.delete}
                    onPress={() => {
                      declineReq(item);
                    }}
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
