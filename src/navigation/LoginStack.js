import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { LoginScreen } from "../screens/Account/LoginScreen/LoginScreen";

const Stack = createNativeStackNavigator();

export function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.account.login}
        component={LoginScreen}
        options={{ tittle: "Login" }}
      />
    </Stack.Navigator>
  );
}