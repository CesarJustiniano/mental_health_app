import * as React from 'react';
import {FlatList, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import { Text, View } from '../components/Themed';

import groupChats from "../data/GroupChats";
import {AntDesign} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import {useNavigation, useRoute} from "@react-navigation/native";
import GroupChatListItem from "../components/GroupChatListItem";

export default function GroupChatScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    console.log(route.params);

    const onCloseButton = () => {
        navigation.navigate('ChatCategory');
    }

    const onClick = () => {
        console.warn(`Group Chat: ${route.params.name}`)
        navigation.navigate('GroupChatRoom', {
            id: groupChats.id,
        });
    }

    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <AntDesign name={'close'} size={30} color={Colors.light.tint} onPress={onCloseButton}/>
                    <Text style={styles.headerText}>{route.params.name}</Text>
                </View>
                <FlatList
                    style={{width: '100%'}}
                    data={groupChats}
                    renderItem={({item}) => <GroupChatListItem groupChat={item}/>}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </TouchableWithoutFeedback>
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