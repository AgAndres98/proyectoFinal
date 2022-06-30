import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { styles } from "./Header.styles";

export function Header(props) {
  const { usuario } = props;
  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{usuario.nombre} {usuario.apellido}  </Text>
      </View>
    </View>
  );
}
