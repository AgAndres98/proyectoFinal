import React, { useState, useEffect } from "react";
import { ScrollView, Dimensions } from "react-native";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../utils";
import { Header, Info } from "../../../components/Events";
import { Carousel, Loading } from "../../../components/Shared";
import { styles } from "./EventDetailScreen.styles";

const { width } = Dimensions.get("window");
export function EventDetailScreen(props) {
  const { route } = props;

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
