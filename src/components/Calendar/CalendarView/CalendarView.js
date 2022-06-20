import React,{useEffect,useState} from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import {Calendar, CalendarList, Agenda,LocaleConfig} from 'react-native-calendars';
import { forEach } from "lodash";
import { Loading } from '../../Shared';

export function CalendarView(props){
  
  const { events } = props;
  let eventosFormateados=[];
  let fechaFormateada=[];
  let datess = {};

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };


  useEffect(() => {
   // setRefreshing(true);
    events.map(function (doc) {
      eventosFormateados.push(doc.data());
    });
    forEach(eventosFormateados , async (item) => { 
      
      const date = new Date(item.fecha);

      const dateDay = date.getDate();
    
      const dateMonth = date.getMonth() + 1;
    
      const dateYear = date.getFullYear();
    
    
    
      item.fecha = `${dateYear}-${("0"+dateMonth).slice(-2)}-${("0"+dateDay).slice(-2)}`;
      fechaFormateada.push(item.fecha);
     // console.log(fechaFormateada);

    
    });
   
    const fechasTest=fechaFormateada;
    
      fechasTest.forEach((val) => {
      datess[val] =  {selected: true,selectedColor: '#62bd60'};
    });
    wait(5000).then(() => setRefreshing(false));
  }, [eventosFormateados]);
  
 
 
  

    LocaleConfig.locales['es']={
      monthNames:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort:['Ene', 'Feb', 'Mar', 'Abri', 'May', 'Jun', 'Jul', 'Agos', 'Sep', 'Oct', 'Nov', 'Dic'],
      dayNames:['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort:['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      today:'Este día'
    };

    LocaleConfig.defaultLocale = 'es';



//     const fechasTest=fechaFormateada;
   
//       fechasTest.forEach((val) => {
//       datess[val] =  {selected: true,selectedColor: 'blue'};
// });
 // console.log(datess);
    
      
   // dates : {selected: true, selectedColor: 'blue'},
   //console.log(dates.length);
 //  if (refreshing===true) return <Loading show text="Cargando objeto" />;
   
        return(
          
         <View>
          <Calendar
         
          onDayPress={day => {
            console.log('selected day', day);
          }}
          markedDates={
            
          datess
          
          }
          
         /></View>
        );
}
 





 
    




