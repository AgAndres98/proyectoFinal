import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Image, Icon, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { doc, deleteDoc } from "firebase/firestore";
import { db, screen } from "../../../utils";
import { styles } from "./ListEvents.styles";

export function ListEvents(props) {
  const { events } = props;
  const navigation = useNavigation();

  const goToEvent = () => {
    /*
    navigation.navigate(screen.objects.tab, {
      screen: screen.calendar.event,
      params: {
        id: event.id,
      },
    });*/
  };

  return (
    <View>
      <FlatList
        data={events}
        renderItem={(doc) => {
          const event = doc.item.data();
          return (
            <TouchableOpacity onPress={goToEvent}>
              <View style={styles.content}>
                <Image source={{ uri: event.fotos[0] }} style={styles.image} />
                <View style={styles.infoContent}>
                  <Text style={styles.name}>{event.titulo}</Text>
                  <Text style={styles.fecha}>{event.fecha}</Text>

                  <Text style={styles.descripcion}>{event.descripcion}</Text>

                  <View style={styles.direccionContainer}>
                    <Icon
                      type="material-community"
                      name="map-marker-outline"
                      color="#62bd60"
                      size={35}
                      containerStyle={styles.iconContainer}
                    />
                    <Text style={styles.direccion}>{event.direccion}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}