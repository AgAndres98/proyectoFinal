import React from "react";
import { View } from "react-native";
import { Text, Icon, ListItem } from "react-native-elements";
import { styles } from "./Info.styles";
import { Map } from "../../Shared";
import { map } from "lodash";
import { List } from "react-native-paper";

export function Info(props) {
  const { evento } = props;

  const listInfo = [{
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
      <Text style={styles.fecha}>{evento.fecha}</Text>
      {map(listInfo, (item, index) => (
        <ListItem style={styles.listInfo} key={index} bottomDivider>
          <Icon
            type={item.iconType}
            name={item.iconName}
            color="#00a680" />
          <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem.Content>
        </ListItem>))}

      <Map style={styles.mapa} ubicacion={evento.ubicacion} titulo={evento.titulo} />
    </View>
  );
}
