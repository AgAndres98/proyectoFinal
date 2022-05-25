import React,{useState} from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import {LoadingModal} from "../../../components";
import {InfoUser,AccountOptions} from "../../../components/Account";
import {styles} from "./UserLoggedScreen.styles";


export function UserLoggedScreen() {
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [_, setReload] = useState(false);

    const onReload=()=>setReload((prevState)=> !prevState);

    const logOut = async () => {
        const auth=getAuth();
        await signOut(auth);
    }; 

    return (
        <View >
            <InfoUser setLoading={setLoading} setloadingText={setLoadingText}/>

            <AccountOptions onReload={onReload}/>
            <Button title={"Cerrar Sesión"} buttonStyle={styles.btnStyles} titleStyle={styles.btnTextStyle} onPress={logOut}/>

            <LoadingModal show={loading} text={loadingText}/>

            <LoadingModal show={loading} text={loadingText}/>
        </View>
    );
}