import React from "react";
import { StyleSheet, View } from "react-native";
import { LoginForm } from "./src/components/LoginForm";
import { LoginFormProvider } from "./store/LoginForm.context";
import { Navigator } from "./src/navigation";
import { ThemeProvider } from "./src/utils/theme/theme.provider";

export default function App() {
  return (
  <ThemeProvider>
    <Navigator/>
  </ThemeProvider>
  );
  
}

