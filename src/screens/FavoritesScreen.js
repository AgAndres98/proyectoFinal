import React from "react";
import { ScrollView } from "react-native";
import { ObjectFavorites, NotFoundObjects } from "../components/Favorites";
import { size, map } from "lodash";

export function FavoritesScreen() {
  const favorites = [
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

  const favoritesVacio = [];

  if (!favorites) {
    //return loading modal
    console.log("loading");
  }

  if (size(favorites) === 0) return <NotFoundObjects />;

  return (
    <ScrollView>
      {map(favorites, (favorites) => (
        <ObjectFavorites key={favorites.id} favorites={favorites} />
      ))}
    </ScrollView>
  );
}
