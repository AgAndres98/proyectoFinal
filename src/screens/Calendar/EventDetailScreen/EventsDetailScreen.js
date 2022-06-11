import React, { useState, useEffect } from "react";
import { ScrollView, Dimensions } from "react-native";
import { View, Text } from "react-native";
import { NotFound } from "../../../components/Shared/NotFound";
import {
  doc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { size, map } from "lodash";
import { db } from "../../../utils";
import { styles } from "./EventsDetailScreen.styles";
import { Header } from "../../../components/Events/Header/Header";
import { Info } from "../../../components/Events/Info/Info";
import { Carousel, Loading } from "../../../components/Shared";

const { width } = Dimensions.get("window");
export function EventsDetailScreen(props) {
  const { route } = props;

  console.log(route.params);
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    setEvento(null);
    onSnapshot(doc(db, "eventos", route.params.id), (doc) => {
      setEvento(doc.data());
    });
  }, [route.params.id]);

  if (!evento) return <Loading show text="Cargando evento" />;

  return (
    <ScrollView style={styles.content}>
      <Carousel arrayImages={evento.fotos} height={330} width={width} />
      <Header evento={evento} />
      <Info evento={evento} />
    </ScrollView>
  );
}
