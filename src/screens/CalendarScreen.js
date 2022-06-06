import React, {useEffect, useState} from "react";
import { View, Text } from "react-native";
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
import { styles } from "./Screens.styles";

export function CalendarScreen() {
  const [listaSolicitudes, setListaSolicitudes] = useState([]);

  const [listaSolicitudesValidacion, setListaSolicitudesValidacion] = useState([]);

  const listaSolicitudesOrdenadas = []

  const arrayQueNoCumplen = []

  const arrayNoTienenCuestionario = [];

  const tipo = "Ropa";

  const idObjeto = "51a3fe77-cacd-46aa-b9b9-a1eb27b62fff";

  let arrayOrdenado = [];

  return (
    <View style={styles.screen}>
      <Text>Screen de calendarios</Text>
    </View>
  );
}
