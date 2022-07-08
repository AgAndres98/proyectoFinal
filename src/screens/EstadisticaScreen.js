import React, { useState, useEffect } from "react";
import { db, screen } from "../utils";
import { NotFound, Loading } from "../components/Shared";
import {
    collection,
    query,
    onSnapshot,
} from "firebase/firestore";
import { size, forEach } from "lodash";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';
import { Button } from "react-native-elements";
import { Dimensions } from 'react-native';
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
        const q = query(
            collection(db, "datosPersonales"),
        );

        onSnapshot(q, (snapshot) => {
            setDatosPersonales(snapshot.docs);
        });



    }, []);








    useEffect(() => {
        const q2 = query(
            collection(db, "delivered"),
        );

        onSnapshot(q2, (snapshot) => {
            setDelivered(snapshot.docs);
        });


    }, []);


    forEach(datosPersonales, (item) => {

        arrayFinal.push(item.data());
    });


    return (

        < Estadistica delivered={delivered} datosPersonales={arrayFinal} ></Estadistica >
    );
}


