import Ionicons from "@expo/vector-icons/Ionicons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { RootStackParamList } from "../../navigation/navigator.types";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import { Text, Button } from '../../components';
import { TextInput } from "../../components/text-input";
import { auth, firestore } from "../../utils/firebase";
import { View, Modal } from 'react-native';
import { StyleSheet } from "react-native";
import { AddCollectionModal } from "../../components/modals/addCollectionModal";
import uuid from 'react-native-uuid';
import { CollectionIdea } from "../../interfaces/collectionIdea";
import { useGetIdeasQuery } from "../../redux/ideas.service";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { IdeasComponent } from "../../components/idea/idea.component";


type IdeasProps = NativeStackScreenProps<RootStackParamList, "Ideas">;

const Ideas = () => {

    const [ideasValue, setideasValue] = useState(null);

    const {
        theme,
        activeScheme,
        toggleThemeSchema
    } = useThemeConsumer();
  
    const { isLoading, data, error } = useGetIdeasQuery(undefined);

    useEffect(()=>{
        console.log(data);
    }, [])


    return (
    <SafeAreaView>
    <View>
        <Text   
        sx = {
            {margin: 18,
                textAlign: 'center'  
            }} 
            variant = "title">Hello, {auth.currentUser?.email}! 
        </Text>

        <Text   
        sx = {
            {margin: 10,
                textAlign: 'center'  
            }} 
            variant = "subtitle">Ideas
        </Text>

        {/* <View style={{ flexDirection: "row" }}>
          <>
          {isLoading && <Text>Ideas are loading</Text>}
          </>
        </View> */}

        <IdeasComponent></IdeasComponent>
    </View>
    </SafeAreaView>
    )
}

const styles = () => {
    return StyleSheet.create({
        modalContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
          backgroundColor:"#ffe6e6",
          padding: 20,
          borderRadius: 10,
          width: '80%',
        },
        input: {
          borderWidth: 1,
          borderColor: '#CCC',
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        },
      })
    }

export default Ideas;