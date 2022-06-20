import React from "react";
import { View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

import { styles } from "./CalendarView.styles";

export function CalendarView(props) {
  const { events, dates } = props;

  LocaleConfig.locales["es"] = {
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "Ene",
      "Feb",
      "Mar",
      "Abri",
      "May",
      "Jun",
      "Jul",
      "Agos",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    today: "Este día",
  };

  LocaleConfig.defaultLocale = "es";

  return (
    <View style={styles.screen}>
      <Calendar
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        markedDates={dates}
      />
    </View>
  );
}
