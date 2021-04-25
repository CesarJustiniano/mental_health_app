import React, {useRef, useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, ImageBackground, KeyboardAvoidingView, SafeAreaView} from "react-native";
import {useNavigation, useRoute} from '@react-navigation/native';
import {View} from "../components/Themed";
import {AntDesign} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import ProfilePicture from "../components/ProfilePicture";
import chatRoomData from '../data/Chats';
import ChatMessage from '../components/ChatMessage'
import BG from '../assets/images/chatBackground.jpg';
import InputBox from "../components/InputBox";
import posts from "../data/Posts";

import io from "socket.io-client";

const ENDPOINT = 'http://10.0.0.121:3000/api'; //must be same as axios baseURL

let socket = io(ENDPOINT);

export default function ChatRoomScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const flatList = useRef<FlatList>(null);

    console.log(route.params)

    const onCloseButton = () => {
        socket.emit('leaveRoom', route.params.chatRoom);
        navigation.navigate('Root');
    }

    return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.leftContainer}>
                        <AntDesign name={'close'} size={30} color={Colors.light.tint} onPress={onCloseButton}/>
                        <ProfilePicture image={route.params.image} size={40}/>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={styles.headerUsername}>{route.params.username}</Text>
                        <Text style={styles.headerText}>Chat</Text>
                    </View>
                </View>
                <KeyboardAvoidingView
                    style={styles.keyboard}
                    behavior={'padding'}
                >
                    <ImageBackground style={styles.background} source={BG}>
                        <FlatList
                            data={chatRoomData.messages}
                            renderItem={({item}) => <ChatMessage message={item}/>}
                            keyExtractor={(item) => item.id}
                            ref={flatList}
                            initialScrollIndex={posts.length - 1}
                            onScrollToIndexFailed={info => {
                                const wait = new Promise(resolve => setTimeout(resolve, 500));
                                wait.then(() => {
                                    flatList.current?.scrollToIndex({ index: info.index, animated: true });
                                })}}
                        />
                        <InputBox chatRoom={route.params.chatRoom}/>
                    </ImageBackground>
                </KeyboardAvoidingView>
            </View>
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
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        alignItems: "center",
        marginTop: 30,
    },
    headerText: {
        fontWeight: "bold",
        color: Colors.light.tint,
        justifyContent: 'center',
    },
    headerUsername: {
        fontWeight: "bold",
        color: Colors.light.tint,
        justifyContent: 'center',
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: '20%',
        justifyContent: "space-between",
    },
    rightContainer: {
        flexDirection: "row",
        width: '80%',
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        overflow: "hidden"
    },
    keyboard: {
        marginBottom: 100,
    }
});
