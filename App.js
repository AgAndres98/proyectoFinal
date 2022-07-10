import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { AppNavigation } from "./src/navigation/AppNavigation";
import { initFirebase } from "./src/utils";
import { PushNotification } from "../proyectoFinal/src/components/PushNotification";
import "react-native-get-random-values";
import {Notifications} from "expo";
import * as Permissions from "expo-permissions"; 
import React,{useEffect} from "react";
LogBox.ignoreAllLogs();

export default function App() {
  
  const registerForPushNotificationsAsync = async () => {
    
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      this.setState({ expoPushToken: token });
    
      
    };
    registerForPushNotificationsAsync();
  return (
    <>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>

      <Toast />
     
    </>
  );
}
