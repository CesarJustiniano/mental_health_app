import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput
} from 'react-native';

import { View } from '../components/Themed';
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import ProfilePicture from "../components/ProfilePicture";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";

export default function NewPostScreen() {
    const [post, setPost] = useState('');
    const navigation = useNavigation();

    const onPostButton = async () => {
        try {
            const newPost = {
                body: post,
            }
            const response = await axios.post('/createPost', newPost, {withCredentials: true});
            setPost(response.data);
            console.log(response.data);
            onCloseButton();
        } catch (e) {
            console.log(e);
        }
    }

    const onCloseButton = () => {
        navigation.navigate('Root');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <AntDesign name={'close'} size={30} color={Colors.light.tint} onPress={onCloseButton}/>
                <TouchableOpacity style={styles.button} onPress={onPostButton} >
                    <Text style={styles.buttonText}>Post</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.newPostContainer}>
                <ProfilePicture image={'https://www.clipartkey.com/mpngs/m/146-1461473_default-profile-picture-transparent.png'} />
                <View style={styles.inputContainer}>
                    <TextInput
                        value={post}
                        onChangeText={(value) => setPost(value)}
                        multiline={true}
                        numberOfLines={3}
                        style={styles.postInput}
                        placeholder={'How are you today?'}
                    />
                </View>
            </View>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: 'white',
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 15,
    },
    button: {
        backgroundColor: Colors.light.tint,
        borderRadius: 30,
    },
    buttonText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'white',
        fontWeight: "bold",
        fontSize: 16,
    },
    newPostContainer: {
        flexDirection: "row",
        padding: 15,
    },
    inputContainer: {
        marginLeft: 10,
        width: '85%',
    },
    postInput: {
        height: 100,
        maxHeight: 300,
        fontSize: 18,
    },
    imageInput: {

    },
    videoInput: {

    },
});
