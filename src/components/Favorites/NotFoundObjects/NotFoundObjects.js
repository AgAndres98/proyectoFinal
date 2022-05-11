import React from "react";
import { View } from "react-native";
import { Text, Icon } from "react-native-elements";
import { styles } from "./NotFoundObjects.styles";

export function NotFoundObjects() {
  return (
    <View style={styles.contenido}>
      <Icon type="material-community" name="alert-outline" size={80} />
      <Text style={styles.text}>No tienes objetos en favoritos</Text>
    </View>
  );
}
