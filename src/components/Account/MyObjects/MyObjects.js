import React, { useState, useEffect } from "react";
import { View, FlatList, Switch } from "react-native";
import { Image, Text, Icon, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { styles } from "./MyObjects.styles";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc
} from "firebase/firestore";
import { forEach } from "lodash";
import { async } from "@firebase/util";


export function MyObjects(props) {
  const { objects } = props;
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState(null);
  const [request, setRequest] = useState(null);
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

  const goToRequest = (idObjeto, tipoObjeto) => {

    console.log(idObjeto);
    navigation.navigate(screen.account.userRequests, { idObjeto: idObjeto, tipoObjeto: tipoObjeto });
  }






  const onRemoveObject = async (id) => {

    console.log(id);

    try {

      const q = query(
        collection(db, "favorites"),
        where("idObjeto", "==", id)
      );

      const length = favorites.length;
      console.log(length);

      onSnapshot(q, (snapshot) => {
        setFavorites(snapshot.docs);
        forEach(favorites, async (item) => {
          console.log("BORRAR FAVORITO");
          console.log(item.id);
          await deleteDoc(doc(db, "favorites", item.id));
          favorites.splice(favorites[item])
        });
      });


      const q2 = query(
        collection(db, "requests"),
        where("idObjeto", "==", id)
      );
      onSnapshot(q2, (snapshot) => {
        setRequest(snapshot.docs);


        forEach(request, async (item) => {
          console.log("BORRAR REQUEST");
          console.log(item.id);
          await deleteDoc(doc(db, "requests", item.id));
        });
      });


      await deleteDoc(doc(db, "objetos", id));

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

                  <View style={styles.iconosContainer}>
                    <Icon
                      type="material-community"
                      name="pencil-outline"
                      size={35}
                      containerStyle={styles.edit}
                    // onPress={console.log("editar1")}
                    />

                    <Icon
                      type="material-community"
                      name="delete-outline"
                      size={35}
                      containerStyle={styles.delete}
                      onPress={() => { onRemoveObject(objeto.id) }}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.content}>
                <Button
                  title={"Ver solicitudes"}
                  containerStyle={styles.btnContainer}
                  buttonStyle={styles.btnSolicitudes}
                  onPress={() => { goToRequest(objeto.id, objeto.tipo) }}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}




