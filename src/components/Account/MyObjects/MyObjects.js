import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Switch } from "react-native";
import { Image, Text, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { styles } from "./MyObjects.styles";
import { doc, deleteDoc } from "firebase/firestore";



export function MyObjects(props) {



    const { objects } = props;
    const navigation = useNavigation();


    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () =>
        setIsEnabled(previousState => !previousState);

    ;

    const goToDetail = () => {
    };



    return (
        <View>
            <FlatList
                data={objects}
                renderItem={(doc) => {
                    const objeto = doc.item.data();
                    console.log(objeto);
                    return (
                        <TouchableOpacity onPress={() => goToDetail(objeto)}>

                            <View style={styles.container}>
                                <View style={styles.objeto}>

                                    <Image source={{ uri: objeto.fotos[0] }} style={styles.image} />


                                    <View style={styles.informacion}>
                                        <Text style={styles.active}>{isEnabled ? "Activo" : "Inactivo"}</Text>
                                        <Text style={styles.name}>{objeto.titulo}</Text>
                                        <Text style={styles.info}>{objeto.descripcion}</Text>

                                        <Switch
                                            trackColor={{ false: '#767577', true: '#00a680' }}
                                            thumbColor={isEnabled ? '#00a680' : '#f4f3f4'}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={toggleSwitch}
                                            value={isEnabled}
                                            style={styles.switch}
                                        />

                                        <Icon
                                            type="material-community"
                                            name="pencil-box-outline"
                                            size={35}
                                            containerStyle={styles.iconContainer}
                                            onPress={console.log("editar")}
                                        />

                                        <Icon
                                            type="material-community"
                                            name="delete-outline"
                                            size={35}
                                            containerStyle={styles.delete}
                                            onPress={console.log("delete")}
                                        />

                                        <Icon
                                            type="material-community"
                                            name="account-eye-outline"
                                            size={35}
                                            containerStyle={styles.eye}
                                            onPress={console.log("delete")}
                                        />


                                    </View>





                                </View>


                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}
