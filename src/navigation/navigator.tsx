import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Appearance } from "react-native";
import { useThemeConsumer } from "../utils/theme/theme.consumer";
import { Authentication } from "./authentication";
import { Dashboard } from "./dashboard";
import { useAuthentication } from "../hooks/useAuthentication";

export const Navigator = () => {
  const { activeScheme, toggleThemeSchema, theme } = useThemeConsumer();
  const { user } = useAuthentication();

  Appearance.addChangeListener((scheme) => {
    if (scheme.colorScheme !== activeScheme) {
      toggleThemeSchema();
    }
  });

  return (
    <NavigationContainer theme={theme}>
      {user ? <Dashboard /> : <Authentication />}
    </NavigationContainer>
  );
};