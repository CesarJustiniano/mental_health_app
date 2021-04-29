import React, { useState } from 'react';
import {
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import styles from "./styles";
import { MaterialIcons} from "@expo/vector-icons";
import axios from "axios";
import {RouteProp, useRoute} from "@react-navigation/native";
import {Params} from "../../types";

const InputBox = () => {
    const [message, setMessage] = useState('');

    const route = useRoute<RouteProp<Params, 'A'>>();

    const onSendPress = async () => {
        try {
            const newMessage = {
                content: message,
            }
            const response = await axios.post(`/chatRoom/${route.params.id}/createMessage`, newMessage, {withCredentials: true});
            setMessage(response.data);
            console.log(response.data);
            setMessage('');
        } catch (e) {
            console.log(e);
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <TextInput
                    style={styles.textInput}
                    multiline
                    value={message}
                    onChangeText={setMessage}
                    placeholder={'Type a message'}
                />
            </View>
            <TouchableOpacity onPress={onSendPress}>
                <View style={styles.buttonContainer}>
                    <MaterialIcons name={'send'} size={28} color={'white'} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default InputBox;