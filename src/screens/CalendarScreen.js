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

  useEffect(() => {
    const auth = getAuth();
    
    getSolicitudes();

    ordenamientoPorMacheo();

    arrayOrdenado = listaSolicitudesOrdenadas.concat(arrayQueNoCumplen, arrayNoTienenCuestionario);


  }, [listaSolicitudes]);

   const eliminarRepetidos = (a, key) => {
      let seen = new Set();
      return a.filter(item => {
          let k = key(item);
          return seen.has(k) ? false : seen.add(k);
      });
    }

    const ordenamientoPorMacheo = () => {
      forEach(listaSolicitudes, async (item) => {
          if(item.datosPersonales.cuestionarioBeneficiario.length == 0){
            arrayNoTienenCuestionario.push(item);
          }else{
                if(tipo == "Ropa" && item.datosPersonales.cuestionarioBeneficiario.ropa == true){
                  listaSolicitudesOrdenadas.push(item);
                }else{
                  arrayQueNoCumplen.push(item);
                }
          }
      });
    }

  //este metodo funcionaaaa
  const getSolicitudes = () => {
    const r = query(
      collection(db, "requests"),
      where("idObjeto", "==", idObjeto)
    );

    onSnapshot(r, async (snapshot) => {
      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "requests", data.id);
          const docSnap = await getDoc(docRef);
          const newData = docSnap.data();
          newData.id = data.id;
          listaSolicitudes.find(element => element.idUsuario == newData.idUsuario) == undefined ? setListaSolicitudes(listaSolicitudes =>[...listaSolicitudes, newData]) : "";
      }
    });
  };


  return (
    <View style={styles.screen}>
      <Text>Screen de calendarios</Text>
    </View>
  );
}
