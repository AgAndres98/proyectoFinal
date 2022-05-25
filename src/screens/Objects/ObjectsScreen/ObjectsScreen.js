import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { Button } from "react-native-elements";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { LoadingModal } from "../../../components/Shared";
import { screen, db } from "../../../utils";
import { styles } from "./ObjectsScreen.styles";
import { ListObjects } from "../../../components/Objects";

export function ObjectsScreen(props) {
  const [objects, setObjects] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "objetos"), orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
      setObjects(snapshot.docs);
    });
  }, []);

  return (
    <View style={styles.content}>
      {!objects ? (
        <LoadingModal show text="Cargando" />
      ) : (
        <ListObjects objects={objects} />
      )}
    </View>
  );
}
