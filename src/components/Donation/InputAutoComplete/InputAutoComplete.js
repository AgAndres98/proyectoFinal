import React, { useState,useEffect, useCallback } from 'react';
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import {db} from "../../../utils";
import { async } from '@firebase/util';

export  function InputAutoComplete(props){
  const[datos,setDatos]=useState(null);

 let datosAMostrar=[]

  useEffect(()=>{
    const q=query(collection(db,"otros"),
    );
    onSnapshot(q,(snapshot)=>{
        setDatos(snapshot.docs);
    });
    
    
    },[datos]);

    if(datos!==null){
      datos.map(function(doc){
      
        datosAMostrar.push(doc.data()) 
      
       })
    }
  //  const a=datosAMostrar.find(element =>element.title==selectedItem);
   //modificar select item

    const [selectedItem, setSelectedItem] = useState(null);
   const getItem=useCallback( item=>{setSelectedItem(item)})
    return(
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        onChangeText={getItem}
        initialValue={{ id: '7TcX6nuAnCNreMw2X1mV' }} // or just '2'
        onSelectItem={item=>{item&&setSelectedItem(item.title)}} 

        // formik.setFieldValue("tipoOtro", itemValue) 
        dataSet={
         datosAMostrar
        }
      />
    );



}  