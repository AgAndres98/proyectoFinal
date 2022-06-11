import React from "react";
import { View } from "react-native";
import { Text, ListItem, Icon } from "react-native-elements";
import { styles } from "./Info.styles";
import { map } from "lodash";
import { Map } from "../../Shared";

export function Info(props) {
  const { evento } = props;


  return (
    <View style={styles.content}>
      <Text style={styles.title}>Información:</Text>
      <Map ubicacion={evento.ubicacion} titulo={evento.titulo} />
      {/*map(listInfo, (item, index) => (
        <ListItem key={index} bottomDivider>
          <Icon type={item.iconType} name={item.iconName} />
          <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))*/}
    </View>
  );
}
