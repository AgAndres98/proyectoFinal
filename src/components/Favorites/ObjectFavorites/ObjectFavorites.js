import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Icon, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { doc, deleteDoc } from "firebase/firestore";
import { db, screen } from "../../../utils";
import { styles } from "./ObjectFavorites.styles";
import { BtnRequestFavorites } from "../BtnRequestFavorites";

export function ObjectFavorites(props) {
  const { objeto } = props;
  const navigation = useNavigation();

  const goToObject = () => {
    navigation.navigate(screen.objects.tab, {
      screen: screen.objects.objeto,
      params: {
        id: objeto.id,
      },
    });
  };

  const onRemoveFavorite = async () => {
    try {
      await deleteDoc(doc(db, "favorites", objeto.idFavorite));
    } catch (error) {}
  };
  return (
    <TouchableOpacity onPress={goToObject}>
      <View style={styles.content}>
        <Image source={{ uri: objeto.fotos[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <Text style={styles.name}>{objeto.titulo}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#F02B2F"
            size={35}
            containerStyle={styles.iconContainer}
            onPress={onRemoveFavorite}
          />
        </View>

        <BtnRequestFavorites
          idObjeto={objeto.id}
          idUsuario={objeto.idUsuario}
          style={styles.container}
        />
      </View>
    </TouchableOpacity>
  );
}
