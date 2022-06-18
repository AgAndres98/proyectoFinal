import React, { useState, useEffect } from "react";
import { View, Text, Switch } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils";
import { styles } from "./SwitchBtn.styles";

export function SwitchBtn(props) {
  const { idObjeto, activa } = props;
  const [isEnabled, setIsEnabled] = useState(activa);

  const toggleSwitch = async () => {
    try {
      setIsEnabled((prevState) => !prevState);
      if (isEnabled) {
        await deactivateObject();
      } else {
        await activateObject();
      }
    } catch (error) {
      setIsEnabled((prevState) => !prevState);
      console.log(error);
    }
  };

  const activateObject = async () => {
    await updateDoc(doc(db, "objetos", idObjeto), {
      activa: true,
    });
  };

  const deactivateObject = async () => {
    await updateDoc(doc(db, "objetos", idObjeto), {
      activa: false,
    });
  };

  return (
    <View style={styles.switchView}>
      {isEnabled !== undefined && (
        <>
          <Text style={styles.active}>{isEnabled ? "Activa" : "Inactiva"}</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={isEnabled ? "#62bd60" : "#f4f3f4"}
            ios_backgroundColor="#62bd60"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={styles.switch}
          />
        </>
      )}
    </View>
  );
}
