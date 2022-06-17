import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { styles } from "./Header.styles";

export function Header(props) {
  const { evento } = props;
  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{evento.titulo}</Text>

      </View>
      <Text style={styles.description}>{evento.descripcion}</Text>
    </View>
  );
}
