// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import Constants from 'expo-constants';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants?.manifest?.firebase.apikey,
  authDomain: Constants?.manifest?.firebase.authDomain,
  projectId: Constants?.manifest?.firebase.projectId,
  storageBucket: Constants?.manifest?.firebase.storageBucket,
  messagingSenderId: Constants?.manifest?.firebase.messagingSenderId,
  appId: Constants?.manifest?.firebase.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = initializeAuth(app, {persistence: getReactNativePersistence(AsyncStorage)})

export default app;