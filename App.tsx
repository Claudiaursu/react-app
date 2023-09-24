import React from "react";
import { Navigator } from "./src/navigation";
import { ThemeProvider } from "./src/utils/theme/theme.provider";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Ideas from "./src/screens/Ideas/ideas.screen";
import StoreWrapper from "./src/components/storeWrapper";
//import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Constants from 'expo-constants';
import { PictureComponent } from "./src/components/picture/picture.component";

export default function App() {
//   GoogleSignin.configure({
//   webClientId: Constants?.manifest?.firebase.webClientID,
// });

  return (
  <ThemeProvider>
    <Provider store={store}> 
    <Navigator/>
    {/* <PictureComponent/> */}
    </Provider>
  </ThemeProvider>
  );
  
}

