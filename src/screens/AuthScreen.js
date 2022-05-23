import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { LoginScreen } from "./Auth/LoginScreen/LoginScreen";
import { ProfileUser } from "./Account/Profile/ProfileUser";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function AuthScreen() {
  return <LoginScreen />;
}
