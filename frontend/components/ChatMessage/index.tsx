import React, {useEffect, useState} from 'react';
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
    const [userID, setUserId] = useState([]);

    const fetchID = async () => {
        try{
            const info = await getAuthUser();

            setUserId(info._id);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchID().then();
    }, [])

    const isMyMessage = () => {
        if(message.user){
            return message.user.user._id == userID;
        }
        return message.doctor.doctor._id == userID;
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
                {!isMyMessage() && <Text style={styles.name}>{message.user ? message.user.user.username : message.doctor.doctor.username}</Text>}
                <Text style={styles.message}>{message.content}</Text>
                <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
            </View>
        </View>

    )
}

export default ChatMessage;