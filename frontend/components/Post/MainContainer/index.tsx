import React from 'react';
import {Image, Text, View} from "react-native";
import { Video } from 'expo-av';
import {PostType} from "../../../types";
import styles from "./styles";
import { Ionicons} from "@expo/vector-icons";
import moment from 'moment'; //download with 'npm install moment --save'

import Footer from './Footer';

export type MainContainerProps = {
    post: PostType
}

const MainContainer = ({post}: MainContainerProps) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    return (
        <View style={styles.container}>
            <View style={styles.PostHeaderContainer}>
                <View style={styles.PostHeaderNames}>
                    <Text style={styles.username}>@{post.postedBy.username}</Text>
                    <Text style={styles.createdAt}>{moment(post.createdAt).fromNow()}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.content}>{post.body}</Text>
                {!!post.image && <Image style={styles.image} source={{uri: post.image}}/>}
                {!!post.video &&
                <Video
                    ref={video}
                    style={styles.video}
                    source={{uri: post.video}}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                />}
            </View>
            <Footer post={post}/>
        </View>
    )
}

export default MainContainer;