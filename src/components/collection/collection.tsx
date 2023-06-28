import { ICollection } from "../../interfaces/collection";
import { Text, Button } from '../../components';
import { ThemeColors } from "../../utils/theme/colors";
import {
    TextInput as NativeTextInput,
    TextInputProps as NativeTextInputProps,
    StyleSheet,
    View,
  } from "react-native";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";

export const CollectionComponent = ({collection}: {collection: ICollection}) => {
    const {
        theme,
        activeScheme,
        toggleThemeSchema
    } = useThemeConsumer();
    const collectionDate = new Date(collection.createdAt);
    return (
        <View style={styles(activeScheme).container}>
        <View style={styles(activeScheme).card}>
        <Text
        sx = {{ margin: 5 }} 
        variant = "subtitle">
            { collection.title }
        </Text>

        <Text
        sx = {{ margin: 5 }}
        variant = "technicalText">
            { collection.description }
        </Text>

        <Text
        sx = {{ margin: 5 }} 
        >
        Created at: {collectionDate.toLocaleString()}
        </Text>

        </View>
        </View>
    );
};

const styles = (activeSchema: string) =>{
    return StyleSheet.create({
        container: {
            //flex: 1,
            //flexDirection: 'row',
            paddingHorizontal: 10,
            marginBottom: 10,
          },
          card: {
            width: '48%',
            aspectRatio: 1, 
            backgroundColor: activeSchema == 'light' ? "#ffe6e6": "#862d59",
            padding: 10,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: activeSchema == 'light' ? "#ffe6e6": "#8f246b"
          }
    });
      
}