import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { RegisterScreen } from "../screens/Account/RegisterScreen";

const Stack = createNativeStackNavigator();

export function RegisterStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.register.register}
        component={RegisterScreen}
        options={{ tittle: "Register" }}
      />
    </Stack.Navigator>
  );
}