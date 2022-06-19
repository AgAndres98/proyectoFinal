import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
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
import { db } from "../../../utils";
import { v4 as uuid } from "uuid";
import { size, forEach } from "lodash";
import { styles } from "./BtnRequest.styles";

export function BtnRequest(props) {
  const { idObjeto, idUsuario } = props;
  const auth = getAuth();
  const [isRequested, setIsRequested] = useState(undefined);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getRequested();

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
    const data = {
      id: idRequest,
      idObjeto,
      idUsuario,
      idUserReq: auth.currentUser.uid,
      datosPersonales: dato,
      status: "Pendiente",
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

      //const objeto = await getObject();
      //await updateSolicitudes("cancel", objeto.solicitudes);

      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  const getObject = async () => {
    // const objectRef = db.collection('cities').doc('DC');

    console.log(idObjeto);
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
    console.log(idObjeto);
    const docRef = doc(db, "objetos", idObjeto);
    const docSnap = await getDoc(docRef);
    //const q = query(collection(db, "objetos"), where("id", "==", idObjeto));
    //db, "objetos", idObjeto
    //const result = await getDocs(q);
    return docSnap;
  };
  */

  const updateTest = async (tipo, value) => {
    console.log(tipo + "-" + value.solicitudes);
    if (tipo == "cancel") {
      let cant = value.solicitudes - 1;
      await updateDoc(doc(db, "objetos", idObjeto), {
        solicitudes: cant,
      });
    } else {
      console.log(value);
      let cant = value.solicitudes + 1;
      await updateDoc(doc(db, "objetos", idObjeto), {
        solicitudes: cant,
      });
    }
  };

  const updateSolicitudes = async (tipo, value) => {
    console.log(tipo + "-" + value.solicitudes);
    if (tipo == "cancel") {
      let cant = value.solicitudes - 1;
      await updateDoc(doc(db, "objetos", idObjeto), {
        solicitudes: cant,
      });
    } else {
      console.log(value);
      let cant = value.solicitudes + 1;
      await updateDoc(doc(db, "objetos", idObjeto), {
        solicitudes: cant,
      });
    }
  };

  return (
    <View style={styles.content}>
      {isRequested !== undefined && auth.currentUser.uid !== idUsuario && (
        <Button
          title={isRequested ? "Cancelar solicitud" : "Solicitar objeto"}
          containerStyle={styles.btnContainer}
          buttonStyle={isRequested ? styles.btnCancel : styles.btnReq}
          onPress={isRequested ? cancelRequest : addRequest}
        />
      )}
    </View>
  );
}
