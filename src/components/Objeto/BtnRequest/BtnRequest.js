import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  query,
  where,
  collection,
  deleteDoc,
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
      const idRequest = uuid();
      onReload();
      const data = {
        id: idRequest,
        idObjeto,
        idUsuario,
        idUserReq: auth.currentUser.uid,
      };
      await setDoc(doc(db, "requests", idRequest), data);
    } catch (error) {
      onReload();
      console.log(error);
    }
  };

  const cancelRequest = async () => {
    try {
      const response = await getRequested();

      forEach(response, async (item) => {
        await deleteDoc(doc(db, "requests", item.id));
      });
      onReload();
    } catch (error) {
      console.log(error);
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
