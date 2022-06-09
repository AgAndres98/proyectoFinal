import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { AddEventScreen } from "../screens/Admin/AddEventScreen/AddEventScreen";

const Stack = createNativeStackNavigator();

export function AddEventStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.addEvent.addEvent}
        component={AddEventScreen}
        options={{ title: "Crear eventos" }}
      />
    </Stack.Navigator>
  );
}
