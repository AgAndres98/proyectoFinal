import React from "react";
import { View } from "react-native";
import { Text, ListItem, Icon } from "react-native-elements";
import { styles } from "./Info.styles";
import { map } from "lodash";

export function Info(props) {
  const { objeto } = props;
  const listInfo = [
    {
      text: objeto.adress,
      iconName: "map-marker",
      iconType: "material-community",
    },
    {
      text: objeto.phone,
      iconName: "phone",
      iconType: "material-community",
    },
    {
      text: objeto.email,
      iconName: "email",
      iconType: "material-community",
    },
  ];
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Información:</Text>
      {map(listInfo, (item, index) => (
        <ListItem key={index} bottomDivider>
          <Icon type={item.iconType} name={item.iconName} />
          <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}
