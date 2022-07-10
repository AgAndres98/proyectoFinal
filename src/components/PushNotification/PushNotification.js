import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import {Notifications} from "expo";
import * as Permissions from "expo-permissions"; 


export function PushNotification() {
    const getToken=async()=>{
        const{status}=await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if(status!=="granted"){
            return;
        }
        const token=Notifications.getExpoPushTokenAsync();
        console.log(token);
        return token;
      };

      return{
        
      };

    }      