import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { CalendarScreen } from "../screens/Calendar/CalendarScreen";

const Stack = createNativeStackNavigator();

export function CalendarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.calendar.calendar}
        component={CalendarScreen}
        options={{ title: "Calendario de eventos" }}
      />
    </Stack.Navigator>
  );
}
