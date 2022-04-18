import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import { DonationStack } from "./DonationStack";
import { FavoritesStack } from "./FavoritesStack";
import { CalendarStack } from "./CalendarStack";
import { AccountStack } from "./AccountStack";
import { ObjectsStack } from "./ObjectsStack";

import { screen } from "../utils";
//import { Tab } from "react-native-elements";

const Tab = createBottomTabNavigator();

export function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#00a680",
        tabBarInactiveTintColor: "#646464",
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
      })}
    >
      <Tab.Screen
        name={screen.favorites.tab}
        component={FavoritesStack}
        options={{ title: "Tus favoritos" }}
      />
      <Tab.Screen
        name={screen.objects.tab}
        component={ObjectsStack}
        options={{ title: "Objetos" }}
      />
      <Tab.Screen
        name={screen.donation.tab}
        component={DonationStack}
        options={{ title: "Haz una donación" }}
      />
      <Tab.Screen
        name={screen.calendar.tab}
        component={CalendarStack}
        options={{ title: "Calendario de eventos" }}
      />
      <Tab.Screen
        name={screen.account.tab}
        component={AccountStack}
        options={{ title: "Tu cuenta" }}
      />
    </Tab.Navigator>
  );
}

function screenOptions(route, color, size) {
  let iconName;

  if (route.name === screen.favorites.tab) {
    iconName = "heart-outline";
  }

  if (route.name === screen.objects.tab) {
    iconName = "treasure-chest";
  }

  if (route.name === screen.donation.tab) {
    iconName = "plus";
  }

  if (route.name === screen.calendar.tab) {
    iconName = "calendar";
  }

  if (route.name === screen.account.tab) {
    iconName = "home-outline";
  }

  return (
    <Icon type="material-community" name={iconName} color={color} size={size} />
  );
}
