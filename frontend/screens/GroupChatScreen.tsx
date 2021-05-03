import * as React from 'react';
import {Alert, FlatList, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import { Text, View } from '../components/Themed';

import {AntDesign, Ionicons} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {useEffect, useState} from "react";
import axios from "axios";
import ChatListItem from "../components/ChatListItem";
import {Params} from "../types";

export default function GroupChatScreen() {
    const navigation = useNavigation();
    const route = useRoute();


    //add useRouteID
    const routeID = useRoute<RouteProp<Params, 'A'>>();


    console.log(route.params);

    const [groupChatRooms, setGroupChatRooms] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchGroupChatRooms = async () => {
        setLoading(true);
        try{
            const groupChatRoomData = await axios.get(`/groupChatroom/${routeID.params.name}`);
            console.log(groupChatRoomData.data);
            setGroupChatRooms(groupChatRoomData.data);
        } catch (e) {
            console.log(e);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchGroupChatRooms().then();
    }, [])

    const createOneButtonSuccessAlert = () =>
        Alert.alert(
            "Group Chat Created!",
            "Please refresh your screen to see the new group chats.",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );

    const createOneButtonErrorAlert = () =>
        Alert.alert(
            "Group chat not created",
            "Only doctors can create group chats.",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );

    const onCloseButton = () => {
        navigation.navigate('ChatCategory');
    }

    const onAddNewChatButton = async () => {
        try{
            const newGroupChat = await axios.post(`/createGroupChatroom/${routeID.params.name}`);
            createOneButtonSuccessAlert();
            return newGroupChat.data;
        } catch (e) {
            console.log(e);
            createOneButtonErrorAlert();
        }
    }

    return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <AntDesign name={'close'} size={30} color={Colors.light.tint} onPress={onCloseButton}/>
                    <Text style={styles.headerText}>{route.params.name}</Text>
                    <Ionicons name="add" size={30} color={Colors.light.tint} onPress={onAddNewChatButton} />
                </View>
                <FlatList
                    style={{width: '100%'}}
                    data={groupChatRooms}
                    renderItem={({item}) => <ChatListItem chatRoom={item}/>}
                    keyExtractor={(item) => item._id}
                    refreshing={loading}
                    onRefresh={fetchGroupChatRooms}
                />
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-between',
        alignItems: "center",
        fontWeight: "bold",
        padding: 15,
        marginTop: 30,
        borderBottomWidth: 0.5,
        borderColor: 'lightgrey'
    },
    headerText: {
        color: Colors.light.tint,
        fontWeight: "bold",
    },
});