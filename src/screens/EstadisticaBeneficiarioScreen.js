import React, { useState, useEffect } from "react";
import { db, screen } from "../utils";
import { View, Text, ScrollView } from "react-native";

import { NotFound, Loading } from "../components/Shared";
import { collection, query, onSnapshot, doc, getDoc,where } from "firebase/firestore";
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
import { EstadisticaBeneficiario } from "../components/EstadisticaBeneficiario";

export function EstadisticaBeneficiarioScreen(props) {
    const {route}=props;
    const [showModal, setShowModal] = useState(false);
    const onCloseOpenModal = () => setShowModal((prevState) => !prevState);
    const [objetos, setObjetos] = useState(null);
    const [requests, setRequests] = useState(null);
    const [delivered, setDelivered] = useState(null);
    let arrayRequestDelivered = [];
    const year=route.params.year;
    //year.toString();
   //console.log(typeof(year))
    console.log("EstadisticaBeneficiarioScreen",route.params.year)
    
    useEffect(() => {
        const q = query(collection(db, "objetos"),where("year","==",parseInt(route.params.year)));

        onSnapshot(q, async (snapshot) => {
            let objectArray = [];

            for await (const item of snapshot.docs) {
                const data = item.data();
                const docRef = doc(db, "objetos", data.id);
                const docSnap = await getDoc(docRef);
                const newData = docSnap.data();
                newData.id = data.id;

                objectArray.push(newData);
            }
            setObjetos(objectArray);
        });
    }, []);

    useEffect(() => {
        const q2 = query(collection(db, "delivered"),where("year","==",parseInt(route.params.year)));

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


    useEffect(() => {
        const q3 = query(collection(db, "requests"),where("year","==",parseInt(route.params.year)));

        onSnapshot(q3, async (snapshot) => {
            let objectArray = [];

            for await (const item of snapshot.docs) {
                const data = item.data();
                const docRef = doc(db, "requests", data.id);
                const docSnap = await getDoc(docRef);
                const newData = docSnap.data();
                newData.id = data.id;

                objectArray.push(newData);
            }
            setRequests(objectArray);
        });
    }, []);
    if (!objetos || !delivered) return <Loading show text="Cargando" />;

    
    const porcentaje = Math.trunc((size(delivered) * 100) / size(requests));
    const porcentajeFinal = porcentaje / 100;

   // console.log(objetos);


    return (
        <EstadisticaBeneficiario objetos={objetos} porcentajeFinal={porcentajeFinal} year={year}/>
    );
}