import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { CalendarScreen, EventDetailScreen } from "../screens/Calendar";

const Stack = createNativeStackNavigator();

export function CalendarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.calendar.calendar}
        component={CalendarScreen}
        options={{ title: "Calendario de eventos" }}
      />
      <Stack.Screen
        name={screen.calendar.eventsDetail}
        component={EventDetailScreen}
        options={{ title: "Eventos" }}
      />
    </Stack.Navigator>
  );
}
