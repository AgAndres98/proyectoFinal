import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { styles } from "./Info.styles";
import { Map } from "../../Shared";

export function Info(props) {
  const { evento } = props;


  return (
    <View style={styles.content}>
      <Text style={styles.title}>Información:</Text>
      <Map ubicacion={evento.ubicacion} titulo={evento.titulo} />
    </View>
  );
}
