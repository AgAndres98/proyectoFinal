import React from "react";
import { View, Text } from "react-native";
import { styles } from "./ObjectScreen.styles";

export function ObjectScreen(props) {
  const { route } = props;
  console.log(route);
  return (
    <View>
      <Text>ObjectScreen</Text>
    </View>
  );
}
