import React, {useEffect, useState} from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { styles } from "./Screens.styles";
import { screen } from "../utils";
import { useNavigation } from "@react-navigation/native";

export function CalendarScreen() {
  const navigation = useNavigation();

  const ir = () => {
    navigation.navigate(screen.account.tab, {screen: screen.account.editObject});
  }
  return (
    <View style={styles.screen}>
      <Text>Screen de calendarios</Text>
      <Button onPress={ir} />
    </View>
  );
}
