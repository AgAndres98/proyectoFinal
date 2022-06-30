import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { db, screen } from "../utils";
import { NotFound, Loading } from "../components/Shared";
import {
    collection,
    query,
    onSnapshot,
} from "firebase/firestore";
import { size, forEach } from "lodash";



export function Estadistica() {

    const [requests, setRequest] = useState(null);
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


    useEffect(() => {
        const q = query(
            collection(db, "requests"),
        );

        onSnapshot(q, (snapshot) => {
            setRequest(snapshot.docs);
        });
    }, []);

    forEach(requests, async (item) => {
        console.log(item.id);

        if (item.tipo === "Juguetes") {
            countJuguetes = countJuguetes + 1;
        }
        if (item.tipo === "Libros") {
            countLibros = countLibros + 1;
        }
        if (item.tipo === "Ropa") {
            countRopa = countRopa + 1;
        }
        if (item.tipo === "Materiales") {
            countMateriales = countMateriales + 1;
        }
        if (item.tipo === "Muebles") {
            countMuebles = countMuebles + 1;
        }
        if (item.tipo === "Objetos") {
            countObjetos = countObjetos + 1;
        }
        if (item.tipo === "Otro") {
            countOtros = countOtros + 1;
        }
        if (item.tipo === "Salud") {
            countSalud = countSalud + 1;
        }
        if (item.tipo === "Servicio") {
            countServicio = countServicio + 1;
        }
        if (item.tipo === "Herramientas") {
            countHerramientas = countHerramientas + 1;
        }
        if (item.tipo === "Electrodomestimos") {
            countElectrodomesticos = countElectrodomesticos + 1;
        }
        if (item.tipo === "Utiles") {
            countUtiles = countUtiles + 1;
        }
        if (item.tipo === "Alimentos") {
            countAlimentos = countAlimentos + 1;
        }
        console.log(countOtros);
        console.log(countAlimentos);
        console.log(countMuebles);

    });




    if (!requests) return <Loading show text="Cargando" />;
    if (size(requests) === 0) return <NotFound texto={"No hay estadisticas"} />;






    return (
        <View>
            <Text>HOLA</Text>
        </View>
    );
}