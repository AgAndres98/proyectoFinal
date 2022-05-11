import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { LoginScreen } from "../screens/Auth/LoginScreen/LoginScreen";
import { RegisterScreen } from "../screens/Auth/RegisterScreen/RegisterScreen";

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.auth.login}
        component={LoginScreen}
        options={{ title: "Iniciar sesión" }}
      />
      <Stack.Screen
        name={screen.auth.register}
        component={RegisterScreen}
        options={{ title: "Registrarse" }}
      />
    </Stack.Navigator>
  );
}
