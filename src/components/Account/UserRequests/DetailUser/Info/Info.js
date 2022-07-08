import React from "react";
import { View } from "react-native";
import { Text, Icon, ListItem, Button } from "react-native-elements";
import { map } from "lodash";
import { Map } from "../../../../Shared";
import { styles } from "./Info.styles";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../../../utils";


export function Info(props) {
  const navigation = useNavigation();
  const { usuario } = props;
  const date = new Date(usuario.fecha);
  const dateDay = date.getDate();
  const dateMonth = date.getMonth() + 1;
  const dateYear = date.getFullYear();

  const navigateStats = () => {
    navigation.navigate(screen.account.Estadistica);
  };

  const dateFormatted = `${dateDay}/${dateMonth}/${dateYear}`;
  const listInfo = [
    {
      text: usuario.celular,
      iconType: "material-community",
      iconName: "phone",
    },
    {
      text: usuario.fechaNacimiento,
      iconType: "material-community",
      iconName: "calendar-week",
    },
  ];

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Información:</Text>
      <Text style={styles.texto} >{usuario.cuestionarioBeneficiario.descripcion}</Text>
      <Text style={styles.title}>Tipo de ayuda:</Text>


      {usuario.cuestionarioBeneficiario.ayuda == "familia" ? (
        <>

          <Text style={styles.texto} >Familia</Text>

        </>
      ) : (
        <>

          <Text style={styles.texto}>Unicamente yo</Text>

        </>
      )}
      {map(listInfo, (item, index) => (
        <ListItem style={styles.listInfo} key={index} bottomDivider>
          <Icon type={item.iconType} name={item.iconName} color="#62bd60" />
          <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}

      {/* 
          <Map
            style={styles.mapa}
            ubicacion={usuario.cuestionarioBeneficiario.ubicacion}
            titulo="Ubicacion"
          />
        */}


    </View>
  );
}
