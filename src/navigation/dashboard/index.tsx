import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Home from "../../screens/Home";
// import Settings from "../../screens/Settings";
import Login from "../../screens/Login";
import Register from "../../screens/Register";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RootStackParamList } from "../navigator.types";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import Home from "../../screens/Home";
import Settings from "../../screens/Settings";
import Ideas from "../../screens/Ideas";

const Tab = createBottomTabNavigator<RootStackParamList>();

export const Dashboard = () => {
  const {
    theme: {
      colors: { primary, secondary },
    },
  } = useThemeConsumer();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "Ideas") {
            iconName = focused ? "bulb-sharp" : "bulb-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: secondary,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Ideas" component={Ideas} />

    </Tab.Navigator>
  );
};