import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { styles } from "./ObjectScreen.styles";

export function ObjectScreen(props) {
  const { route } = props;
  const [objeto, setObject] = useState(null);

  useEffect(() => {
    setObject(null);
  }, [route.params.id]);

  return (
    <View>
      <Text>ObjectScreen</Text>
    </View>
  );
}
