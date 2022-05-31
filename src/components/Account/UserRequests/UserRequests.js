import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Switch } from "react-native";
import { Image, Text, Icon, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { styles } from "./UserRequests.styles";
import { doc, deleteDoc } from "firebase/firestore";
import {getAuth} from 'firebase/auth';
import { object } from 'yup';
import {Modal, UserDataModal} from '../../Shared';



export function UserRequests(props) {
    const[userModal,setUserModal]=useState(false);

    const{photoURL}=getAuth().currentUser;
    const { request } = props;
    console.log("que trae");
    console.log(request);
    console.log("listo");
    const navigation = useNavigation();
    console.log("Ver si funciona");
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () =>
        setIsEnabled(previousState => !previousState);

    ;

    const goToDetail = () => {
    };
  const  selectComponent=()=>{}
   // console.log(objects.id);

    return (
        <View>
            <FlatList
                data={request}
                renderItem={(doc) => {
                    const peticion = doc.item.data();
                    console.log("que trae");
                   // console.log(request);
                    return (
                        <TouchableOpacity onPress={() => goToDetail}>

                            <View style={styles.container}>
                                <View style={styles.objeto}>

                                    <Avatar size="large" source={avatarUri(photoURL)} icon={{type:"material",name:"person"}} containerStyle={styles.image} />


                                    <View style={styles.informacion}>
                                      
                                        <Text style={styles.name}>{peticion.nombre+" "+ peticion.apellido}</Text>
                                      

                                        
                                        <Icon
                                            type="material-community"
                                            name="account-check-outline"
                                            size={35}
                                            containerStyle={styles.iconContainer}
                                            onPress={console.log("editar")}
                                        />

                                        <Icon
                                            type="material-community"
                                            name="account-remove-outline"
                                            size={35}
                                            containerStyle={styles.delete}
                                            onPress={console.log("delete")}
                                        />

                                        <Icon
                                            type="material-community"
                                            name="account-search-outline"
                                            size={35}
                                            containerStyle={styles.eye}
                                            onPress={console.log(selectComponent)}
                                        />


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


    function avatarUri(avatar){
        if(avatar!==null){
          return {uri:avatar};
        }
    }
}
