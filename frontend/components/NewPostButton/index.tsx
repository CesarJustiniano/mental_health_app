import React from 'react';
import { TouchableOpacity } from 'react-native';
import {Foundation} from "@expo/vector-icons";
import {useNavigation, useRoute} from '@react-navigation/native';
import styles from "./styles";

const NewPostButton = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const onPress = () => {
        navigation.navigate('NewPost', {
            id: route.params.id,
            name: route.params.name
        })
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={onPress}
        >
            <Foundation name={'pencil'} size={30} color={'white'}/>
        </TouchableOpacity>
    )
}

export default NewPostButton;