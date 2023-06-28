import { Button, Collection } from '..';
import { View, Modal, FlatList } from 'react-native';
//import { Text } from "react-native";
import { Text } from '../../components';
import {
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  StyleSheet
} from "react-native";

import {
  useGetIdeasQuery
} from "../../redux/ideas.service";
import { useEffect, useState } from "react";
import { useThemeConsumer } from '../../utils/theme/theme.consumer';

export const IdeasComponent = () => {
  const { isLoading, data, error } = useGetIdeasQuery(undefined);

  const {
    theme,
    activeScheme,
    toggleThemeSchema
  } = useThemeConsumer();

  return (
    <>
      {isLoading && <Text>Posts are loading</Text>}
      {/* <Text>{JSON.stringify(getFivePosts())}</Text>
      <Text>{JSON.stringify(error)}</Text> */}

      <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            
            <FlatList
                data = {data}
                keyExtractor={(idea) => idea.id}
                ItemSeparatorComponent={() => <View style = {{padding: 5}} />}
                renderItem= { ({item}) => 
                
                <View style={styles(activeScheme).container}>
                  <View style={styles(activeScheme).card}>
                   <Text
                    sx = {{ margin: 5 }} 
                    variant = "subtitle">
                   { item.title }
                    </Text>

                  <Text
                  sx = {{ margin: 5 }}
                  variant = "technicalText">
                  { item.description }
                  </Text>
                  </View> 
                </View> 

                }

                // {collections.map((collection) => (
                // <Collection key={collection.id} collection={collection} />
                // ))}
                >
            </FlatList>
        </View>

    </>
  );
};

const styles = (activeSchema: string) =>{
  return StyleSheet.create({
      container: {
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: 10,
          marginBottom: 10,
        },
        card: {
          width: '100%',
          backgroundColor: activeSchema == 'light' ? "#ccccff": "#b82e8a",
          padding: 10,
          borderRadius: 8,
          borderWidth: 3,
          borderColor: activeSchema == 'light' ? "#cce6ff": "#8f246b"
        }
  });
    
}