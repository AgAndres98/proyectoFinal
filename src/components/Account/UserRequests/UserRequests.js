import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from "react-native";
import { Text, Icon, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { styles } from "./UserRequests.styles";
import { doc, deleteDoc } from "firebase/firestore";
import {getAuth} from 'firebase/auth';
import { object } from 'yup';
import {Modal, UserDataModal} from '../../Shared';
import {map} from "lodash";


import { getStorage, ref, getDownloadURL } from "firebase/storage";
export function UserRequests(props) {
    const[userModal,setUserModal]=useState(false);
    
  
    const { dato} = props;
    const{idUsuario}=dato;
    const{photoURL}=getAuth()
   
   
    const navigation = useNavigation();
    
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () =>
        setIsEnabled(previousState => !previousState);

    ;
    console.log("PROBANDO2"); console.log(dato);
    const goToDetail = () => {
    };
  const  selectComponent=()=>{}
   // console.log(objects.id);

    // Create a reference to the file we want to download


//   return(
//     <View>{}dato.map((data)=>{
        
//     })</View>
//     );
  
   return (
        <View>
            <FlatList
                data={dato}
                renderItem={({item}) => {
                   // const peticion = doc.item.data();
                 //  require("../../../../assets/icon.png")
                    return (
                        <TouchableOpacity onPress={() => goToDetail}>

                            <View style={styles.container}>
                                <View style={styles.objeto}>

                                    <Avatar size="large" icon={{type:"material",name:"person"}} source={avatarUri(item.foto)}  containerStyle={styles.image} />
                                    

                                    <View style={styles.informacion}>
                                      
                                        <Text style={styles.name}>{item.datosPersonales.nombre +" "+ item.datosPersonales.apellido}</Text>
                                      

                                        <View style={styles.containerIcons}>
                                        <Icon
                                        solid="true"
                                            color={"green"}
                                            type="material-community"
                                            name="account-check-outline"
                                            size={35}
                                            containerStyle={styles.iconContainer}
                                            onPress={console.log("editar")}
                                        />

                                        <Icon
                                            color={"red"}
                                            type="material-community"
                                            name="account-remove-outline"
                                            size={35}
                                            containerStyle={styles.delete}
                                            onPress={console.log("delete")}
                                        />

                                        <Icon
                                             color={"#8073BD"}
                                            type="material-community"
                                            name="account-search-outline"
                                            size={35}
                                            containerStyle={styles.eye}
                                            onPress={console.log(selectComponent)}
                                        />
                                        </View>

                                    </View>





                                </View>


                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
            <Modal show={userModal} >
                <Text>Información sobre el usuario</Text>
                <Avatar size="large"  icon={{type:"material",name:"person"}} containerStyle={styles.image} />
                <Text>Email</Text>
                <Text>Telefono</Text>
                <Text>Descripcion</Text>
            </Modal>
        </View>
   );


    function avatarUri(item){
        console.log(item);
        if(item!==undefined){
          return (uri={uri:item});
        }else{
          
            return(require("../../../../assets/usuario2.png"))
        }
    }
}
