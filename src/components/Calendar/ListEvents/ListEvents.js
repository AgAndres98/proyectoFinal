import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Image, Icon, Text } from "react-native-elements";
import { forEach } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { screen } from "./../../../utils";
import { styles } from "./ListEvents.styles";
import { CalendarView } from "../../../components/Calendar";

export function ListEvents(props) {
  const { events } = props;
  const navigation = useNavigation();
  let eventosFormateados = [];
  let fechaFormateada = [];
  let dates = {};

  events.map(function (doc) {
    eventosFormateados.push(doc.data());
  });
  forEach(eventosFormateados, async (item) => {
    const date = new Date(item.fecha);

    const dateDay = date.getDate();

    const dateMonth = date.getMonth() + 1;

    const dateYear = date.getFullYear();

    item.fecha = `${dateYear}-${("0" + dateMonth).slice(-2)}-${(
      "0" + dateDay
    ).slice(-2)}`;
    fechaFormateada.push(item.fecha);

  });

  fechaFormateada.forEach((val) => {
    dates[val] = { selected: true, selectedColor: "#62bd60" };
  });

  const goToEvent = (id) => {
    navigation.navigate(screen.calendar.eventsDetail, { id: id });
  };

  return (
    <View style={{ flex: 1 }}>
      <CalendarView events={events} dates={dates} />
      <FlatList
        data={events}
        renderItem={(doc) => {
          const event = doc.item.data();
          const date = new Date(event.fecha);
          const dateDay = date.getDate();
          const dateMonth = date.getMonth() + 1;
          const dateYear = date.getFullYear();

          const dateFormatted = `${dateDay}/${dateMonth}/${dateYear}`;
          return (
            <TouchableOpacity
              onPress={() => {
                goToEvent(event.id);
              }}
            >
              <View style={styles.content}>
                <Image source={{ uri: event.fotos[0] }} style={styles.image} />
                <View style={styles.infoContent}>
                  <Text style={styles.name}>{event.titulo}</Text>
                  <Text style={styles.fecha}>{dateFormatted}</Text>

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
