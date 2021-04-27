import React from 'react';
import {Text, View} from "react-native";
import { Message } from "../../types";
import moment from "moment";
import styles from "./styles";
import { getAuthUser } from '../../constants/api';

export type ChatMessageProps = {
    message: Message;
}

const ChatMessage = (props: ChatMessageProps) => {
    const { message } = props;
    const loggedUser = getAuthUser();

    const isMyMessage = () => {
        return message.user.id == loggedUser.id;
    }

    return (
        <View style={styles.container}>
            <View style={[
                styles.messageBox, {
                    backgroundColor: isMyMessage() ? 'lightblue' : 'white',
                    marginLeft: isMyMessage() ? 50 : 0,
                    marginRight: isMyMessage() ? 0 : 50
                }
            ]}>
                {!isMyMessage() && <Text style={styles.name}>{message.user.user.username}</Text>}
                <Text style={styles.message}>{message.content}</Text>
                <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
            </View>
        </View>

    )
}

export default ChatMessage;