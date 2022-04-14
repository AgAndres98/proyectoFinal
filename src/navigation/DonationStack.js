import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { DonationScreen } from "../screens/Donations/DonationScreen";

const Stack = createNativeStackNavigator();

export function DonationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.donation.donation}
        component={DonationScreen}
        options={{ tittle: "Donacion" }}
      />
    </Stack.Navigator>
  );
}
