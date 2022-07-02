import React, { useState,useEffect } from 'react';
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
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

    {
      id: 'some uniq string id';
      title: 'list item title';
  }


   const [selectedItem, setSelectedItem] = useState(null);

   return(
   <AutocompleteDropdown
     clearOnFocus={false}
       closeOnBlur={true}
         closeOnSubmit={false}
           initialValue={{ id: '2' }} // or just '2'
             onSelectItem={setSelectedItem}
               dataSet={[
                   { id: '1', title: 'Alpha' },
                       { id: '2', title: 'Beta' },
                           { id: '3', title: 'Gamma' },
                             ]}
                             />
   );


}




    


