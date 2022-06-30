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
    let count = 0;


    useEffect(() => {
        const q = query(
            collection(db, "requests"),
        );

        onSnapshot(q, (snapshot) => {
            setRequest(snapshot.docs);
        });
    }, []);

    forEach(requests, async (item) => {


        count = count + 1;
    });


    if (!requests) return <Loading show text="Cargando" />;
    if (size(requests) === 0) return <NotFound texto={"No hay estadisticas"} />;

    console.log(count);




    return (
        <View>
            <Text>HOLA</Text>
        </View>
    );
}