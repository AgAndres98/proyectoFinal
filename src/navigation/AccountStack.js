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
import { DetailUserScreen } from "../screens/Account/UserRequestsScreen/DetailUserScreen/DetailUserScreen";
import { EstadisticaScreen } from "../screens/EstadisticaScreen";
import { EstadisticaBeneficiarioScreen } from "../screens/EstadisticaBeneficiarioScreen";
import { RedirectScreen,RedirectEstadisticaScreen } from "../screens/Account";

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

      <Stack.Screen
        name={screen.account.DetailUser}
        component={DetailUserScreen}
        options={{
          title: "Detalle usuario",
        }}
      />

      <Stack.Screen
        name={screen.account.Estadistica}
        component={EstadisticaScreen}
        options={{
          title: "Estadisticas solicitudes",
        }} />

      <Stack.Screen
        name={screen.account.EstadisticaBeneficiario}
        component={EstadisticaBeneficiarioScreen}
        options={{
          title: "Estadisticas objetos",
        }}
      />
       <Stack.Screen
        name={screen.account.redirect}
        component={RedirectScreen}
        options={{ title: "Estadisticas Objetos"}}
      />
      <Stack.Screen
        name={screen.account.redirectEstadistica}
        component={RedirectEstadisticaScreen}
        options={{ title: "Estadisticas Solicitudes"}}
      />
      
    </Stack.Navigator>
  );
}
