import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { AccountScreen } from "../screens/AccountScreen";
import { InformationPersonalScreen } from "../screens/Auth/InformationPersonalScreen/InformationPersonalScreen";
import {
  DonorQuestionnaireScreen,
  EditObjectScreen,
  BeneficiaryQuestionnaireScreen,
  EditDonorQuestionnaireScreen,
  EditBeneficiaryQuestionnaireScreen,
  MyObjectsScreen,
  UserRequestsScreen,
} from "../screens/Account";
import { EditEventScreen, MyEventsScreen } from "./../screens/Admin";

const Stack = createNativeStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.account.account}
        component={AccountScreen}
        options={{
          title: "Tu cuenta",
        }}
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
        name={screen.account.beneficiary}
        component={BeneficiaryQuestionnaireScreen}
        options={{ title: "Cuestionario beneficiario" }}
      />

      <Stack.Screen
        name={screen.account.myObjects}
        component={MyObjectsScreen}
        options={{
          title: "Mis objetos",
        }}
      />

      <Stack.Screen
        name={screen.account.userRequests}
        component={UserRequestsScreen}
        options={{ title: "Solicitudes de usuarios" }}
      />

      <Stack.Screen
        name={screen.account.editEvent}
        component={EditEventScreen}
        options={{ title: "Editar evento" }}
      />

      <Stack.Screen
        name={screen.account.editObject}
        component={EditObjectScreen}
        options={{ title: "Editar objeto" }}
      />

      <Stack.Screen
        name={screen.account.editDonnor}
        component={EditDonorQuestionnaireScreen}
        options={{ title: "Editar cuestionario donante" }}
      />

      <Stack.Screen
        name={screen.account.editBeneficiary}
        component={EditBeneficiaryQuestionnaireScreen}
        options={{ title: "Editar cuestionario beneficiario" }}
      />

      <Stack.Screen
        name={screen.account.myEvents}
        component={MyEventsScreen}
        options={{
          title: "Mis eventos",
        }}
      />
    </Stack.Navigator>
  );
}
