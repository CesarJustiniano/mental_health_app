import React, {useRef, useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, ImageBackground, Alert, TextInput, TouchableOpacity} from "react-native";
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {View} from "../components/Themed";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import ProfilePicture from "../components/ProfilePicture";
import ChatMessage from '../components/ChatMessage'
import BG from '../assets/images/chatBackground.jpg';
import InputBox from "../components/InputBox";

import {Params} from "../types";
import axios from "axios";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {getAuthUser} from "../constants/api";

export default function ChatRoomScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const flatList = useRef<FlatList>(null);

    const routeId = useRoute<RouteProp<Params, 'A'>>();

    const [message, setMessage] = useState([]);
    const [textMessage, setTextMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [loggedUser, setLoggedUser] = useState([]);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            setLoggedUser(await getAuthUser());
            const getMessages = async () => {
                try{
                    const response = await axios.get(`/chatRoom/${routeId.params.id}/messages`, {withCredentials: true});
                    return response.data;
                } catch (e) {
                    console.log(e);
                }
            }

            const messageData = await getMessages();
            setMessage(messageData);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMessages().then();
    }, [])

    console.log(route.params);

    const createOneButtonErrorAlert = () =>
        Alert.alert(
            "Unable to delete Group Chat",
            "You are not the owner of this group chat",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );

    const createOneButtonSuccessAlert = () =>
        Alert.alert(
            "Chat Successfully deleted!",
            "This chat has been deleted. Please refresh your screen.",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );

    const createDeleteAlert = () =>
        Alert.alert(
            "Delete this group chat?",
            "Once deleted, the previous messages cannot be recovered.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Confirm", onPress: async () => {
                        const response = await axios.delete(`/groupChatroom/remove/${routeId.params.id}`, {withCredentials: true});
                        navigation.navigate('Root');
                        createOneButtonSuccessAlert();
                        return response.data;
                    } }
            ]
        );

    const onCloseButton = () => {
        navigation.navigate('Root');
    }

    const onDeleteButton = async () => {
        try{
            createDeleteAlert();
            // const response = await axios.delete(`/groupChatroom/remove/${routeId.params.id}`, {withCredentials: true});
            // navigation.navigate('Root');
            // createOneButtonSuccessAlert();
            // return response.data;
        } catch (e) {
            console.log(e);
            createOneButtonErrorAlert();
        }
    }

    const onSendPress = async () => {
        try {
            const newMessage = {
                content: textMessage,
            }
            await axios.post(`/chatRoom/${routeId.params.id}/createMessage`, newMessage, {withCredentials: true});
            setTextMessage('');
            await fetchMessages();
        } catch (e) {
            console.log(e);
        }
    }

    return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.leftContainer}>
                        <AntDesign name={'close'} size={30} color={Colors.light.tint} onPress={onCloseButton}/>
                        <ProfilePicture image={route.params.image} size={40}/>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={styles.headerUsername}>{route.params.name}</Text>
                        <Text style={styles.headerText}>Chat</Text>
                    </View>
                    {loggedUser.role == 'doctor' ? <AntDesign name="delete" size={24} color="red" onPress={onDeleteButton}/> : <View></View>}
                </View>

                        <ImageBackground style={styles.background} source={BG}>
                            <FlatList
                                data={message}
                                renderItem={({item}) => <ChatMessage message={item}/>}
                                keyExtractor={(item) => item._id}
                                ref={flatList}
                                initialScrollIndex={message.length - 1}
                                onScrollToIndexFailed={info => {
                                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                                    wait.then(() => {
                                        flatList.current?.scrollToIndex({ index: info.index, animated: true });
                                    })}}
                                refreshing={loading}
                                onRefresh={fetchMessages}
                            />
                            <View style={styles.inputContainer}>
                                <View style={styles.mainContainer}>
                                    <TextInput
                                        style={styles.textInput}
                                        multiline
                                        value={textMessage}
                                        onChangeText={setTextMessage}
                                        placeholder={'Type a message'}
                                    />
                                </View>
                                <TouchableOpacity onPress={onSendPress}>
                                    <View style={styles.buttonContainer}>
                                        <MaterialIcons name={'send'} size={28} color={'white'} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <KeyboardSpacer />
                        </ImageBackground>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: 'white',
        width: '100%'
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
        width: '75%',
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        overflow: 'hidden',
    },
    keyboard: {
        marginBottom: 100,
    },
    listContainer: {
    },

    inputContainer: {
        flexDirection: "row",
        margin: 10,
        alignItems: "flex-end",
        backgroundColor: 'transparent'
    },
    mainContainer: {
        flexDirection: "row",
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 25,
        marginRight: 10,
        flex: 1,
        alignItems: "flex-end",
    },
    textInput: {
        flex: 1,
        marginHorizontal: 10,
    },
    icon: {
        marginHorizontal: 5,
    },
    buttonContainer: {
        backgroundColor: Colors.light.tint,
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
});
