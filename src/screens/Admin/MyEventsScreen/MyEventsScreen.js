import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { size } from "lodash";
import { db } from "../../../utils";
import { ListEvents } from "../../../components/Admin";
import { NotFound, Loading } from "../../../components/Shared";
import { styles } from "./MyEventsScreen.styles";

export function MyEventsScreen() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "eventos"), orderBy("fecha", "desc"));

    onSnapshot(q, (snapshot) => {
      setEvents(snapshot.docs);
    });
  }, []);

  if (!events) return <Loading show text="Cargando" />;

  if (size(events) === 0) return <NotFound texto={"No hay eventos"} />;

  return (
    <View style={styles.screen}>
      <ListEvents events={events} />
    </View>
  );
}
