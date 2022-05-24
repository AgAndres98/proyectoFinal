import React, { useState, useEffect } from "react";
import { ScrollView, Dimensions, Text } from "react-native";
import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { styles } from "./ObjectScreen.styles";
import { Carousel, Loading } from "../../../components/Shared";
import { db } from "../../../utils";
import { Header, Info, BtnFavorite } from "../../../components/Objeto";

const { width } = Dimensions.get("window");

export function ObjectScreen(props) {
  const { route } = props;
  const [objeto, setObjeto] = useState(null);

  useEffect(() => {
    setObjeto(null);
    onSnapshot(doc(db, "objetos", route.params.id), (doc) => {
      setObjeto(doc.data());
    });
  }, [route.params.id]);

  if (!objeto) return <Loading show text="Cargando objeto" />;

  return (
    <ScrollView style={styles.content}>
      <Carousel arrayImages={objeto.fotos} height={250} width={width} />
      <Header objeto={objeto} />
      <BtnFavorite idObjeto={route.params.id} />
      {/*
       Object
      <Info objeto={route.params.objeto} />
  */}
    </ScrollView>
  );
}
