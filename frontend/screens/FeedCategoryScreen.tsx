import * as React from 'react';
import {FlatList, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import postCategories from "../data/GroupChatCategories";
import PostCategoryListItem from "../components/PostCategoryListItem";
import {useNavigation} from "@react-navigation/native";

export default function FeedCategoriesScreen() {
    const navigation = useNavigation();

    const onClick = () => {
        navigation.navigate('Feed');
    }

    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <FlatList
                    style={{width: '100%'}}
                    data={postCategories}
                    renderItem={({item}) => <PostCategoryListItem category={item}/>}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
});
