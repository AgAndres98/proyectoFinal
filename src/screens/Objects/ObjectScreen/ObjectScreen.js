import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { styles } from "./ObjectScreen.styles";

import { Header, Info } from "../../../components/Objeto";

export function ObjectScreen(props) {
  const { route } = props;
  const [objeto, setObjeto] = useState(null);

  useEffect(() => {
    setObjeto(route.params.objeto);
  }, [route.params.id]);

  return (
    <View>
      <Header objeto={route.params.objeto} />
      <Info objeto={route.params.objeto} />
    </View>
  );
}
