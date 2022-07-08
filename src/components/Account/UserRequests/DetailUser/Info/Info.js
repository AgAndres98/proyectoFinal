import React from "react";
import {
  View,
  TouchableOpacity,
  ToastAndroid,
  Linking,
  Clipboard,
} from "react-native";
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
      function: () => {
        const whatsappNo = "549" + usuario.celular;
        Linking.openURL(
          `whatsapp://send?phone=${whatsappNo}&text=Hola ${usuario.nombre}, me contacto por tu solicitud de la aplicación ayuDAR`
        );
      },
      longFunction: () => {
        Clipboard.setString(usuario.celular);
        ToastAndroid.show("Teléfono copiado correctamente", ToastAndroid.SHORT);
      },
    },
    {
      text: usuario.fechaNacimiento,
      iconType: "material-community",
      iconName: "calendar-week",
      function: () => {
        ToastAndroid.show("Fecha de nacimiento", ToastAndroid.SHORT);
      },
      longFunction: () => {
        ToastAndroid.show("Fecha de nacimiento", ToastAndroid.SHORT);
      },
    },
  ];

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Información:</Text>
      <Text style={styles.texto}>
        {usuario.cuestionarioBeneficiario.descripcion}
      </Text>
      <Text style={styles.title}>Tipo de ayuda:</Text>

      {usuario.cuestionarioBeneficiario.ayuda == "familia" ? (
        <>
          <Text style={styles.texto}>Familia</Text>
        </>
      ) : (
        <>
          <Text style={styles.texto}>Unicamente yo</Text>
        </>
      )}
      {map(listInfo, (item, index) => (
        <TouchableOpacity
          onPress={item.function}
          onLongPress={item.longFunction}
        >
          <ListItem style={styles.listInfo} key={index} bottomDivider>
            <Icon type={item.iconType} name={item.iconName} color="#62bd60" />
            <ListItem.Content>
              <ListItem.Title>{item.text}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      ))}

      {/* 
          <Map
            style={styles.mapa}
            ubicacion={usuario.cuestionarioBeneficiario.ubicacion}
            titulo="Ubicacion"
          />
        */}
      <Button
        title={"Ver stats"}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnCancel}
        onPress={() => {
          navigateStats();
        }}
      />
    </View>
  );
}
