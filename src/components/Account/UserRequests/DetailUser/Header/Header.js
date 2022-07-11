import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { styles } from "./Header.styles";

export function Header(props) {
  const { usuario } = props;
  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{usuario.nombre.charAt(0).toUpperCase() + usuario.nombre.slice(1)} {usuario.apellido.charAt(0).toUpperCase() + usuario.apellido.slice(1)}  </Text>
      </View>
    </View>
  );
}
