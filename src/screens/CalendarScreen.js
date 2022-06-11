import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db, screen } from "../utils";
import { size, forEach } from "lodash";
import { async } from "@firebase/util";
import { Button } from "react-native-elements";
import { styles } from "./Screens.styles";

export function CalendarScreen() {

  const navigation = useNavigation();
  const id = 'e31ca67d-b4bf-4c08-8285-e7fbd81f2996';

  const [listaSolicitudes, setListaSolicitudes] = useState([]);

  const [listaSolicitudesValidacion, setListaSolicitudesValidacion] = useState([]);

  const listaSolicitudesOrdenadas = []

  const arrayQueNoCumplen = []

  const arrayNoTienenCuestionario = [];


  const tipo = "Ropa";

  const idObjeto = "51a3fe77-cacd-46aa-b9b9-a1eb27b62fff";

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
