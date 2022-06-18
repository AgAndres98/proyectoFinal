import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  query,
  where,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../utils";
import { UserLoggedScreen } from "../screens/Account";
import { InformationPersonalScreen } from "./Auth";
import { styles } from "./Screens.styles";

export function AccountScreen() {
  const [datosPersonales, setDatosPersonales] = useState(true);

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

      if (cantidad == 0) {
        setDatosPersonales(false);
      }
    });
  }, []);

  return datosPersonales ? (
    <UserLoggedScreen />
  ) : (
    <InformationPersonalScreen style={styles.screen} />
  );
}
