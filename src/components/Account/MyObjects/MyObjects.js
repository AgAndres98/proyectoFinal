import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Switch } from "react-native";
import { Image, Text, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { styles } from "./MyObjects.styles";
import { doc, deleteDoc } from "firebase/firestore";
import {UserRequest} from "../UserRequests/UserRequests";

export function MyObjects(props) {
  const { objects } = props;
  const navigation = useNavigation();

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const goToDetail = () => {};

  const gotToRequest = () => {
    navigation.navigate(screen.account.userRequests);
  };
  return (
    <View style={styles.screen}>
      <FlatList
        data={objects}
        renderItem={(doc) => {
          const objeto = doc.item.data();
          return (
            <TouchableOpacity onPress={() => goToDetail(objeto)}>
              <View style={styles.objeto}>
                <Image source={{ uri: objeto.fotos[0] }} style={styles.image} />

                <View style={styles.container}>
                  <View style={styles.informacion}>
                    <View>
                      <Text style={styles.name}>{objeto.titulo}</Text>
                    </View>

                    <View style={styles.switchView}>
                      <Text style={styles.active}>
                        {isEnabled ? "Activa" : "Inactiva"}
                      </Text>
                      <Switch
                        trackColor={{ false: "#767577", true: "#00a680" }}
                        thumbColor={isEnabled ? "#00a680" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        style={styles.switch}
                      />
                    </View>
                  </View>

                  <View>
                    <Text style={styles.info}>{objeto.descripcion}</Text>
                  </View>

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
                      name="trash-can-outline"
                      size={35}
                      containerStyle={styles.delete}
                      onPress={console.log("delete1")}
                    />

                    <Icon
                      type="material-community"
                      name="account-eye-outline"
                      size={35}
                      containerStyle={styles.eye}
                      onPress={gotToRequest}
                    />
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
