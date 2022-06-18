import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { getAuth } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { size } from "lodash";
import { db } from "../../../utils";
import { MyObjects } from "../../../components/Account";
import { NotFound, Loading } from "../../../components/Shared";
import { styles } from "./MyObjectsScreen.styles";

export function MyObjectsScreen() {
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

  if (size(objects) === 0) {
    return <NotFound texto={"No tienes ninguna publicación"} />;
  }

  return (
    <View style={styles.screen}>
      <MyObjects objects={objects} />
    </View>
  );
}

/*
     {!objects ? (
        <Loading show text="Cargando" />
      ) : (
        <MyObjects objects={objects} />
      )}
*/
