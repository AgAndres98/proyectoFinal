import React from "react";
import { View } from "react-native";
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
    },
    {
      text: evento.email,
      iconType: "material-community",
      iconName: "at",
    },
    {
      text: evento.direccion,
      iconType: "material-community",
      iconName: "map-marker",
    },
  ];

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Información</Text>
      <Text style={styles.fecha}>{dateFormatted}</Text>
      {map(listInfo, (item, index) => (
        <ListItem style={styles.listInfo} key={index} bottomDivider>
          <Icon type={item.iconType} name={item.iconName} color="#62bd60" />
          <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}

      <Map
        style={styles.mapa}
        ubicacion={evento.ubicacion}
        titulo={evento.titulo}
      />
    </View>
  );
}
