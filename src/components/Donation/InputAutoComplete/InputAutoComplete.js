import React, { useState,useEffect } from 'react';
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";

import {db} from "../../../utils";

export  function InputAutoComplete(){
  const[datos,setDatos]=useState(null);

  useEffect(()=>{
    const q=query(collection(db,"Otros"),
    );
    onSnapshot(q,(snapshot)=>{
        setDatos(snapshot.docs);
    });
    },[]);

}  