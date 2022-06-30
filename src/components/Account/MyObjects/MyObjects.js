import React, { useState, useEffect } from "react";
import { View, FlatList, Alert } from "react-native";
import { Image, Text, Icon, Button } from "react-native-elements";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { forEach } from "lodash";
import { db, screen } from "../../../utils";
import { SwitchBtn } from "../SwitchBtn";
import { styles } from "./MyObjects.styles";

export function MyObjects(props) {
  const { objects } = props;
  const navigation = useNavigation();

  const buttonDelete = (idObjeto) =>
    Alert.alert(
      "Eliminar objeto",
      "¿Esta seguro que desea eliminar este objeto?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelar"),
          style: "cancel",
        },
        {
          text: "Si",
          onPress: () => onRemoveObject(idObjeto),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );

  const goToRequest = (idObjeto, tipoObjeto, ubicacionObjeto) => {
    navigation.navigate(screen.account.userRequests, {
      idObjeto: idObjeto,
      tipoObjeto: tipoObjeto,
      ubicacionObjeto: ubicacionObjeto,
    });
  };

  const goToEdit = (idObjeto) => {
    navigation.navigate(screen.account.editObject, {
      idObjeto: idObjeto,
    });
  };

  const getFavorites = async (idObjeto) => {
    const q = query(
      collection(db, "favorites"),
      where("idObjeto", "==", idObjeto)
    );

    const result = await getDocs(q);
    return result.docs;
  };

  const getRequested = async (idObjeto) => {
    const q = query(
      collection(db, "requests"),
      where("idObjeto", "==", idObjeto)
    );

    const result = await getDocs(q);
    return result.docs;
  };

  const onRemoveObject = async (id) => {

    try {
      const favoritesCollection = await getFavorites(id);

      forEach(favoritesCollection, async (item) => {
        await deleteDoc(doc(db, "favorites", item.id));
      });

      const requestsCollection = await getRequested(id);

      forEach(requestsCollection, async (item) => {
        await deleteDoc(doc(db, "requests", item.id));
      });

      await deleteDoc(doc(db, "objetos", id));

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Objeto eliminado",
      });
    } catch (error) {
      console.log(error);
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
              {objeto.status == "Entregado" ? (
                <>
                  <View style={styles.objeto}>
                    <Image
                      source={{ uri: objeto.fotos[0] }}
                      style={styles.image}
                    />

                    <View style={styles.container}>
                      <Text style={styles.name}>{objeto.titulo}</Text>

                      <View style={styles.descripcionContainer}>
                        <Text style={styles.info}>{objeto.descripcion}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <Button
                      title={"Objeto entregado"}
                      containerStyle={styles.btnContainer}
                      buttonStyle={styles.btnSolicitudes}
                      disabled={true}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.objeto}>
                    <Image
                      source={{ uri: objeto.fotos[0] }}
                      style={styles.image}
                    />

                    <View style={styles.container}>
                      <Text style={styles.name}>{objeto.titulo}</Text>

                      <SwitchBtn activa={objeto.activa} idObjeto={objeto.id} />

                      <View style={styles.descripcionContainer}>
                        <Text style={styles.info}>{objeto.descripcion}</Text>
                      </View>

                      <View style={styles.iconosContainer}>
                        <Icon
                          type="material-community"
                          name="pencil-outline"
                          size={35}
                          containerStyle={styles.edit}
                          onPress={() => {
                            goToEdit(objeto.id);
                          }}
                        />

                        <Icon
                          type="material-community"
                          name="delete-outline"
                          size={35}
                          containerStyle={styles.delete}
                          onPress={() => {
                            buttonDelete(objeto.id);
                          }}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.content}>
                    <Button
                      title={"Ver solicitudes"}
                      containerStyle={styles.btnContainer}
                      buttonStyle={styles.btnSolicitudes}
                      onPress={() => {
                        goToRequest(objeto.id, objeto.tipo, objeto.ubicacion);
                      }}
                    />
                  </View>
                </>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

/*

              <View style={styles.objeto}>
                <Image source={{ uri: objeto.fotos[0] }} style={styles.image} />

                <View style={styles.container}>
                  <Text style={styles.name}>{objeto.titulo}</Text>

                  <SwitchBtn activa={objeto.activa} idObjeto={objeto.id} />

                  <View style={styles.descripcionContainer}>
                    <Text style={styles.info}>{objeto.descripcion}</Text>
                  </View>

                  <View style={styles.iconosContainer}>
                    <Icon
                      type="material-community"
                      name="pencil-outline"
                      size={35}
                      containerStyle={styles.edit}
                      onPress={() => {
                        goToEdit(objeto.id);
                      }}
                    />

                    <Icon
                      type="material-community"
                      name="delete-outline"
                      size={35}
                      containerStyle={styles.delete}
                      onPress={() => {
                        buttonDelete(objeto.id);
                      }}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.content}>
                <Button
                  title={"Ver solicitudes"}
                  containerStyle={styles.btnContainer}
                  buttonStyle={styles.btnSolicitudes}
                  onPress={() => {
                    goToRequest(objeto.id, objeto.tipo);
                  }}
                />
              </View>
              */
