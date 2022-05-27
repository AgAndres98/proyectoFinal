import React, {useEffect, useState} from "react";
import { UserLoggedScreen } from "../screens/Account/UserLoggedScreen/UserLoggedScreen";
import { InformationPersonalScreen } from "./Auth/InformationPersonalScreen/InformationPersonalScreen"
import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  query,
  where,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db, screen } from "../utils";


export function AccountScreen() {

  const [datosPersonales, setDatosPersonales] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const q = query(
      collection(db, "datosPersonales"),
      where("idUsuario", "==", auth.currentUser.uid)
    );

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

      const cantidad = objectArray.length;

      if(cantidad > 0){
        setDatosPersonales(true);
      }
    });


  }, []);

  return datosPersonales ? <UserLoggedScreen /> : <InformationPersonalScreen />;
}
