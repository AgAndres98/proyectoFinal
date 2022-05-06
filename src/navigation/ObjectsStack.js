import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { ObjectsScreen } from "../screens/Objects/ObjectsScreen";
import { ObjectScreen } from "../screens/Objects/ObjectScreen/ObjectScreen";

const Stack = createNativeStackNavigator();

export function ObjectsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.objects.objects}
        component={ObjectsScreen}
        options={{ title: "Objetos" }}
      />

      <Stack.Screen
        name={screen.objects.objeto}
        component={ObjectScreen}
        options={{ title: "Objeto" }}
      />
    </Stack.Navigator>
  );
}
