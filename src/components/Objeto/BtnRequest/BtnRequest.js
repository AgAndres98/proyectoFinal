import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { Button } from "react-native-elements";
import Toast from "react-native-toast-message";
import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
  collection,
  deleteDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db, screen } from "../../../utils";
import { v4 as uuid } from "uuid";
import { size, forEach } from "lodash";
import { styles } from "./BtnRequest.styles";
import { useNavigation } from "@react-navigation/native";

export function BtnRequest(props) {
  const navigation = useNavigation();
  const { idObjeto, idUsuario, tipo, solicitudesObjeto } = props;
  const auth = getAuth();
  const [isRequested, setIsRequested] = useState(undefined);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getRequested();
     // console.log(response);

      if (size(response) > 0) {
        setIsRequested(true);
      } else {
        setIsRequested(false);
      }
    })();
  }, [idObjeto, isReload]);

  const onReload = () => setIsReload((prevState) => !prevState);

  const getRequested = async () => {
    const q = query(
      collection(db, "requests"),
      where("idObjeto", "==", idObjeto),
      where("idUserReq", "==", auth.currentUser.uid)
    );

    const result = await getDocs(q);
    return result.docs;
  };

  const addRequest = async () => {
    try {
      await queryDatosPersonales();
      await updateDoc(doc(db, "objetos", idObjeto), {
        solicitudes: solicitudesObjeto + 1,
      });
      // const response = await getObject();
      //await updateTest("add", response.solicitudes);
      //await updateSolicitudes("add", response.solicitudes);
    } catch (error) {
      onReload();
      console.log(error);
    }
  };

  const cargarRequest = async (dato) => {
    const idRequest = uuid();
    onReload();
    let createdAt = new Date();
    let year=new Date().getFullYear();
    const data = {
      id: idRequest,
      idObjeto,
      idUsuario,
      tipo,
      idUserReq: auth.currentUser.uid,
      datosPersonales: dato,
      status: "Pendiente",
      createdAt: createdAt,
      year:year,
    };
    await setDoc(doc(db, "requests", idRequest), data);
  };

  const queryDatosPersonales = async () => {
    const q = query(
      collection(db, "datosPersonales"),
      where("idUsuario", "==", auth.currentUser.uid)
    );

    onSnapshot(q, async (snapshots) => {
      for await (const item of snapshots.docs) {
        const data = item.data();
        const docRef = doc(db, "datosPersonales", data.id);
        const docSnap = await getDoc(docRef);
        const newData = docSnap.data();
        newData.id = data.id;
        await cargarRequest(newData);
      }
    });
  };

  const cancelRequest = async () => {
    try {
      const response = await getRequested();

      forEach(response, async (item) => {
        await deleteDoc(doc(db, "requests", item.id));
      });

      await updateDoc(doc(db, "objetos", idObjeto), {
        solicitudes: solicitudesObjeto - 1,
      });

      //const objeto = await getObject();
      //await updateSolicitudes("cancel", objeto.solicitudes);

      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  const getObject = async () => {
    // const objectRef = db.collection('cities').doc('DC');

    const docRef = doc(db, "objetos", idObjeto);
    const docSnap = await getDoc(docRef);
    const res = await docRef.update({
      population: FieldValue.increment(50),
    });
    //const q = query(collection(db, "objetos"), where("id", "==", idObjeto));
    //db, "objetos", idObjeto
    //const result = await getDocs(q);
    return docSnap;
  };
  /*
  const getObject = async () => {
    
    const docRef = doc(db, "objetos", idObjeto);
    const docSnap = await getDoc(docRef);
    //const q = query(collection(db, "objetos"), where("id", "==", idObjeto));
    //db, "objetos", idObjeto
    //const result = await getDocs(q);
    return docSnap;
  };
  */

  const updateTest = async (tipo, value) => {
    if (tipo == "cancel") {
      let cant = value.solicitudes - 1;
      await updateDoc(doc(db, "objetos", idObjeto), {
        solicitudes: cant,
      });
    } else {
      let cant = value.solicitudes + 1;
      await updateDoc(doc(db, "objetos", idObjeto), {
        solicitudes: cant,
      });
    }
  };

  const updateSolicitudes = async (tipo, value) => {
    if (tipo == "cancel") {
      let cant = value.solicitudes - 1;
      await updateDoc(doc(db, "objetos", idObjeto), {
        solicitudes: cant,
      });
    } else {
      let cant = value.solicitudes + 1;
      await updateDoc(doc(db, "objetos", idObjeto), {
        solicitudes: cant,
      });
    }
  };

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

  const getFavorites = async (idObjeto) => {
    const q = query(
      collection(db, "favorites"),
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

      navigation.navigate(screen.objects.objects);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.content}>
      {isRequested !== undefined &&
        auth.currentUser.uid !== idUsuario &&
        auth.currentUser.email !== "exporeact.ayudar@gmail.com" && (
          <Button
            title={isRequested ? "Cancelar solicitud" : "Solicitar objeto"}
            containerStyle={styles.btnContainer}
            buttonStyle={isRequested ? styles.btnCancel : styles.btnReq}
            onPress={isRequested ? cancelRequest : addRequest}
          />
        )}

      {auth.currentUser.email == "exporeact.ayudar@gmail.com" && (
        <Button
          title={"Eliminar objeto"}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnCancel}
          onPress={() => {
            buttonDelete(idObjeto);
          }}
        />
      )}
    </View>
  );
}
