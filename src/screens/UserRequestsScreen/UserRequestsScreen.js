import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { getAuth } from "firebase/auth";
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    onSnapshot,
    Firestore,
} from "firebase/firestore";
import { size, map } from "lodash";
import { db } from "../../utils";
import { LoadingModal } from "../../components/Shared/LoadingModal";
import { UserRequests} from "../../components/Account/UserRequests";
import { styles } from "../../components/Account/UserRequests/UserRequests.styles";


export function UserRequestsScreen(props) {
    const auth = getAuth();
    const [request, setRequest] = useState(null);
 
    useEffect(() => {
        const q = query(
            collection(db, "datosPersonales"),
            where("idUsuario", "==", auth.currentUser.uid)
        );

        onSnapshot(q, (snapshot) => {
            setRequest(snapshot.docs);
        });
    }, []);

   //collection(db, "objetos"),
   //where("idObjeto", "==", objectId)
   /* const q = query(
        collection(db, "request"),
        where("idObjeto", "==", objectId)
    );


    onSnapshot(q, (snapshot) => {
        setObjects(snapshot.docs);
    });
}, []);
*/

    if (!request) return <LoadingModal show text="Cargando" />;


    return (
        <View style={styles.content}>
            {!request ? (
                <LoadingModal show text="Cargando" />
            ) : (
                <UserRequests request={request} />
            )}
        </View>
    );
}