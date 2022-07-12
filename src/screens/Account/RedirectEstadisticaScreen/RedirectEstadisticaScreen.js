import React, { useState, useEffect } from "react";
import { db, screen } from "../../../utils";
import { View, Text, ScrollView } from "react-native";
import { Loading } from '../../../components/Shared';
import { collection, query, onSnapshot, doc, getDoc, where } from "firebase/firestore";
import { EstadisticaFiltrado } from "../../../components/EstadisticaFiltrado";

export function RedirectEstadisticaScreen(props) {
    const {route}=props;
    const [showModal, setShowModal] = useState(false);
    const onCloseOpenModal = () => setShowModal((prevState) => !prevState);
    const [datosPersonales, setDatosPersonales] = useState(null);
    const [delivered, setDelivered] = useState(null);
    
    useEffect(() => {
        const q = query(collection(db, "datosPersonales"), where("year","==",route.params.year));

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
        const q2 = query(collection(db, "delivered"),where("year","==",route.params.year));

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
        <EstadisticaFiltrado delivered={delivered} datosPersonales={datosPersonales} />
    );
}