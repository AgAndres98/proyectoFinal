import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { styles } from "./Header.styles";

export function Header(props) {
  const { objeto } = props;
  console.log(objeto + "header");
  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{objeto.name}</Text>
        <Text style={styles.id}>#{objeto.id}</Text>
      </View>
      <Text style={styles.description}>{objeto.description}</Text>
    </View>
  );
}
