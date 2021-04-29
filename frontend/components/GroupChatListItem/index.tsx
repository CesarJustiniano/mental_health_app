import React from 'react';
import { Text, View, TouchableWithoutFeedback } from "react-native";
import {ChatRoom} from "../../types";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import ProfilePicture from "../ProfilePicture";

export type GroupChatListItemProps = {
    groupChat: ChatRoom;
}

const GroupChatListItem = (props: GroupChatListItemProps) => {
    const { groupChat } = props;

    const navigation = useNavigation();

    const onClick = () => {
        //navigate to Group Chat's room
        navigation.navigate('GroupChatRoom', {
            id: groupChat._id,
            name: groupChat.name,
            users: groupChat.users,
            image: groupChat.image
        });
    }

    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <ProfilePicture image={groupChat.image} size={60} />
                    <View style={styles.midContainer}>
                        <Text style={styles.groupName}>{groupChat.name}</Text>
                        <Text numberOfLines={1} style={styles.description}>{groupChat.description ? groupChat.description : 'No Description'}</Text>
                        <Text>{groupChat.users ? groupChat.users.length + 1 : 1}/10</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default GroupChatListItem;