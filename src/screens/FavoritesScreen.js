import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { ObjectFavorites } from "../components/Favorites";
import { NotFound } from "../components/Shared";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { size, map } from "lodash";
import { Loading } from "../components/Shared";
import { db } from "../utils";
import { styles } from "./Screens.styles";

export function FavoritesScreen() {
  const auth = getAuth();
  const [objects, setObjects] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "favorites"),
      where("idUser", "==", auth.currentUser.uid)
    );

    onSnapshot(q, async (snapshot) => {
      let objectArray = [];

      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "objetos", data.idObjeto);
        const docSnap = await getDoc(docRef);
        const newData = docSnap.data();
        newData.idFavorite = data.id;

        objectArray.push(newData);
      }
      setObjects(objectArray);
    });
  }, []);

  if (!objects) return <Loading show text="Cargando" />;

  if (size(objects) === 0)
    return <NotFound texto={"No tienes objetos en favoritos"} />;

  return (
    <ScrollView style={styles.screen}>
      {map(objects, (objeto) => (
        <ObjectFavorites key={objeto.id} objeto={objeto} />
      ))}
    </ScrollView>
  );
}
