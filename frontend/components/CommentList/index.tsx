import React, {useEffect, useRef, useState} from "react";
import { View, FlatList } from "react-native";
//import comments from '../../data/Comments';
import Comment from "../Comment";
import axios from "axios";
import { useRoute, RouteProp } from '@react-navigation/native';
import {Params} from "../../types";

const CommentList = () => {

    const flatList = useRef<FlatList>(null);

    const route = useRoute<RouteProp<Params, 'A'>>();

    const [comment, setComment] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchComments = async () => {
        setLoading(true);
        try {
            const getComments = async () => {
                try{
                    const response = await axios.get(`/post/${route.params.id}/comments`);
                    return response.data;
                } catch (e) {
                   console.log(e);
                }
            }

            const commentData = await getComments();
            setComment(commentData);
            console.log(commentData);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchComments().then();
    }, [])

    return (
    <View style={{ width: '100%'}}>
        <FlatList
            data={comment}
            renderItem={({item}) => <Comment comment={item} />}
            keyExtractor={(item) => item._id}
            ref={flatList}
            refreshing={loading}
            onRefresh={fetchComments}
        />
    </View>
    );
};

export default CommentList;