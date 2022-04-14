import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { screen } from "../../utils";

export function ObjectsScreen(props) {
  const { navigation } = props;

  const goToObject = () => {
    navigation.navigate(screen.objects.objeto);
    //para viajar a otra pestaña/tab:
    //navigation.navigate(screen.account.tab,{screen:screen.account.account});
  };

  return (
    <View>
      <Text>Screen de objetos</Text>
      <Button tittle="Ir a objeto" onPress={goToObject} />
    </View>
  );
}
