import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { MyObjects } from "../components/MyObjects";
import { NotFoundObjects } from "../components/NotFoundObjects";
import { getAuth } from "firebase/auth";
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    onSnapshot,
} from "firebase/firestore";
import { size, map } from "lodash";
import { Loading } from "../components/Shared";
import { db } from "../utils";
import { MyObjects } from "../../../components/Account/MyObjects/MyObjects";

export function myObjectsScreen() {
    const auth = getAuth();
    const [objects, setObjects] = useState(null);

    useEffect(() => {
        const q = query(
            collection(db, "objetos"),
            where("idUsuario", "==", auth.currentUser.uid)
        );

        onSnapshot(q, async (snapshot) => {
            let objectArray = [];

            for await (const item of snapshot.docs) {
                const data = item.data();
                const docRef = doc(db, "objetos", data.id);
                const docSnap = await getDoc(docRef);
                const newData = docSnap.data();
                newData.idFavorite = data.id;

                objectArray.push(newData);
            }
            setObjects(objectArray);
        });
    }, []);

    if (!objects) return <Loading show text="Cargando" />;

    if (size(objects) === 0) return <NotFoundObjects />;

    return (
        <ScrollView>
            {map(objects, (objeto) => (
                <MyObjects key={objeto.id} objeto={objeto} />
            ))}
        </ScrollView>
    );
}
