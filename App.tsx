import React from "react";
import { Navigator } from "./src/navigation";
import { ThemeProvider } from "./src/utils/theme/theme.provider";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Ideas from "./src/screens/Ideas/ideas.screen";
import StoreWrapper from "./src/components/storeWrapper";

export default function App() {
  return (
  <ThemeProvider>
    <Provider store={store}> 
    <Navigator/>
    </Provider>
  </ThemeProvider>
  );
  
}

