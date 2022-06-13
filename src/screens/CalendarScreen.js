import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";;
import { screen } from "../utils";
import { styles } from "./Screens.styles";

export function CalendarScreen() {

  const navigation = useNavigation();
  const id = 'e31ca67d-b4bf-4c08-8285-e7fbd81f2996';



  const goToRequest = (idEvento) => {
    navigation.navigate(screen.calendar.eventsDetail, { id: id });

  }



  const ir = () => {
    navigation.navigate(screen.account.tab, { screen: screen.account.editObject });
  }
  return (
    <View style={styles.screen}>
      <Text>Screen de calendarios</Text>

      <Icon
        type="material-community"
        name="account-eye-outline"
        size={35}
        containerStyle={styles.eye}
        onPress={() => { goToRequest(id) }}
      />

    </View>
  );
}
