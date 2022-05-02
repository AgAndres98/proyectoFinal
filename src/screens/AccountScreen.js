import React, {useEffect, useState} from "react";
import { View, Text } from "react-native";
import { LoginScreen } from "../screens/Account/LoginScreen/LoginScreen";
import { ProfileUser } from "../screens/Account/Profile/ProfileUser";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function AccountScreen() {
  const [logeado, setLogeado] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
       setLogeado(user ? true : false);
    })
  }, []);
  return logeado ? <ProfileUser /> : <LoginScreen />;
}
