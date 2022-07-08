import React, { useState, useEffect } from "react";
import { db, screen } from "../utils";
import { View, Text, ScrollView } from "react-native";

import { NotFound, Loading } from "../components/Shared";
import { collection, query, onSnapshot, doc, getDoc } from "firebase/firestore";
import { size, forEach, map } from "lodash";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Button } from "react-native-elements";
import { Dimensions } from "react-native";
import { async } from "@firebase/util";
import { Estadistica } from "../components/Estadistica";

export function EstadisticaScreen() {
  const [showModal, setShowModal] = useState(false);
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);
  const [datosPersonales, setDatosPersonales] = useState(null);
  const [delivered, setDelivered] = useState(null);
  let ranking = [];
  const data = [];
  let arrayFinal = [];

  let countRopa = 0;
  let countJuguetes = 0;
  let countLibros = 0;
  let countMateriales = 0;
  let countMuebles = 0;
  let countObjetos = 0;
  let countAlimentos = 0;
  let countOtros = 0;
  let countSalud = 0;
  let countServicio = 0;
  let countHerramientas = 0;
  let countElectrodomesticos = 0;
  let countUtiles = 0;
  let count = 0;

  useEffect(() => {
    const q = query(collection(db, "datosPersonales"));

    onSnapshot(q, async (snapshot) => {
      let objectArray = [];

      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "datosPersonales", data.id);
        const docSnap = await getDoc(docRef);
        const newData = docSnap.data();
        newData.id = data.id;

        objectArray.push(newData);
      }
      setDatosPersonales(objectArray);
    });
  }, []);

  useEffect(() => {
    const q2 = query(collection(db, "delivered"));

    onSnapshot(q2, async (snapshot) => {
      let objectArray = [];

      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "delivered", data.id);
        const docSnap = await getDoc(docRef);
        const newData = docSnap.data();
        newData.id = data.id;

        objectArray.push(newData);
      }
      setDelivered(objectArray);
    });
  }, []);

  if (!datosPersonales || !delivered) return <Loading show text="Cargando" />;
  //if (!datosPersonales || !delivered) return <Loading show text="Cargando" />;
  //if (!datosPersonales) return <Loading show text="Cargando" />;
  /*
  return (
    <ScrollView>
      {map(delivered, (objeto) => (
        <View>
          <Text>OJETO 1</Text>
          <Text key={objeto.id}>tipo:{objeto.tipo} </Text>

          <Text key={objeto.id}>{JSON.stringify(objeto)} </Text>
          <Text>fin 1</Text>
        </View>
      ))}

      {map(datosPersonales, (objeto) => (
        <View>
          <Text>usuarios 1</Text>
          <Text key={objeto.id}>apellido:{objeto.apellido} </Text>

          <Text key={objeto.id}>{JSON.stringify(objeto)} </Text>
          <Text>fin 1</Text>
        </View>
      ))}
    </ScrollView>
  );
  */
  return (
    <Estadistica delivered={delivered} datosPersonales={datosPersonales} />
  );
}
