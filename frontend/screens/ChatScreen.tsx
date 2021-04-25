import * as React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import { Text, View } from '../components/Themed';

import ChatListItem from "../components/ChatListItem";

import chatRooms from "../data/ChatRooms";
import NewMessageButton from "../components/NewMessageButton";
import {getChatRoomList, getPosts} from "../constants/api";
import {useEffect, useRef, useState} from "react";
import Colors from "../constants/Colors";

export default function ChatScreen() {
    const [chatRooms, setChatRooms] = useState([]);
    const [loading, setLoading] = useState(false);

    //const flatList = useRef<FlatList>(null);

    const fetchChatRooms = async () => {
        setLoading(true);
        try{
            const chatRoomData = await getChatRoomList();
            console.log(chatRoomData);
            setChatRooms(chatRoomData);
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

  return (
    <View style={styles.container}>
        <Text style={styles.textDivider}>Group Chats</Text>
      <FlatList
          style={{width: '100%'}}
          data={chatRooms}
          renderItem={({item}) => <ChatListItem chatRoom={item}/>}
          keyExtractor={(item) => item._id}
          refreshing={loading}
          onRefresh={fetchChatRooms}
      />
        <Text style={styles.textDivider}>Chat with your Doctor</Text>
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
    }
});
