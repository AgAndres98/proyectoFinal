import React from "react";
import { View } from "react-native";
import { Text, Icon } from "react-native-elements";
import { styles } from "./NoEstadistica.styles";

export function NoEstadistica(props) {
  const { texto } = props;
  return (
    <View style={styles.contenido}>
      <Icon type="material-community" name="projector-screen-off-outline" size={80} />
      <Text style={styles.text}>{texto}</Text>
    </View>
  );
}
