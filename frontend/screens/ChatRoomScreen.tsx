import React, {useRef, useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, ImageBackground} from "react-native";
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {View} from "../components/Themed";
import {AntDesign} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import ProfilePicture from "../components/ProfilePicture";
import ChatMessage from '../components/ChatMessage'
import BG from '../assets/images/chatBackground.jpg';
import InputBox from "../components/InputBox";

import {Params} from "../types";
import axios from "axios";
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default function ChatRoomScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const flatList = useRef<FlatList>(null);

    const routeId = useRoute<RouteProp<Params, 'A'>>();

    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMessages = async () => {
        setLoading(true);
        try {
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

    console.log(route.params)

    const onCloseButton = () => {
        navigation.navigate('Root');
    }

    const onDeleteButton = async () => {
        try{
            const response = await axios.delete(`/groupChatroom/remove/${routeId.params.id}`, {withCredentials: true});
            navigation.navigate('Root');
            return response.data;
        } catch (e) {
            console.log(e);
            console.warn('This User cannot delete this chat');
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
                    <AntDesign name="delete" size={24} color="red" onPress={onDeleteButton} />
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
                            <InputBox />
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
    }
});
