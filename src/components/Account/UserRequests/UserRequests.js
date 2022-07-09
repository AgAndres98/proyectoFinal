import React, { useState } from "react";
import { View, FlatList, Alert } from "react-native";
import { Text, Icon, Avatar, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./UserRequests.styles";
import { getAuth } from "firebase/auth";
import { Modal } from "../../Shared";
import { db, screen } from "../../../utils";
import { size, forEach } from "lodash";
import { v4 as uuid } from "uuid";
import Toast from "react-native-toast-message";
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

  const { dato, solicitudesObjeto, idObjeto } = props;

  // const { idUsuario } = dato;
  const auth = getAuth();
  const { photoURL } = getAuth();

  const navigation = useNavigation();

  const [isEnabled, setIsEnabled] = useState(true);
  const [name, setName] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const selectComponent = () => { };

  // Create a reference to the file we want to download

  //   return(
  //     <View>{}dato.map((data)=>{

  //     })</View>
  //     );
  const buttonPendingReq = (dato) =>
    Alert.alert(
      "Cambiar estado de solicitud",
      "¿Esta seguro que desea cambiar la solicitud a estado pendiente? Descuida, podras tanto aceptarla como rechazarla luego.",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelar"),
          style: "cancel",
        },
        {
          text: "Si",
          onPress: () => pendingReq(dato),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );

  const pendingReq = async (dato) => {
    try {
      const response = await getRequest(dato);
      forEach(response, async (item) => {
        await updateDoc(doc(db, "requests", item.id), {
          status: "Pendiente",
        });
      });

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Solicitud pendiente",
        text2: "La solicitud se ha devuelto a estado pendiente",
      });

      navigation.navigate(screen.account.myObjects);
    } catch (error) {
      console.log(error);
    }
  };

  const buttonAcceptReq = (dato) =>
    Alert.alert(
      "Aceptar solicitud",
      "¿Esta seguro que desea aceptar la solicitud? Descuida, podras modificarla luego. Al entregar el objeto confirme la entrega porfavor",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelar"),
          style: "cancel",
        },
        {
          text: "Si",
          onPress: () => acceptReq(dato),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );

  const acceptReq = async (dato) => {
    try {
      const response = await getRequest(dato);
      forEach(response, async (item) => {
        await updateDoc(doc(db, "requests", item.id), {
          status: "Aceptado",
        });
      });

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Solicitud aceptada",
        text2: "Al entregar el objeto confirme la entrega porfavor",
      });
      navigation.navigate(screen.account.myObjects);
    } catch (error) {
      console.log(error);
    }
  };

  const buttonConfirmReq = (dato) =>
    Alert.alert(
      "Confirmar entrega",
      "Si ha entregado el objeto presione si. Cuidado, esto no podrá ser modificado más tarde. ",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelar"),
          style: "cancel",
        },
        {
          text: "Si",
          onPress: () => confirmReq(dato),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );



  const confirmReq = async (dato) => {
    try {
      await updateDoc(doc(db, "requests", dato.id), {
        status: "Entregado",
      });

      await updateDoc(doc(db, "objetos", dato.idObjeto), {
        status: "Entregado",
        activa: false,
      });

      const favoritesCollection = await getFavorites(dato);
      forEach(favoritesCollection, async (item) => {
        await deleteDoc(doc(db, "favorites", item.id));
      });

      await cancelAllReq(dato);




      const idDelivered = uuid();
      let createdAt = new Date();
      console.log(dato);
      const data = {
        id: idDelivered,
        idReq: dato.id,
        idObjeto: dato.idObjeto,
        tipo: dato.tipo,
        idUserDonator: auth.currentUser.uid,
        idUserReq: dato.idUserReq,
        createdAt: createdAt,
        nombre: dato.datosPersonales.apellido,

      };

      await setDoc(doc(db, "delivered", idDelivered), data);

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Confirmación de entrega",
        text2: "¡Muchas gracias por ayudar!",
      });

      navigation.navigate(screen.account.myObjects);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelAllReq = async (dato) => {
    try {
      const response = await getAllRequest(dato);

      forEach(response, async (item) => {
        await deleteDoc(doc(db, "requests", item.id));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getFavorites = async (dato) => {
    const q = query(
      collection(db, "favorites"),
      where("idObjeto", "==", dato.idObjeto)
    );

    const result = await getDocs(q);
    return result.docs;
  };

  const buttonDeclineReq = (dato) =>
    Alert.alert(
      "Rechazar solicitud",
      "Al rechazar la solicitud ya no aparecera en el listado de solicitud. Atención, esto no es reversible. ",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelar"),
          style: "cancel",
        },
        {
          text: "Si",
          onPress: () => declineReq(dato),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );

  const declineReq = async (dato) => {
    try {
      const response = await getRequest(dato);
      forEach(response, async (item) => {
        await updateDoc(doc(db, "requests", item.id), {
          status: "Rechazado",
        });
      });

      await updateDoc(doc(db, "objetos", idObjeto), {
        solicitudes: solicitudesObjeto - 1,
      });

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Se ha rechazado la solicitud",
      });
      navigation.navigate(screen.account.myObjects);
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

  const getAllRequest = async (dato) => {
    const q = query(
      collection(db, "requests"),
      where("idObjeto", "==", dato.idObjeto),
      where("idUserReq", "!=", dato.idUserReq)
    );

    const result = await getDocs(q);
    return result.docs;
  };

  const goToUser = (id) => {
    console.log(id);
    navigation.navigate(screen.account.DetailUser, { id: id });
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={dato}
        renderItem={({ item }) => {
          // const peticion = doc.item.data();
          //  require("../../../../assets/icon.png")
          return (
            <View style={styles.objetoContainer}>
              {item.status == "Aceptado" ? (
                <>
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

                      <View style={styles.iconContainer2}>
                        <Icon
                          type="material-community"
                          name="account-remove-outline"
                          size={35}
                          containerStyle={styles.delete}
                          onPress={() => {
                            buttonPendingReq(item);
                          }}
                        />

                        <Icon
                          type="material-community"
                          name="account-search-outline"
                          size={35}
                          containerStyle={styles.eye}
                          onPress={() => {
                            goToUser(item.idUserReq);
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <Button
                    title={"Confirmar entrega"}
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btnSolicitudes}
                    onPress={() => {
                      buttonConfirmReq(item);
                      //confirmReq(item)
                    }}
                  />
                </>
              ) : (
                <>
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
                            buttonAcceptReq(item);
                          }}
                        />

                        <Icon
                          type="material-community"
                          name="account-remove-outline"
                          size={35}
                          containerStyle={styles.delete}
                          onPress={() => {
                            buttonDeclineReq(item);
                          }}
                        />

                        <Icon
                          type="material-community"
                          name="account-search-outline"
                          size={35}
                          containerStyle={styles.eye}
                          onPress={() => {
                            goToUser(item.idUserReq);
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </>
              )}
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
/*
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
*/
