import React from "react";
import MapView, { Marker } from "react-native-maps";
import openMap from "react-native-open-maps";
import { styles } from "./Map.styles";

export function Map(props) {
  const { ubicacion, titulo } = props;

  const openAppMap = () => {
    openMap({
      latitude: ubicacion.latitude,
      longitude: ubicacion.longitude,
      zoom: 25,
      query: titulo,
    });
  };

  return (
    <MapView
      style={styles.content}
      initialRegion={ubicacion}
      onPress={openAppMap}
    >
      {<Marker coordinate={ubicacion} />}
    </MapView>
  );
}
