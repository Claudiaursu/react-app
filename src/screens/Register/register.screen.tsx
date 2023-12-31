import Ionicons from "@expo/vector-icons/Ionicons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Text } from "../../components";
import { TextInput } from "../../components/text-input";
import { basicAuth } from "../../utils/firebase";
import { RootStackParamList } from "../../navigation/navigator.types";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import registerStyles from "./register.styles";

type RegisterProps = NativeStackScreenProps<RootStackParamList, "Register">;

const Register = ({ navigation }: RegisterProps) => {

    <SafeAreaView>
        <Text>REGISTER</Text>
    </SafeAreaView>

  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const {
    theme: { colors },
    toggleThemeSchema
  } = useThemeConsumer();

  const styles = registerStyles(colors);
  const clearError = () => setError("");

  const handleRegister = async () => {
    try {
        console.log("Credentiale: ", registerForm.email + " " + registerForm.password);
      await createUserWithEmailAndPassword(
        basicAuth,
        registerForm.email,
        registerForm.password
      );
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    }
  };


  return (
    <SafeAreaView style={styles.authContainer}>
      <Text sx={styles.signUpLabel} variant="title">
        Create your account!
      </Text>

      {/* <Button 
        sx={{marginTop: 100}}
        variant="primary"
        onPress = { () => toggleThemeSchema() } 
        title="Switch theme" /> */}

      <TextInput
        onFocus={clearError}
        label="Email"
        value={registerForm.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) =>
          setRegisterForm({
            ...registerForm,
            email: text,
          })
        }
      />
      <TextInput
        onFocus={clearError}
        textStyle={styles.passwordInput}
        label="Password"
        value={registerForm.password}
        secureTextEntry
        onChangeText={(text) =>
          setRegisterForm({
            ...registerForm,
            password: text,
          })
        }
      />
      <Button
        sx={ styles.signUpButton }
        onPress={ handleRegister }
        title="Sign up"
      />
      {error && <Text sx={styles.errorText}>{error}</Text>}
      <View style={styles.orContainer}>
        <View style={styles.orContainerLine} />
        <Text>OR</Text>
        <View style={styles.orContainerLine} />
      </View>
      <View style={styles.logoOuterContainer}>
        <View style={styles.logoContainer}>
          <Ionicons name="logo-facebook" size={30} color={colors.text} />
          <Ionicons name="logo-google" size={30} color={colors.text} />
          <Ionicons name="logo-apple" size={30} color={colors.text} />
        </View>
      </View>
      <View style={styles.newAccount}>
        <Text>Do you have an account?</Text>
        <Text
          onPress={() => navigation.navigate("Login")}
          sx={styles.createNewAccount}
        >
          Sign in
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Register;