import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from "react-native";
import { ChatRoom } from "../../types";
import styles from "./styles";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import io from "socket.io-client";

const ENDPOINT = 'http://10.0.0.121:3000/api'; //must be same as axios baseURL

let socket = io(ENDPOINT);

export type ChatListItemProps = {
    chatRoom: ChatRoom;
}

const ChatListItem = (props: ChatListItemProps) => {
    const { chatRoom } = props;

    const navigation = useNavigation();

    const user = chatRoom.users[1]; //dummy getter

    const onClick = () => {
        socket.emit('joinRoom', { chatRoom: chatRoom }, (error) => {
            if (error) {
                alert(error);
            }
        });
        navigation.navigate('ChatRoom', {
            chatRoom: chatRoom,
            username: user.username,
            image: user.image
        });
    }

    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{uri: user.image}} style={styles.avatar}/>
                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{user.username}</Text>
                        <Text numberOfLines={2} style={styles.lastMessage}>{chatRoom.lastMessage.content}</Text>
                    </View>
                </View>
                <Text style={styles.time}>
                    {moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default ChatListItem;