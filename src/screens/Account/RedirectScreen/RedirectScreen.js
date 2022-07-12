import { View, Text } from 'react-native'
import React from 'react';
import { Loading } from '../../../components/Shared';
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function RedirectScreen(props) {
    const{route}=props;
    const navigation=useNavigation();
  console.log("navego");
    navigation.navigate(screen.account.EstadisticaBeneficiario,{year:parseInt(route.params.year)});

  return (
    <View>
        <Loading show text="Cargando" />
    </View>
  );
}