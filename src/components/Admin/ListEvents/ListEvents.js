import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Image, Icon, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./ListEvents.styles";
import { screen } from "./../../../utils";

export function ListEvents(props) {
  const { events } = props;
  const navigation = useNavigation();

  const goToEvent = (id) => {
    navigation.navigate(screen.calendar.eventsDetail, { id: id });
  };

  return (
    <View>
      <FlatList
        data={events}
        renderItem={(doc) => {
          const event = doc.item.data();
          return (
            <View style={styles.content}>
              <Image source={{ uri: event.fotos[0] }} style={styles.image} />
              <View style={styles.infoContent}>
                <Text style={styles.name}>{event.titulo}</Text>
                <Text style={styles.fecha}>{event.fecha}</Text>

                <Text style={styles.descripcion}>{event.descripcion}</Text>

                <View style={styles.iconosContainer}>
                  <Icon
                    type="material-community"
                    name="pencil-outline"
                    size={35}
                    containerStyle={styles.edit}
                    onPress={console.log("editar1")}
                  />

                  <Icon
                    type="material-community"
                    name="delete-outline"
                    size={35}
                    containerStyle={styles.delete}
                    onPress={console.log("delete1")}
                  />
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}