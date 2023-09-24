import Ionicons from "@expo/vector-icons/Ionicons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { RootStackParamList } from "../../navigation/navigator.types";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import { Text, Button } from '../../components';
import { TextInput } from "../../components/text-input";
import { basicAuth, firestore } from "../../utils/firebase";
import { collection, doc, addDoc, getDocs } from 'firebase/firestore';
import { ICollection } from "../../interfaces/collection";
import { Collection } from "../../components";
import { View, Modal } from 'react-native';
import { StyleSheet } from "react-native";
import { AddCollectionModal } from "../../components/modals/addCollectionModal";
import uuid from 'react-native-uuid';


type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: HomeProps) => {

    const [collections, setCollections] = useState<ICollection[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');

    const {
        theme,
        activeScheme,
        toggleThemeSchema
    } = useThemeConsumer();

    //const [showForm, setShowForm] = useState(false);
    // const handleButtonClick = () => {
    //   setShowForm(true);
    // };
  
  const handleFormClose = () => {
    setIsVisible(false);
  };

  const openIdeas = () => {
    
  }
  
    
  const handleFormSubmit = async () => {
    const colRef = collection(firestore, "collections");
    await addDoc(colRef, {
        id: uuid.v1().toString(),
        userId: basicAuth.currentUser?.uid,
        title: titleValue,
        description: descriptionValue,
        createdAt: new Date()
    })
    await getCollections();
    setIsVisible(false);
  };
  

    const getCollections = async () =>{
        const colRef = collection(firestore, "collections");
        const collections = await getDocs(colRef);
        let collectionArray: ICollection[] = [];
        collections.forEach(col => {
            const collectionData = col.data();
            
            if(collectionData.userId === basicAuth.currentUser?.uid){
              collectionArray.push({
                id: collectionData.id,
                userId: collectionData.userId,
                title: collectionData.title,
                description: collectionData.description,
                createdAt: collectionData.createdAt.seconds * 1000
              });
            }
        })
        setCollections(collectionArray);
    }

    useEffect(()=>{
        getCollections();
    }, [])

    const openNewCollectionModal = () =>{
       setIsVisible(true);
    }

    return (
   
    <View>
        <Text   
        sx = {
            {margin: 18,
                textAlign: 'center'  
            }} 
            variant = "title">Hello, {basicAuth.currentUser?.email}! 
        </Text>

        <Text   
        sx = {
            {margin: 10,
                textAlign: 'center'  
            }} 
            variant = "subtitle">Your collections 
        </Text>

        <View style={{ flexDirection: "row" }}>
         <View>
          <Button 
          sx={{margin: 10}}
          variant="primary"
          onPress = { () => openNewCollectionModal() } 
          title=" + " />
        </View>

        <View>
        <Button 
         sx={{margin: 10}}
         variant="primary"
         onPress = { () => navigation.navigate("Ideas") } 
         title="Out of ideas?" /> 
        </View>

        </View>

      {/* <AddCollectionModal
        isVisible={showForm}
        onClose={handleFormClose}
      /> */}


<Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles().modalContainer}>
        <View  style={styles().modalContent}>
        
        <Text 
        variant="title"
        sx={{marginBottom: 10}}
        >
        Create your collection
        </Text>

            <TextInput
                label="Title"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) =>
                    setTitleValue(text)
                }
            />

            <TextInput
               label="Collection"
               keyboardType="email-address"
               autoCapitalize="none"
               autoCorrect={false}
               onChangeText={(text) =>
                   setDescriptionValue(text)
               }
           />

        <Button 
        sx={{margin: 10}}
        variant="primary"
        onPress = { () => handleFormSubmit() } 
        title="Submit" />
 
        <Button 
        sx={{margin: 10}}
        variant="primary"
        onPress = { () => { setIsVisible(false);} } 
        title="Close" />
        
        </View>
      </View>
    </Modal>


        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <FlatList
                data = {collections}
                keyExtractor={(collection) => collection.id}
                ItemSeparatorComponent={() => <View style = {{padding: 5}} />}
                renderItem= { ({item}) => <Collection  key={item.id}  collection={item}/> }

                // {collections.map((collection) => (
                // <Collection key={collection.id} collection={collection} />
                // ))}
                >
            </FlatList>
        </View>

    </View>
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

export default Home;