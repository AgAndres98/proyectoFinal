import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { Icon } from "react-native-elements";
import { Button } from "react-native-elements";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  where,
  getDoc,
} from "firebase/firestore";
import { LoadingModal } from "../../../components/Shared";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { styles } from "./ObjectsScreen.styles";
import { ListObjects } from "../../../components/Objects";

export function ObjectsScreen(props) {
  const [objects, setObjects] = useState(null);
  const navigation = useNavigation();

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
