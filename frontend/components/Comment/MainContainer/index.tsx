import React from 'react';
import {Text, View} from "react-native";
import {CommentType} from "../../../types";
import styles from "./styles";
import moment from 'moment';

export type MainContainerProps = {
    comment: CommentType
}

const MainContainer = ({comment}: MainContainerProps) => (
    <View style={styles.container}>
        <View style={styles.PostHeaderContainer}>
            <View style={styles.PostHeaderNames}>
                <Text style={styles.username}>@{comment.postedBy.username}</Text>
                <Text style={styles.createdAt}>{moment(comment.createdAt).fromNow()}</Text>
            </View>
        </View>
        <View>
            <Text style={styles.content}> {comment.text}</Text>
        </View>
    </View>
)

export default MainContainer;