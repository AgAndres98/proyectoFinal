import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../utils";
import { ListObjects } from "../../../components/Objects";
import { LoadingModal } from "../../../components/Shared";
import { styles } from "./ObjectsScreen.styles";

export function ObjectsScreen(props) {
  const [objects, setObjects] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "objetos"),
      where("activa", "==", true),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setObjects(snapshot.docs);
    });
  }, []);

  return (
    <View style={styles.screen}>
      {!objects ? (
        <LoadingModal show text="Cargando" />
      ) : (
        <ListObjects objects={objects} />
      )}
    </View>
  );
}
