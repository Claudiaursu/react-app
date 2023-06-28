import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../navigator.types";
import Login from "../../screens/Login";
import Register from "../../screens/Register";
import Ideas from "../../screens/Ideas";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Authentication = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};