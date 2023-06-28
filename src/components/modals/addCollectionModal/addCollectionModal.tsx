import React, { useState } from 'react';
import { View, Modal } from 'react-native';
import { useThemeConsumer } from "../../../utils/theme/theme.consumer";
import { TextInput } from "../../../components/text-input";
import { Text, Button } from '../../../components';
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { auth, firestore } from "../../../utils/firebase";
import { StyleSheet } from "react-native";

export const AddCollectionModal = ( {isVisible}: any, {onClose}: any) => {
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
//   const [isVisibleLocal, setIsVisibleLocal] = useState(isVisible);

//   const {
//     theme,
//     activeScheme,
//     toggleThemeSchema
// } = useThemeConsumer();

  const handleFormSubmit = async () => {
    const colRef = collection(firestore, "collections");
    await addDoc(colRef, {
        userId: auth.currentUser?.uid,
        title: titleValue,
        descriptiom: descriptionValue,
        createdAt: Math.floor(new Date().getTime()/1000)
    })
    onClose();
  };

  return (
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
 
        {/* <Button 
        sx={{margin: 10}}
        variant="primary"
        onPress = { () => {} } 
        title="Close" /> */}
        
        </View>
      </View>
    </Modal>
  );
};

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