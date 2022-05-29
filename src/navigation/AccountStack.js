import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { AccountScreen } from "../screens/AccountScreen";
import { InformationPersonalScreen } from "../screens/Auth/InformationPersonalScreen/InformationPersonalScreen";
import { DonorQuestionnaireScreen } from "../screens/Account/DonorQuestionnaireScreen/DonorQuestionnaireScreen";
import { MyObjects, myObjectsScreen } from "../screens/Account/MyObjectsScreen/myObjectsScreen";
import { UserRequestsScreen } from "../screens/UserRequestsScreen/UserRequestsScreen";
//import { UserRequests,UserRequestsScreen } from "../screens/Account/UserRequestsScreen/UserRequestsScreen";

const Stack = createNativeStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.account.account}
        component={AccountScreen}
        options={{ title: "Tu cuenta" }}
      />
      <Stack.Screen
        name={screen.account.informationPersonal}
        component={InformationPersonalScreen}
        options={{ title: "Información personal" }}
      />
      <Stack.Screen
        name={screen.account.donador}
        component={DonorQuestionnaireScreen}
        options={{ title: "Cuestionario donador" }}
      />

      <Stack.Screen
        name={screen.account.myObjects}
        component={myObjectsScreen}
        options={{ title: "Mis Objetos" }}
      />
      
      <Stack.Screen
        name={screen.account.userRequests}
        component={UserRequestsScreen}
        options={{ title: "Solicitudes de usuario" }}
      />

    </Stack.Navigator>
  );
}
