import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { db, screen } from "../../../utils";
import { NotFound, Loading } from "../../../components/Shared";
import {
  collection,
  query,
  onSnapshot,
  doc,
  getDoc,
  where,
} from "firebase/firestore";
import { size } from "lodash";
import {
  UsersStatistics,
  ObjectsStatistics,
} from "../../../components/Account";
import { styles } from "./StatisticsScreen.styles";

export function StatisticsScreen() {
  const [selection, setSelection] = useState(1);
  const [selectionYear, setSelectionYear] = useState(1);
  const [datosPersonales, setDatosPersonales] = useState(null);
  const [datosPersonales22, setDatosPersonales22] = useState(null);
  const [datosPersonales21, setDatosPersonales21] = useState(null);
  const [delivered, setDelivered] = useState(null);
  const [delivered22, setDelivered22] = useState(null);
  const [delivered21, setDelivered21] = useState(null);
  const [objetos, setObjetos] = useState(null);
  const [objetos22, setObjetos22] = useState(null);
  const [objetos21, setObjetos21] = useState(null);
  const [requests, setRequests] = useState(null);
  const [requests22, setRequests22] = useState(null);
  const [requests21, setRequests21] = useState(null);
  //const [porcentajeFinal, setPorcentajeFinal] = useState(null);

  let porcentaje;
  let porcentajeFinal;

  useEffect(() => {
    //const q = query(collection(db, "datosPersonales"), where("year","==",route.params.year));
    const q = query(collection(db, "datosPersonales"));

    onSnapshot(q, async (snapshot) => {
      let objectArray = [];
      let objectArray22 = [];
      let objectArray21 = [];

      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "datosPersonales", data.id);
        const docSnap = await getDoc(docRef);
        const newData = docSnap.data();
        newData.id = data.id;
        objectArray.push(newData);
        if (data.year == 2022) {
          objectArray22.push(newData);
        }
        if (data.year == 2021) {
          objectArray21.push(newData);
        }
      }

      setDatosPersonales(objectArray);
      setDatosPersonales22(objectArray22);
      setDatosPersonales21(objectArray21);
    });
  }, []);

  useEffect(() => {
    //const q2 = query(collection(db, "delivered"),where("year","==",route.params.year));
    const q = query(collection(db, "delivered"));

    onSnapshot(q, async (snapshot) => {
      let objectArray = [];
      let objectArray22 = [];
      let objectArray21 = [];

      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "delivered", data.id);
        const docSnap = await getDoc(docRef);
        const newData = docSnap.data();
        newData.id = data.id;

        objectArray.push(newData);
        if (data.year == 2022) {
          objectArray22.push(newData);
        }
        if (data.year == 2021) {
          objectArray21.push(newData);
        }
      }
      setDelivered(objectArray);
      setDelivered22(objectArray22);
      setDelivered21(objectArray21);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "objetos"));

    onSnapshot(q, async (snapshot) => {
      let objectArray = [];
      let objectArray22 = [];
      let objectArray21 = [];

      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "objetos", data.id);
        const docSnap = await getDoc(docRef);
        const newData = docSnap.data();
        newData.id = data.id;

        objectArray.push(newData);

        if (data.year == 2022) {
          objectArray22.push(newData);
        }
        if (data.year == 2021) {
          objectArray21.push(newData);
        }
      }
      setObjetos(objectArray);
      setObjetos22(objectArray22);
      setObjetos21(objectArray21);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "requests"));

    onSnapshot(q, async (snapshot) => {
      let objectArray = [];
      let objectArray22 = [];
      let objectArray21 = [];

      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "requests", data.id);
        const docSnap = await getDoc(docRef);
        const newData = docSnap.data();
        newData.id = data.id;

        objectArray.push(newData);
        if (data.year == 2022) {
          objectArray22.push(newData);
        }
        if (data.year == 2021) {
          objectArray21.push(newData);
        }
      }
      setRequests(objectArray);
      setRequests22(objectArray22);
      setRequests21(objectArray21);
    });
  }, []);

  if (!datosPersonales || !delivered || !objetos || !requests)
    return <Loading show text="Cargando" />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnGroup}>
        <TouchableOpacity
          style={[
            styles.btnLeft,
            selection === 1 ? { backgroundColor: "#62bd60" } : null,
          ]}
          onPress={() => setSelection(1)}
        >
          <Text
            style={[
              styles.btnText,
              selection === 1 ? { color: "white" } : null,
            ]}
          >
            Usuarios
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnRight,
            selection === 2 ? { backgroundColor: "#62bd60" } : null,
          ]}
          onPress={() => setSelection(2)}
        >
          <Text
            style={[
              styles.btnText,
              selection === 2 ? { color: "white" } : null,
            ]}
          >
            Objetos
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnGroup}>
        <TouchableOpacity
          style={[
            styles.btnLeft,
            selectionYear === 1 ? { backgroundColor: "#62bd60" } : null,
          ]}
          onPress={() => setSelectionYear(1)}
        >
          <Text
            style={[
              styles.btnText,
              selectionYear === 1 ? { color: "white" } : null,
            ]}
          >
            Todo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            selectionYear === 2 ? { backgroundColor: "#62bd60" } : null,
          ]}
          onPress={() => setSelectionYear(2)}
        >
          <Text
            style={[
              styles.btnText,
              selectionYear === 2 ? { color: "white" } : null,
            ]}
          >
            2022
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnRight,
            selectionYear === 3 ? { backgroundColor: "#62bd60" } : null,
          ]}
          onPress={() => setSelectionYear(3)}
        >
          <Text
            style={[
              styles.btnText,
              selectionYear === 3 ? { color: "white" } : null,
            ]}
          >
            2021
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statisticsContainer}>
        {selection === 1 && selectionYear === 1 && (
          <UsersStatistics
            delivered={delivered}
            datosPersonales={datosPersonales}
          />
        )}

        {selection === 1 && selectionYear === 2 && (
          <UsersStatistics
            delivered={delivered22}
            datosPersonales={datosPersonales22}
          />
        )}

        {selection === 1 && selectionYear === 3 && (
          <UsersStatistics
            delivered={delivered21}
            datosPersonales={datosPersonales21}
          />
        )}
        {selection === 2 && selectionYear === 1 && (
          <ObjectsStatistics
            objetos={objetos}
            porcentajeFinal={porcentajeFinal}
            delivered={size(delivered)}
            requests={size(requests)}
          />
        )}

        {selection === 2 && selectionYear === 2 && (
          <ObjectsStatistics
            objetos={objetos22}
            delivered={size(delivered22)}
            requests={size(requests22)}
          />
        )}

        {selection === 2 && selectionYear === 3 && (
          <ObjectsStatistics
            objetos={objetos21}
            delivered={size(delivered21)}
            requests={size(requests21)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
//<EstadisticaBeneficiario objetos={objetos} porcentajeFinal={porcentajeFinal} year={year} />
