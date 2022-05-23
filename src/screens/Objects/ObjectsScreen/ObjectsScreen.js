import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { Button } from "react-native-elements";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { screen, db } from "../../../utils";
import { styles } from "./ObjectsScreen.styles";
import { ListObjects } from "../../../components/Objects";
export function ObjectsScreen(props) {
  const { navigation } = props;
  const [objects, setObjects] = useState(null);
  const objects2 = [
    {
      color: "purple",
      id: 1,
      name: "Remera",
      description: "Estoy en una descripción",
      email: "abc@abc.com",
      phone: "1234",
      city: "Santa Fe",
      adress: "direcc 123",
      images: [
        "https://media1.sistemacontinuo.com.ar/5289/remera-hombre-sublimable.jpg",
      ],
    },
    {
      color: "red",
      id: 2,
      name: "Pantalon",
      description: "Soy un pantalon",
      email: "abc@abc.com",
      phone: "1234",
      city: "Buenos Aires",
      adress: "UNLaM",
      images: [
        "https://media.istockphoto.com/photos/mens-trousers-picture-id510615049?k=20&m=510615049&s=612x612&w=0&h=V2qWdnou1w6ctJnfiRlYxQp6QwgX8yRMBBOCMxm7ei0=",
      ],
    },
  ];

  useEffect(() => {
    const q = query(collection(db, "objetos"), orderBy("ceratedAt", "desc"));

    onSnapshot(q, (snapshot) => {
      setObjects(snapshot.docs);
    });
  }, []);

  return (
    <View>
      <ListObjects objects={objects} />
    </View>
  );
}
