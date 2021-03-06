import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { styles } from "./Header.styles";

export function Header(props) {
  const { objeto } = props;
  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{objeto.titulo}</Text>
        <Text style={styles.id}>#{objeto.tipo}</Text>
      </View>
      <Text style={styles.description}>{objeto.descripcion}</Text>
    </View>
  );
}
