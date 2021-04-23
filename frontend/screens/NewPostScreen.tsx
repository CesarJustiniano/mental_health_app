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
    const [imageUrl, setImageUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
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
                <ProfilePicture image={'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'} />
                <View style={styles.inputContainer}>
                    <TextInput
                        value={post}
                        onChangeText={(value) => setPost(value)}
                        multiline={true}
                        numberOfLines={3}
                        style={styles.postInput}
                        placeholder={'How are you today?'}
                    />
                    <TextInput
                        value={imageUrl}
                        onChangeText={value => setImageUrl(value)}
                        style={styles.imageInput}
                        placeholder={'Image url (optional)'}
                    />
                    <TextInput
                        value={videoUrl}
                        onChangeText={value => setVideoUrl(value)}
                        style={styles.videoInput}
                        placeholder={'Video url (optional)'}
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
