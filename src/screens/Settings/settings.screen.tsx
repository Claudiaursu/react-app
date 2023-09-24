import Ionicons from "@expo/vector-icons/Ionicons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { RootStackParamList } from "../../navigation/navigator.types";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import { Text, Button } from '../../components';
import { TextInput } from "../../components/text-input";
import { basicAuth } from "../../utils/firebase";
import { signOut } from "firebase/auth";
import { PictureComponent } from "../../components/picture/picture.component";
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { Provider, useDispatch, useSelector} from "react-redux";
import { store } from "../../redux/store";
import { selectProfilePhotoValue, setValue } from "../../redux/profilePhoto.slice";

type SettingsProps = NativeStackScreenProps<RootStackParamList, "Settings">;

const Settings = ({ navigation }: SettingsProps) => {
    const [image, setImage] = useState("");
    const dispatch = useDispatch();
    const imageUrlValue = useSelector(selectProfilePhotoValue);


    const {
        theme,
        activeScheme,
        toggleThemeSchema
    } = useThemeConsumer();

    const uploadImageAsync = async (uri: string) => {
        const blob: Blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              resolve(xhr.response);
            };
            xhr.onerror = function (e) {
              console.log(e);
              reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        })

        const fileRef = ref(getStorage(),`profile_images/${basicAuth.currentUser?.uid}.jpg`);
        const result = await uploadBytes(fileRef, blob);
        dispatch(setValue(`profile_images/${basicAuth.currentUser?.uid}.jpg`))

        //blob.close();
        return await getDownloadURL(fileRef);
    }

    const deletePhoto = async () =>{
        // Create a reference to the file to delete
        const fileRef = ref(getStorage(),`profile_images/${basicAuth.currentUser?.uid}.jpg`);
        await deleteObject(fileRef);
        dispatch(setValue(`profile_images/default.png`))

        setImage("");
    }

    const uploadPhoto = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
      
        if (!result.canceled) {
            console.log("imagine ", result.assets[0])
            setImage(result.assets[0].uri);
            await uploadImageAsync(result.assets[0].uri);
        }
    }

    return (
        <Provider store={store}>
        <SafeAreaView>
         <Text   
            sx = {
                {margin: 14,
                textAlign: 'center'  
                }} 
            variant = "title">Edit your account, {basicAuth.currentUser?.email}! 
        </Text>

        <Button 
        sx={{margin: 10}}
        variant="primary"
        onPress = { () => toggleThemeSchema() } 
        title="Switch theme" />
       
        <PictureComponent></PictureComponent>
        <Button 
        sx={{margin: 10}}
        variant="primary"
        onPress = { () => uploadPhoto() } 
        title="Add profile photo" /> 

        <Button 
        sx={{margin: 10}}
        variant="primary"
        onPress = { () => deletePhoto() } 
        title="Delete profile photo" />       

        <Button 
        sx={{margin: 12}}
        variant="primary"
        onPress = { () => signOut(basicAuth) } 
        title="Sign out" />

        </SafeAreaView>
        </Provider>
    )
}

export default Settings;