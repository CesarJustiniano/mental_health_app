import React, { useState } from 'react';
import {
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import styles from "./styles";
import { MaterialIcons} from "@expo/vector-icons";


const InputBox = () => {
    const [message, setMessage] = useState('');

    const onSendPress = () => {
        console.log(`Sending: ${message}`);

        //send the message to the backend
        setMessage('');
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