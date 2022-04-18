import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { Button } from "react-native-elements";
import { screen } from "../../../utils";
import { styles } from "./ObjectsScreen.styles";
import { ListObjects } from "../../../components/Objects";

export function ObjectsScreen(props) {
  const { navigation } = props;

  const goToObject = () => {
    navigation.navigate(screen.objects.objeto);
    //para viajar a otra pestaña/tab:
    //navigation.navigate(screen.account.tab,{screen:screen.account.account});
  };

  const objects = [
    {
      color: "purple",
      id: 1,
      name: "Remera",
      description: "Estoy en una descripción",
      city: "Santa Fe",
      images:
        "https://media1.sistemacontinuo.com.ar/5289/remera-hombre-sublimable.jpg",
    },
    {
      color: "red",
      id: 2,
      name: "Pantalon",
      description: "Soy un pantalon usado",
      city: "Buenos Aires",
      images:
        "https://media.istockphoto.com/photos/mens-trousers-picture-id510615049?k=20&m=510615049&s=612x612&w=0&h=V2qWdnou1w6ctJnfiRlYxQp6QwgX8yRMBBOCMxm7ei0=",
    },
    {
      color: "purple",
      id: 3,
      name: "Remera",
      description: "Estoy en una descripción",
      city: "Santa Fe",
      images:
        "https://media1.sistemacontinuo.com.ar/5289/remera-hombre-sublimable.jpg",
    },
    {
      color: "red",
      id: 4,
      name: "Pantalon",
      description: "Soy un pantalon usado",
      city: "Buenos Aires",
      images:
        "https://media.istockphoto.com/photos/mens-trousers-picture-id510615049?k=20&m=510615049&s=612x612&w=0&h=V2qWdnou1w6ctJnfiRlYxQp6QwgX8yRMBBOCMxm7ei0=",
    },
    {
      color: "purple",
      id: 5,
      name: "Remera",
      description: "Estoy en una descripción",
      city: "Santa Fe",
      images:
        "https://media1.sistemacontinuo.com.ar/5289/remera-hombre-sublimable.jpg",
    },
    {
      color: "red",
      id: 6,
      name: "Pantalon",
      description: "Soy un pantalon usado",
      city: "Buenos Aires",
      images:
        "https://media.istockphoto.com/photos/mens-trousers-picture-id510615049?k=20&m=510615049&s=612x612&w=0&h=V2qWdnou1w6ctJnfiRlYxQp6QwgX8yRMBBOCMxm7ei0=",
    },
    {
      color: "purple",
      id: 7,
      name: "Remera",
      description: "Estoy en una descripción",
      city: "Santa Fe",
      images:
        "https://media1.sistemacontinuo.com.ar/5289/remera-hombre-sublimable.jpg",
    },
    {
      color: "red",
      id: 8,
      name: "Pantalon",
      description: "Soy un pantalon usado",
      city: "Buenos Aires",
      images:
        "https://media.istockphoto.com/photos/mens-trousers-picture-id510615049?k=20&m=510615049&s=612x612&w=0&h=V2qWdnou1w6ctJnfiRlYxQp6QwgX8yRMBBOCMxm7ei0=",
    },
  ];
  return (
    <View>
      <ListObjects objects={objects} />
    </View>
  );
}
