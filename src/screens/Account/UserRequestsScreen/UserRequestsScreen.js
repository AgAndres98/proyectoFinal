import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, Image } from "react-native-elements";
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

import { db } from "../../../utils";
import { LoadingModal } from "../../../components/Shared/LoadingModal";
import { UserRequests } from "../../../components/Account/UserRequests";
import { styles } from "./UserRequestsScreen.styles";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { size, forEach } from "lodash";

export function UserRequestsScreen(props) {

  const { route } = props;

  console.log(route.params);
  /* const auth = getAuth();
    
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
*/

  const [listaSolicitudes, setListaSolicitudes] = useState([]);

  const [listaSolicitudesValidacion, setListaSolicitudesValidacion] = useState(
    []
  );

  const listaSolicitudesOrdenadas = [];

  const arrayQueNoCumplen = [];

  const arrayNoTienenCuestionario = [];

  const [dato, setDato] = useState();
  const tipo = "Ropa";

  const idObjeto = "51a3fe77-cacd-46aa-b9b9-a1eb27b62fff";

  let arrayOrdenado = [];

  useEffect(() => {
    const auth = getAuth();

    getSolicitudes();

    ordenamientoPorMacheo();

    arrayOrdenado = listaSolicitudesOrdenadas.concat(
      arrayQueNoCumplen,
      arrayNoTienenCuestionario
    );
    setDato(arrayOrdenado);

  }, [listaSolicitudes]);

  const eliminarRepetidos = (a, key) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = key(item);
      return seen.has(k) ? false : seen.add(k);
    });
  };

  const ordenamientoPorMacheo = () => {
    forEach(listaSolicitudes, async (item) => {
      if (item.datosPersonales.cuestionarioBeneficiario.length == 0) {
        arrayNoTienenCuestionario.push(item);
      } else {
        if (
          tipo == "Ropa" &&
          item.datosPersonales.cuestionarioBeneficiario.ropa == true
        ) {
          listaSolicitudesOrdenadas.push(item);
        } else {
          arrayQueNoCumplen.push(item);
        }
      }
    });
  };

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

        const storage = getStorage();
        const starsRef = ref(storage, `avatar/${data.idUserReq}`);
        const imagen = "url";

        getDownloadURL(starsRef)
          .then((url) => {
            newData.foto = url;
          })
          .catch((error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/object-not-found":
                // File doesn't exist
                break;
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;

              // ...

              case "storage/unknown":
                // Unknown error occurred, inspect the server response
                break;
            }
          });

        listaSolicitudes.find(
          (element) => element.idUsuario == newData.idUsuario
        ) == undefined
          ? setListaSolicitudes((listaSolicitudes) => [
            ...listaSolicitudes,
            newData,
          ])
          : "";
      }
    });

    setDato(arrayOrdenado);
  };



  if (!dato) return <LoadingModal show text="Cargando" />;

  return (
    <View style={styles.content}>
      {!dato ? (
        <LoadingModal show text="Cargando" />
      ) : (
        <UserRequests dato={dato} />
      )}
    </View>
  );
}
