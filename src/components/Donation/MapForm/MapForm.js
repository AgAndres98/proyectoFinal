import React, { useState ,useEffect} from "react";
import {View} from "react-native";
import { Button } from "react-native-elements";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import MapView from "react-native-maps";
import {Modal} from "../../Shared"
import { styles } from "./MapForm.styles";

export function MapForm(props){

    const { show, close, formik } = props;
    const [location, setLocation] = useState({
        latitude: 0.001,
        longitude: 0.001,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });


    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if(status !== "granted"){
                Toast.show({
                    type: "info",
                    position: "bottom",
                    text1: "Tienes que activar la localización",
                });
                return;
            }
            const locationTemp = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: locationTemp.coords.latitude,
                longitude: locationTemp.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            })
        })();
    }, []);

    const guardarUbicacion = () => {
        formik.setFieldValue("ubicacion", location);
        close();
    }

    return (
        <Modal show={show} close={close}>
                <MapView showsUserLocation={true} style={styles.mapStyle} onRegionChange={(locationTemp) => setLocation(locationTemp)} >
                    <MapView.Marker draggable coordinate={location} />
                </MapView>
                <View style={styles.mapActions} >
                    <Button title="Guardar" containerStyle={styles.btnMapContainerGuardar} buttonStyle={styles.btnMapGuardar} onPress={guardarUbicacion} />
                    <Button title="Cerrar" containerStyle={styles.btnMapContainerCerrar} buttonStyle={styles.btnMapCerrar} onPress={close} />
                </View>
        </Modal>

    );
}
