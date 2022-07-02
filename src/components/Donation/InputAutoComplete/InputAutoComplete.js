import React, { useState,useEffect } from 'react';
import { View, Text } from 'react-native';
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";

export function inputAutoComplete(){
    const[datos,setDatos]=useState([]);

    useEffect(()=>{
        const q=query(collection(db,"Otros"),
        );
        onSnapshot(q,(snapshot)=>{
            setDatos(snapshot.docs);
        });
    },[]);
    console.log(datos.docs);

  return (
    <View>
      <Autocomplete
         disablePortal
         id="combo-box-demo"
         getOptionLabel={(datos)=>'$datos.nombre'}
         options={datos}
         sx={{ width: 300 }}
         isOptionEqualToValue={(option,value)=>option.nombre===value.nombre}
        renderInput={(params) => <TextField {...params} label="Otros" />}
        noOptionsText={"No hay coincidencias"}
       />
    </View>
  )
}
