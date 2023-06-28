import Ionicons from "@expo/vector-icons/Ionicons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { RootStackParamList } from "../../navigation/navigator.types";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import { Text, Button } from '../../components';
import { TextInput } from "../../components/text-input";
import { auth } from "../../utils/firebase";
import { signOut } from "firebase/auth";

type SettingsProps = NativeStackScreenProps<RootStackParamList, "Settings">;

const Settings = ({ navigation }: SettingsProps) => {

    const {
        theme,
        activeScheme,
        toggleThemeSchema
    } = useThemeConsumer();

    return (
        <SafeAreaView>
         <Text   
            sx = {
                {margin: 14,
                textAlign: 'center'  
                }} 
            variant = "title">Edit your account, {auth.currentUser?.email}! 
        </Text>

        <Button 
        sx={{margin: 10}}
        variant="primary"
        onPress = { () => toggleThemeSchema() } 
        title="Switch theme" />
        <Button 

        sx={{margin: 10}}
        variant="primary"
        onPress = { () => signOut(auth) } 
        title="Sign out" />

        </SafeAreaView>
    )
}

export default Settings;