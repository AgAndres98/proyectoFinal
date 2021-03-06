import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import { InfoUser, AccountOptions } from "../../../components/Account";
import { LoadingModal } from "../../../components";
import { styles } from "./UserLoggedScreen.styles";

export function UserLoggedScreen() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [_, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

  const logOut = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <View style={styles.screen}>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />

      <AccountOptions onReload={onReload} />
      {
        //<LoadingModal show={setLoading} text={loading} />
      }
      <Button
        title={"Cerrar sesión"}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnLogout}
        onPress={logOut}
      />
      <LoadingModal show={loading} text={loadingText}/>
    </View>
  );
}
