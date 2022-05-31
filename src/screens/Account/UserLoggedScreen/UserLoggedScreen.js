import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import { LoadingModal } from "../../../components";
import { InfoUser, AccountOptions } from "../../../components/Account";
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
      <InfoUser setLoading={loadingText} setloadingText={setLoadingText} />

      <AccountOptions onReload={onReload} />
      <View style={styles.content}>
        <Button
          title={"Cerrar sesión"}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnLogout}
          onPress={logOut}
        />
      </View>
      <LoadingModal show={setLoading} text={loading} />
    </View>
  );
}
