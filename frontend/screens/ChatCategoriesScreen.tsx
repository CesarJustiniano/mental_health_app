import * as React from 'react';
import {FlatList, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import { Text, View } from '../components/Themed';

import groupChatCategories from "../data/GroupChatCategories";
import CategoryListItem from "../components/CategoryListItem";
import {AntDesign} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import {useNavigation} from "@react-navigation/native";

export default function ChatCategoriesScreen() {
    const navigation = useNavigation();

    const onCloseButton = () => {
        navigation.navigate('Root');
    }

    const onClick = () => {
        navigation.navigate('GroupChatList');
    }

    return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <AntDesign name={'close'} size={30} color={Colors.light.tint} onPress={onCloseButton}/>
                    <Text style={styles.headerText}>Group Chats</Text>
                </View>
                <TouchableWithoutFeedback onPress={onClick}>
                    <FlatList
                        style={{width: '100%'}}
                        data={groupChatCategories}
                        renderItem={({item}) => <CategoryListItem category={item}/>}
                        keyExtractor={(item) => item.id}
                    />
                </TouchableWithoutFeedback>

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
