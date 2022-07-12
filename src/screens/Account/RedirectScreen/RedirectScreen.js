import React, { useState, useEffect } from "react";
import { Loading } from '../../../components/Shared';
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { collection, query, onSnapshot, doc, getDoc, where } from "firebase/firestore";
import { size, forEach, map } from "lodash";
import { EstadisticaBeneficiarioFiltrado } from "../../../components/EstadisticaBeneficiarioFiltrado";


export function RedirectScreen(props) {
    const { route } = props;
    const navigation = useNavigation();

    //  console.log(typeof(route.params.year))
    if (route.params.year === null) {
        route.params.year = new Date().getFullYear();
        console.log("dato que le envio si no lleno nada", route.params.year);
    }
    console.log("dato que le envio por redirect", route.params.year);



    const [showModal, setShowModal] = useState(false);
    const onCloseOpenModal = () => setShowModal((prevState) => !prevState);
    const [objetos, setObjetos] = useState(null);
    const [requests, setRequests] = useState(null);
    const [delivered, setDelivered] = useState(null);
    let arrayRequestDelivered = [];
    const year = route.params.year;
    //year.toString();
    //console.log(typeof(year))
    console.log("EstadisticaBeneficiarioScreen", route.params.year)

    useEffect(() => {
        const q = query(collection(db, "objetos"), where("year", "==", parseInt(route.params.year)));

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
        const q2 = query(collection(db, "delivered"), where("year", "==", parseInt(route.params.year)));

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
        const q3 = query(collection(db, "requests"), where("year", "==", parseInt(route.params.year)));

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
        <EstadisticaBeneficiarioFiltrado objetos={objetos} porcentajeFinal={porcentajeFinal} year={year} />
    );
}