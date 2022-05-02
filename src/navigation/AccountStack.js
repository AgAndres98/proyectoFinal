import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { AccountScreen } from "../screens/AccountScreen";
import { LoginScreen } from "../screens/Account/LoginScreen/LoginScreen";
import { RegisterScreen } from "../screens/Account/RegisterScreen/RegisterScreen";

const Stack = createNativeStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.account.account}
        component={AccountScreen}
        options={{ tittle: "Cuenta" }}
      />
      <Stack.Screen
        name={screen.account.login}
        component={LoginScreen}
        options={{ tittle: "Iniciar sesión" }}
      />
      <Stack.Screen
        name={screen.account.register}
        component={RegisterScreen}
        options={{ tittle: "Registrarse" }}
      />
    </Stack.Navigator>
  );
}
