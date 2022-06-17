import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { ListEvents } from "../../../components/Calendar";
import { NotFound } from "../../../components/Shared";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";
import { size } from "lodash";
import { Loading } from "../../../components/Shared";
import { db } from "../../../utils";
import { styles } from "./CalendarScreen.styles";

export function CalendarScreen() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "eventos"),
      where("fechaDate", ">=", new Date()),
      orderBy("fechaDate", "asc")
    );

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
