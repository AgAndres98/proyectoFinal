import React from "react";
import { View, FlatList, TouchableOpacity, TextInput, Icon } from "react-native";
import { Text, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./ListObjects.styles";
import { screen } from "../../../utils/";

export function ListObjects(props) {
  const { objects } = props;
  const navigation = useNavigation();

  const goToObject = (objeto) => {
    navigation.navigate(screen.objects.objeto, { id: objeto.id });
  };

  return (
    <View>
      <FlatList
        data={objects}
        renderItem={(doc) => {
          const objeto = doc.item.data();
          return (
            <TouchableOpacity onPress={() => goToObject(objeto)}>
              <View style={styles.objeto}>
                <Image source={{ uri: objeto.fotos[0] }} style={styles.image} />

                <View style={styles.informacion}>
                  <Text style={styles.name}>{objeto.titulo}</Text>
                  <Text style={styles.info}>{objeto.tipo}</Text>
                  <Text style={styles.info}>{objeto.descripcion}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
