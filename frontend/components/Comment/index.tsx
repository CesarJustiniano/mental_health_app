import React from 'react';
import { View } from "react-native";
import LeftContainer from "./LeftContainer";
import MainContainer from "./MainContainer";

import { CommentType } from "../../types";

import styles from "./styles";

export type CommentProps = {
    comment: CommentType,
}

const Comment = ({comment}: CommentProps) => (
    <View style={styles.container}>
         <LeftContainer user={comment.postedBy}/>
         <MainContainer comment={comment}/>
    </View>
)

export default Comment;