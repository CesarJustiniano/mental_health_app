import React from 'react';
import {Category} from "../../types";
import {useNavigation} from "@react-navigation/native";
import {Text, TouchableWithoutFeedback, View} from "react-native";
import styles from "./styles";

export type CategoryListItemProps = {
    category: Category;
}

const PostCategoryListItem = (props: CategoryListItemProps) => {
    const { category } = props;

    const navigation = useNavigation();

    const onClick = () =>{
        navigation.navigate('Feed', {
            id: category.id,
            name: category.name,
            posts: category.posts,
        });
    }

    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <Text style={styles.name}>{category.name}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default PostCategoryListItem;