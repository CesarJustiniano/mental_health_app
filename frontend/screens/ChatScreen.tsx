import * as React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';

import { View } from '../components/Themed';

import ChatListItem from "../components/ChatListItem";

import NewMessageButton from "../components/NewMessageButton";
import {getChatRoomList} from "../constants/api";
import {useEffect, useState} from "react";
import Colors from "../constants/Colors";
import axios from "axios";
import {getAuthUser} from "../constants/api";

export default function ChatScreen() {
    const [chatRooms, setChatRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState('');

    //const flatList = useRef<FlatList>(null);

    const fetchChatRooms = async () => {
        setLoading(true);
        try{
            const info = await getAuthUser();
            const chatRoomData = await getChatRoomList();

            setChatRooms(chatRoomData);
            setRole(info.role);
        } catch (e) {
            console.log(e);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchChatRooms().then();
    }, [])

    const onChatButton = async () => {
        try {
            await axios.post('/createChatroom');
        } catch (e) {
            console.log(e);
        }
    }

    return (
    <View style={styles.container}>
      <FlatList
          style={{width: '100%'}}
          data={chatRooms}
          renderItem={({item}) => <ChatListItem chatRoom={item}/>}
          keyExtractor={(item) => item._id}
          refreshing={loading}
          onRefresh={fetchChatRooms}
      />
        {role === 'user' ? <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onChatButton}>
                <Text style={styles.buttonText}>Chat with your doctor</Text>
            </TouchableOpacity>
        </View> : <View></View>}
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
    textDivider: {
        fontWeight: "bold",
        color: Colors.light.tint,
    },
    buttonContainer: {
        padding: 15
    },
    button: {
        backgroundColor: Colors.light.tint,
        borderRadius: 30,
    },
    buttonText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'white',
        fontWeight: "bold",
        fontSize: 16,

    },
});
