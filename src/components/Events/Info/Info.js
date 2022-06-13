import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { styles } from "./Info.styles";
import { Map } from "../../Shared";

export function Info(props) {
  const { evento } = props;


  return (
    <View style={styles.content}>
      <Text style={styles.title}>Información</Text>
      <Text style={styles.fecha}>{evento.fecha}</Text>
      <Text style={styles.texto}>Organizador :  <Text style={styles.description}>{evento.organizador}</Text></Text>
      <Text style={styles.texto}>Ubicación :  <Text style={styles.description} > {evento.direccion} </Text>  </Text>
      <Map ubicacion={evento.ubicacion} titulo={evento.titulo} />
      <Text style={styles.texto}> Email de contacto :  <Text style={styles.description}>{evento.email}</Text></Text>
      <Text style={styles.texto}> Teléfono :  <Text style={styles.description}>{evento.telefono}</Text></Text>
    </View>
  );
}
