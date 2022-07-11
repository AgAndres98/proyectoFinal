import React, { useState, useEffect } from "react";
import { ScrollView, Dimensions } from "react-native";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../utils";
import { Header } from "../../../../components/Account/UserRequests/DetailUser/Header/Header";
import { Info } from "../../../../components/Account/UserRequests/DetailUser/Info/Info";
import { Carousel } from "../../../../components/Shared/Carousel/Carousel";
import { Loading } from "../../../../components/Shared/Loading/Loading";
import { styles } from "./DetailUserScreen.styles";

const { width } = Dimensions.get("window");
export function DetailUserScreen(props) {
  const { route } = props;
  let fotos = [];


  const [usuario, setusuario] = useState(null);

  useEffect(() => {
    setusuario(null);
    onSnapshot(doc(db, "datosPersonales", route.params.id), (doc) => {
      setusuario(doc.data());
    });
  }, [route.params.id]);

  if (!usuario) return <Loading show text="Cargando usuario" />;

  fotos = usuario.cuestionarioBeneficiario.fotos;
  fotos.push(route.params.item);


  if (fotos[0] === undefined) {
    fotos = [];
  }
  console.log(fotos);
  return (
    <ScrollView style={styles.content}>
      <Carousel arrayImages={fotos} height={330} width={width} />
      <Header usuario={usuario} />
      <Info usuario={usuario} />
    </ScrollView>
  );
}
