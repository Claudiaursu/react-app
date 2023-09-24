import { Button, Collection } from '..';
import { View, Image, FlatList } from 'react-native';
import { Text } from '../../components';
import { getDownloadURL, ref } from 'firebase/storage';
import {
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  StyleSheet
} from "react-native";
import { store } from "../../redux/store";
import {
  useGetIdeasQuery
} from "../../redux/ideas.service";
import { useEffect, useState } from "react";
import { useThemeConsumer } from '../../utils/theme/theme.consumer';
import { storage } from '../../utils/firebase';
import { basicAuth } from "../../utils/firebase";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { selectProfilePhotoValue } from '../../redux/profilePhoto.slice';

export const PictureComponent = () => {
  
    const [imageUrl, setImageUrl] = useState("");
    const dispatch = useDispatch();
    const imageUrlValue = useSelector(selectProfilePhotoValue);

    const getPicture = async (photoPath: string) =>{
        const imgRef = ref(storage, photoPath);
        const imgUrl = await getDownloadURL(imgRef);
        setImageUrl(imgUrl);
    }


    useEffect(()=>{
        getPicture(imageUrlValue);
        console.log("----- --------------------value ", imageUrlValue)
    }, [imageUrlValue])

  const {
    theme,
    activeScheme,
    toggleThemeSchema
  } = useThemeConsumer();

  if(imageUrlValue !== 'profile_iamges/default.png'){
      return (
        <Provider store={store}> 
        <>
          <View style={styles(activeScheme).picture}>
                <Image 
                source = {{uri: imageUrl}}
                style = {{borderRadius: 99999, height: 200, width: 200}}
                />
          </View>
        </>
        </Provider>
      );
  } else {
    return (
        <Image 
        source = {{uri: imageUrl}}
        style = {{borderRadius: 99999, height: 180, width: 180}}
        />
    )
  }
};

const styles = (activeSchema: string) =>{
  return StyleSheet.create({
      picture: {
          height: 225,
          width: 225,
          backgroundColor: activeSchema == 'light' ? "#ccccff": "#b82e8a",
          padding: 10,
          borderRadius: 8,
          borderWidth: 3,
          margin: 10,
          borderColor: activeSchema == 'light' ? "#cce6ff": "#8f246b"
        }
  });
    
}