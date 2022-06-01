import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Icon,Text } from "react-native-elements";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  query,
  where,
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../../utils";
import { LoadingModal } from "../../components/Shared/LoadingModal";
import { UserRequests} from "../../components/Account/UserRequests";
import { styles } from "./UserRequestsScreen.styles";

import { size, forEach } from "lodash";


export function UserRequestsScreen(props) {
     const auth = getAuth();
    
    const [request, setRequest] = useState(null);
 
     useEffect(() => {
         const q = query(
             collection(db, "datosPersonales"),
             where("idUsuario", "==", auth.currentUser.uid)
         );

         onSnapshot(q, (snapshot) => {
             setRequest(snapshot.docs);
         });
     }, []);

     
    if (!request) return <LoadingModal show text="Cargando" />;
   

    return (
        <View style={styles.content}>
            {!request ? (
                <LoadingModal show text="Cargando" />
            ) : (
                <UserRequests request={request} />
            )}
        </View>
    );    

   }  
/*
   collection(db, "objetos"),
   where("idObjeto", "==", objectId)
    const q = query(
        collection(db, "request"),
        where("idObjeto", "==", objectId)
    );


    onSnapshot(q, (snapshot) => {
        setObjects(snapshot.docs);
    });
},[]);*/
/*
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
  
    //console.log(listaSolicitudes);

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
          listaDatosPersonales.find(element => element.idUsuario != newData.idUsuario) == undefined ? setListaDatosPersonales(listaDatosPersonales =>[...listaDatosPersonales, newData]) : "";
       };
      });
    }); 

    //console.log("Listrado de datos sin repetir");
    arrayDatos = eliminarRepetidos(listaDatosPersonales, it => it.idUsuario);
    //console.log(arrayOrdenadoPorMacheo);    
    if(arrayDatos.length == listaSolicitudes.length){
      forEach(listaSolicitudes, async (item) => {
        const q = query(
          collection(db, "custionarioBeneficiario"),
          where("idUsuario", "==", item.idUserReq)
        );
        datoBeneficiario(q);
      });
      arrayDatosCuestionario = eliminarRepetidos(listaCuestionarioBeneficiario, it => it.idUsuario); 
    }

    ordenamientoPorMacheo();


    //aca pongo el array ordenado por macheo, primer array todo verde, segundo no tiene macheo, tercero no tiene cuestionario
    arrayOrdenadoPorMacheo.push(eliminarRepetidos(listaSolicitudesOrdenadas, it => it.idUsuario), eliminarRepetidos(arrayQueNoCumplen, it => it.idUsuario), eliminarRepetidos(arrayNoTienenCuestionario.filter(val => !listaSolicitudesOrdenadas.includes(val) && !arrayQueNoCumplen.includes(val)), it => it.idUsuario));
    //console.log("Vamos a ver");
 
    //console.log(arrayOrdenadoPorMacheo); 
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
          if(arrayDatosCuestionario.find(element => element.idUsuario === item.idUsuario) == undefined){
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
    //console.log("que rico")
    //console.log(arrayOrdenadoPorMacheo)

    if (!arrayOrdenadoPorMacheo) return <LoadingModal show text="Cargando" />;
   

    return (
        <View style={styles.content}>
            {!arrayOrdenadoPorMacheo ? (
                <LoadingModal show text="Cargando" />
            ) : (
                <UserRequests request={arrayOrdenadoPorMacheo} />
            )}
        </View>
    );    
}  */