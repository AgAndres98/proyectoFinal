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

  const [listaDatosPersonales, setListaDatosPersonales] = useState([]);

  const [listaCuestionarioBeneficiario, setListaCuestionarioBeneficiario] = useState([]);
  
  const [listaSolicitudesOrdenadas, setListaSolicitudesOrdenadas] = useState([]);

  const [arrayQueNoCumplen, setArrayQueNoCumplen] = useState([]);

  const [arrayNoTienenCuestionario, setArrayNoTienenCuestionario] = useState([]);

  const tipo = "ropa";

  const idObjeto = "45846826-504b-47ba-a92b-76009dc24fa0";

  let arrayDatos = [];

  let arrayDatosCuestionario = [];

  let arrayOrdenadoPorMacheo = [];

  useEffect(() => {
    const auth = getAuth();
    
    getSolicitudes();

    forEach(listaSolicitudes, async (item) => {
      const q = query(
        collection(db, "datosPersonales"),
        where("idUsuario", "==", item.idUserReq)
      );
      
      onSnapshot(q, async (snapshots) => {
        
        for await (const item of snapshots.docs) {
          const data = item.data();
          const docRef = doc(db, "datosPersonales", data.id);
          const docSnap = await getDoc(docRef);
          const newData = docSnap.data();
          newData.id = data.id;
          setListaDatosPersonales(listaDatosPersonales =>[...listaDatosPersonales, newData]);
       };
      });
    }); 


    arrayDatos = eliminarRepetidos(listaDatosPersonales, it => it.idUsuario);

    

      forEach(listaSolicitudes, async (item) => {
        const q = query(
          collection(db, "custionarioBeneficiario"),
          where("idUsuario", "==", item.idUserReq)
        );
        datoBeneficiario(q);
      });
      arrayDatosCuestionario = eliminarRepetidos(listaCuestionarioBeneficiario, it => it.idUsuario); 

    ordenamientoPorMacheo();

    //aca pongo el array ordenado por macheo, primer array todo verde, segundo no tiene macheo, tercero no tiene cuestionario
    arrayOrdenadoPorMacheo.push(eliminarRepetidos(listaSolicitudesOrdenadas, it => it.idUsuario), eliminarRepetidos(arrayQueNoCumplen, it => it.idUsuario), eliminarRepetidos(arrayNoTienenCuestionario.filter(val => !listaSolicitudesOrdenadas.includes(val) && !arrayQueNoCumplen.includes(val)), it => it.idUsuario));


    console.log(arrayOrdenadoPorMacheo);
  }, [listaSolicitudes, listaDatosPersonales, listaCuestionarioBeneficiario]);

   const eliminarRepetidos = (a, key) => {
      let seen = new Set();
      return a.filter(item => {
          let k = key(item);
          return seen.has(k) ? false : seen.add(k);
      });
    }

    const ordenamientoPorMacheo = () => {
      forEach(arrayDatos, async (item) => {
          if(arrayDatosCuestionario.find(element => element.idUsuario == item.idUsuario) == undefined){
            setArrayNoTienenCuestionario(arrayNoTienenCuestionario =>[...arrayNoTienenCuestionario, item]);
          }else{
            forEach(arrayDatosCuestionario, async (datos) =>{
              if(datos.idUsuario == item.idUsuario){
                if(tipo == "ropa" && datos.ropa == true){
                  setListaSolicitudesOrdenadas(listaSolicitudesOrdenadas => [...listaSolicitudesOrdenadas, item]);
                }else{
                  setArrayQueNoCumplen(arrayQueNoCumplen => [...arrayQueNoCumplen, item]);
                }
              }
            });
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

  const datoBeneficiario = (q) => {
    onSnapshot(q, async (snapshots) => {
      for await (const item of snapshots.docs) {
        const data = item.data();
        const docRef = doc(db, "custionarioBeneficiario", data.id);
        const docSnap = await getDoc(docRef);
        const newData = docSnap.data();
        newData.id = data.id;
        listaCuestionarioBeneficiario.find(element => element.idUsuario == newData.idUsuario) == undefined ? setListaCuestionarioBeneficiario(listaCuestionarioBeneficiario => [...listaCuestionarioBeneficiario,newData]) : "";
      }
  
    });

  }


  return (
    <View style={styles.screen}>
      <Text>Screen de calendarios</Text>
    </View>
  );
}
