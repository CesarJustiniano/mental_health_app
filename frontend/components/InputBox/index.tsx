import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import styles from "./styles";
import {Entypo, FontAwesome5, Fontisto, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import { ChatRoom } from "../../types";
import io from "socket.io-client";

const ENDPOINT = 'http://10.0.0.121:3000/api'; //must be same as axios baseURL

let socket = io(ENDPOINT);

export type InputBoxProps = {
    chatRoom: ChatRoom,
}

const InputBox = ({chatRoom}: InputBoxProps) => {
    const [message, setMessage] = useState('');

    // const [name, setName] = useState('');
    // const [room, setRoom] = useState('');
    // const [users, setUsers] = useState('');
    // const [messages, setMessages] = useState([]);
    //
    // useEffect(() => {
    //     const { name, room } = queryString.parse(location.search);
    //
    //     socket = io(ENDPOINT);
    //
    //     setRoom(room);
    //     setName(name)
    //
    //     socket.emit('join', { name, room }, (error) => {
    //         if(error) {
    //             alert(error);
    //         }
    //     });
    // }, [ENDPOINT, location.search]);
    //
    // useEffect(() => {
    //     socket.on('message', message => {
    //         setMessages(messages => [ ...messages, message ]);
    //     });
    //
    //     socket.on("roomData", ({ users }) => {
    //         setUsers(users);
    //     });
    // }, []);
    //
    // const sendMessage = (event) => {
    //     event.preventDefault();
    //
    //     if(message) {
    //         socket.emit('sendMessage', message, () => setMessage(''));
    //     }
    // }

    const onMicrophonePress = () => {
        console.warn('Microphone pressed');
    }

    const onSendPress = () => {
        console.log(`Sending: ${message}`);

        //send the message to the backend
        if(message) {
            socket.emit('chatRoomMessage', {chatRoomId: chatRoom, message: message},
                () => setMessage(''));
        }
        setMessage('');
    }

    const onPress = () => {
        if (!message) {
            onMicrophonePress()
        } else {
            onSendPress()
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <FontAwesome5 name={'laugh-beam'} size={24} color={'grey'}/>
                <TextInput
                    style={styles.textInput}
                    multiline
                    value={message}
                    onChangeText={setMessage}
                    placeholder={'Type a message'}
                />
                <Entypo name={'attachment'} size={24} color={'grey'} style={styles.icon}/>
                {!message && <Fontisto name={'camera'} size={24} color={'grey'} style={styles.icon}/>}
            </View>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.buttonContainer}>
                    {!message
                        ? <MaterialCommunityIcons name={'microphone'} size={28} color={'white'}/>
                        : <MaterialIcons name={'send'} size={28} color={'white'} />}
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default InputBox;