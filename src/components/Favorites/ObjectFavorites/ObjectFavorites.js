import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Icon, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { styles } from "./ObjectFavorites.styles";

export function ObjectFavorites(props) {
  const { favorites } = props;
  const navigation = useNavigation();

  const goToObject = () => {
    navigation.navigate(screen.objects.tab, {
      screen: screen.objects.objeto,
      params: {
        objeto: favorites,
      },
    });
  };

  const onRemoveFavorite = () => {
    console.log("eliminar favorito");
  };
  return (
    <TouchableOpacity onPress={goToObject}>
      <View style={styles.content}>
        <Image source={{ uri: favorites.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <Text style={styles.name}>{favorites.name}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#f00"
            size={35}
            containerStyle={styles.iconContainer}
            onPress={onRemoveFavorite}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
