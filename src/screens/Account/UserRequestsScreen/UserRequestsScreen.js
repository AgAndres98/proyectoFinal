import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
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
import { forEach } from "lodash";

export function UserRequestsScreen(props) {
  const { idObjeto, tipo, route } = props;

  const [listaSolicitudes, setListaSolicitudes] = useState([]);

  const [formularioDonante, setFormularioDonante] = useState();

  const [dato, setDato] = useState();

  let arrayOrdenado = [];

  const [iguales, setIguales] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    getSolicitudes();
    getFormularioDonante(auth);

    ordenamientoPorMacheo();

    arrayOrdenado.sort(function (a, b) {
      if (a.puntuacion < b.puntuacion) {
        return 1;
      }
      if (a.puntuacion > b.puntuacion) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    setDato(arrayOrdenado);
    console.log(arrayOrdenado);
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
      item.puntuacion = 0;
      if (item.datosPersonales.cuestionarioBeneficiario.length == 0) {
        arrayOrdenado.push(item);
      } else {
        switch (route.params.tipoObjeto) {
          case "Alimento":
            item.datosPersonales.cuestionarioBeneficiario.alimentos == true
              ? (item.puntuacion += 20)
              : "";
            break;
          case "Electrodoméstico":
            item.datosPersonales.cuestionarioBeneficiario.electrodomesticos ==
            true
              ? (item.puntuacion += 20)
              : "";
            break;
          case "Herramientas":
            item.datosPersonales.cuestionarioBeneficiario.herramientas == true
              ? (item.puntuacion += 20)
              : "";
            break;
          case "Juguetes":
            item.datosPersonales.cuestionarioBeneficiario.juguetes == true
              ? (item.puntuacion += 20)
              : "";
            break;
          case "Libros":
            item.datosPersonales.cuestionarioBeneficiario.libros == true
              ? (item.puntuacion += 20)
              : "";
            break;
          case "Materiales":
            item.datosPersonales.cuestionarioBeneficiario.materiales == true
              ? (item.puntuacion += 20)
              : "";
            break;
          case "Muebles":
            item.datosPersonales.cuestionarioBeneficiario.muebles == true
              ? (item.puntuacion += 20)
              : "";
            break;
          case "Objetos":
            item.datosPersonales.cuestionarioBeneficiario.objetos == true
              ? (item.puntuacion += 20)
              : "";
            break;
          case "Ropa":
            item.datosPersonales.cuestionarioBeneficiario.ropa == true
              ? (item.puntuacion += 20)
              : "";
            break;
          case "Salud":
            item.datosPersonales.cuestionarioBeneficiario.salud == true
              ? (item.puntuacion += 20)
              : "";
            break;
          case "Servicio":
            item.datosPersonales.cuestionarioBeneficiario.servicio == true
              ? (item.puntuacion += 20)
              : "";
            break;
          case "Utiles escolares":
            item.datosPersonales.cuestionarioBeneficiario.utiles == true
              ? (item.puntuacion += 20)
              : "";
            break;
          case "Otro":
            item.datosPersonales.cuestionarioBeneficiario.otros == true
              ? (item.puntuacion += 20)
              : "";
            break;
        }
        if (formularioDonante != null) {
          switch (item.datosPersonales.cuestionarioBeneficiario.motivo) {
            case "incendio":
              formularioDonante.incendios != "0" ||
              formularioDonante.incendios != ""
                ? (item.puntuacion += formularioDonante.incendios * 3)
                : "";
              break;
            case "tsunami":
              formularioDonante.tsunami != "0" ||
              formularioDonante.tsunami != ""
                ? (item.puntuacion += formularioDonante.tsunami * 3)
                : "";
              break;
            case "inundacion":
              formularioDonante.inundaciones != "0" ||
              formularioDonante.inundaciones != ""
                ? (item.puntuacion += formularioDonante.inundaciones * 3)
                : "";
              break;
            case "gente":
              formularioDonante.gente != "0" || formularioDonante.gente != ""
                ? (item.puntuacion += formularioDonante.gente * 3)
                : "";
              break;
          }
          if (
            item.datosPersonales.cuestionarioBeneficiario.ayuda == "familia"
          ) {
            formularioDonante.grupoFamiliar == "nada" ||
            formularioDonante.grupoFamiliar == "familia"
              ? (item.puntuacion += 5)
              : "";
          }
          if (item.datosPersonales.cuestionarioBeneficiario.ayuda == "yo") {
            formularioDonante.grupoFamiliar == "nada" ||
            formularioDonante.grupoFamiliar == "una"
              ? (item.puntuacion += 5)
              : "";
          }
        }
        arrayOrdenado.push(item);
      }
    });
  };

  //este metodo funcionaaaa
  const getFormularioDonante = (auth) => {
    const r = query(
      collection(db, "cuestionarioDonador"),
      where("id", "==", auth.currentUser.uid)
    );

    onSnapshot(r, async (snapshot) => {
      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "cuestionarioDonador", data.id);
        const docSnap = await getDoc(docRef);
        const newData = docSnap.data();
        newData.id = data.id;
        setFormularioDonante(newData);
      }
    });
  };

  //este metodo funcionaaaa
  const getSolicitudes = () => {
    const r = query(
      collection(db, "requests"),
      where("idObjeto", "==", route.params.idObjeto),
      where("status", "!=", "Rechazado")
    );
    //1e65
    //14caa ok pruebas
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
  };

  return (
    <View style={styles.content}>
      {dato == undefined ? (
        <LoadingModal show text="Cargando" />
      ) : (
        <UserRequests dato={dato} />
      )}
    </View>
  );
}
