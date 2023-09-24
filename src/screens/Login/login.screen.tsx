import Ionicons from "@expo/vector-icons/Ionicons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { RootStackParamList } from "../../navigation/navigator.types";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import loginStyles from "./login.styles";
import { Text, Button } from '../../components';
import { TextInput } from "../../components/text-input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { basicAuth } from "../../utils/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

const Login = ({ navigation }: LoginProps) => {

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const {
    theme: { colors },
  } = useThemeConsumer();

  const clearError = () => setError("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(
        basicAuth,
        loginForm.email,
        loginForm.password
      );
      await AsyncStorage.setItem("email", loginForm.email);
      
    } catch (err: any) {
      setError(err.message);
    }
  };

  const styles = loginStyles(colors);

  const onGoogleButtonPress = async () => {
  //   // Check if your device supports Google Play
  //   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //   // Get the users ID token
  //   const { idToken } = await GoogleSignin.signIn();

  //   // Create a Google credential with the token
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(googleCredential);
  }

  return (
    <SafeAreaView style={styles.authContainer}>
      <Text sx={styles.signInLabel} variant="title">
        Sign in
      </Text>

      <TextInput
        onFocus={clearError}
        label="Email"
        value={loginForm.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) =>
          setLoginForm({
            ...loginForm,
            email: text,
          })
        }
      />
      <TextInput
        onFocus={clearError}
        textStyle={styles.passwordInput}
        label="Password"
        value={loginForm.password}
        secureTextEntry
        onChangeText={(text) =>
          setLoginForm({
            ...loginForm,
            password: text,
          })
        }
      />

      <Button sx={styles.signInButton} 
      onPress={handleLogin} 
      title="Sign in" 
      />
      {error && <Text sx={styles.errorText}>{error}</Text>}
      
      <View style={styles.orContainer}>
        <View style={styles.orContainerLine} />
        <Text>OR</Text>
        <View style={styles.orContainerLine} />
      </View>
      <View style={styles.logoOuterContainer}>
        <View style={styles.logoContainer}>
          <Ionicons name="logo-facebook" size={30} />
          <Ionicons name="logo-google" size={30} 
            onPress={() => onGoogleButtonPress}
          />
          <Ionicons name="logo-apple" size={30} />
        </View>
      </View>
      <View style={styles.newAccount}>
        <Text>Don't have an account?</Text>
        <Text
          onPress={() => navigation.navigate("Register")}
          sx={styles.createNewAccount}
        >
          Create one
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;