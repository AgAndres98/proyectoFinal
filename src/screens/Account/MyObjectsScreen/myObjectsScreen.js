import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
  Firestore,
} from "firebase/firestore";
import { size, map } from "lodash";
import { db } from "../../../utils";
import { Loading } from "../../../components/Shared";
import { MyObjects } from "../../../components/Account";
import { NotFound } from "../../../components/Shared";

//import { styles } from "../../../components/Account/MyObjects/MyObjects.styles";
import { styles } from "./MyObjectsScreen.styles";

export function MyObjectsScreen(props) {
  const auth = getAuth();
  const [objects, setObjects] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "objetos"),
      where("idUsuario", "==", auth.currentUser.uid)
    );

    onSnapshot(q, (snapshot) => {
      setObjects(snapshot.docs);
    });
  }, []);

  if (!objects) return <Loading show text="Cargando" />;

  if (size(objects) === 0)
    return <NotFound texto={"No tienes ninguna publicación"} />;

  return (
    <View style={styles.screen}>
      {!objects ? (
        <LoadingModal show text="Cargando" />
      ) : (
        <MyObjects objects={objects} />
      )}
    </View>
  );
}
