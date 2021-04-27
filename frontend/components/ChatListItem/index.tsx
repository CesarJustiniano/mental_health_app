import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from "react-native";
import { ChatRoom } from "../../types";
import styles from "./styles";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import io from "socket.io-client";
import ProfilePicture from "../ProfilePicture";

const ENDPOINT = 'http://10.0.0.121:3000/api'; //must be same as axios baseURL

let socket = io(ENDPOINT);

export type ChatListItemProps = {
    chatRoom: ChatRoom;
}

const ChatListItem = (props: ChatListItemProps) => {
    const { chatRoom } = props;

    const navigation = useNavigation();

    const onClick = () => {
        navigation.navigate('ChatRoom', {
            chatRoom: chatRoom,
            id: chatRoom._id,
            name: chatRoom.name,
            image: chatRoom.image
        });
    }

    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <ProfilePicture image={chatRoom.image} size={70}/>
                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{chatRoom.name}</Text>
                        <Text numberOfLines={2} style={styles.lastMessage}>{chatRoom.lastMessage ? chatRoom.lastMessage.message.content : 'No messages...'}</Text>
                    </View>
                </View>
                <Text style={styles.time}>{chatRoom.lastMessage ? moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY") : ''}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default ChatListItem;