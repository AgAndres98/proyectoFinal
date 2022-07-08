import React from "react";
import {
  View,
  TouchableOpacity,
  ToastAndroid,
  Linking,
  Clipboard,
} from "react-native";
import { Text, Icon, ListItem } from "react-native-elements";
import { map } from "lodash";
import { Map } from "../../Shared";
import { styles } from "./Info.styles";

export function Info(props) {
  const { evento } = props;
  const date = new Date(evento.fecha);
  const dateDay = date.getDate();
  const dateMonth = date.getMonth() + 1;
  const dateYear = date.getFullYear();

  const dateFormatted = `${dateDay}/${dateMonth}/${dateYear}`;
  const listInfo = [
    {
      text: evento.telefono,
      iconType: "material-community",
      iconName: "phone",
      function: () => {
        const whatsappNo = "549" + evento.telefono;
        Linking.openURL(
          `whatsapp://send?phone=${whatsappNo}&text=Hola, me contacto por el evento ${evento.titulo} de la aplicación ayuDAR`
        );
      },
      longFunction: () => {
        Clipboard.setString(evento.telefono);
        ToastAndroid.show("Teléfono copiado correctamente", ToastAndroid.SHORT);
      },
    },
    {
      text: evento.email,
      iconType: "material-community",
      iconName: "at",
      function: () => {
        Linking.openURL(
          `mailto:${evento.email}?subject=${evento.titulo} ayuDar&body=Hola, me contacto por el evento ${evento.titulo} de la aplicación ayuDAR`
        );
      },
      longFunction: () => {
        Clipboard.setString(evento.direccion);
        ToastAndroid.show("Email copiado correctamente", ToastAndroid.SHORT);
      },
    },
    {
      text: evento.direccion,
      iconType: "material-community",
      iconName: "map-marker",
      function: () => {
        Clipboard.setString(evento.direccion);
        ToastAndroid.show(
          "Ubicación copiada correctamente",
          ToastAndroid.SHORT
        );
      },
      longFunction: () => {
        Clipboard.setString(evento.direccion);
        ToastAndroid.show(
          "Ubicación long copiada correctamente",
          ToastAndroid.SHORT
        );
      },
    },
  ];

  const copyToClipboardUbicacion = () => {
    Clipboard.setString(evento.direccion);
    ToastAndroid.show("Ubicación copiada correctamente", ToastAndroid.SHORT);
  };

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Información</Text>
      <Text style={styles.fecha}>{dateFormatted}</Text>
      {map(listInfo, (item, index) => (
        <TouchableOpacity
          onPress={item.function}
          onLongPress={item.longFunction}
        >
          <ListItem style={styles.listInfo} key={index} bottomDivider>
            <Icon type={item.iconType} name={item.iconName} color="#62bd60" />
            <ListItem.Content>
              <ListItem.Title>{item.text}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      ))}

      <Map
        style={styles.mapa}
        ubicacion={evento.ubicacion}
        titulo={evento.titulo}
      />
    </View>
  );
}
