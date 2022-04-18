import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
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
          const objeto = doc.item;
          console.log(objeto);
          return (
            <TouchableOpacity onPress={() => goToObject(objeto)}>
              <View style={styles.objeto}>
                <Image source={{ uri: objeto.images }} style={styles.image} />
                <View>
                  <Text style={styles.name}>{objeto.name}</Text>
                  <Text style={styles.info}>{objeto.city}</Text>
                  <Text style={styles.info}>{objeto.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
