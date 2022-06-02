import React from "react";
import { View } from "react-native";
import { Text, Icon } from "react-native-elements";
import { styles } from "./NotFound.styles";

export function NotFound(props) {
  const { texto } = props;
  return (
    <View style={styles.contenido}>
      <Icon type="material-community" name="alert-outline" size={80} />
      <Text style={styles.text}>{texto}</Text>
    </View>
  );
}
