import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { ObjectsScreen } from "../screens/Objects/ObjectsScreen";
import { ObjectDetailScreen } from "../screens/Objects/ObjectDetailScreen";

const Stack = createNativeStackNavigator();

export function ObjectsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.objects.objects}
        component={ObjectsScreen}
        options={{ tittle: "Objetos" }}
      />

      <Stack.Screen
        name={screen.objects.objeto}
        component={ObjectDetailScreen}
        options={{ tittle: "Objeto" }}
      />
    </Stack.Navigator>
  );
}
