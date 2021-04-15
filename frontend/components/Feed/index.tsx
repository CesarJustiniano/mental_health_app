import React, {useState, useEffect, useRef} from "react";
import {View, FlatList, ScrollView, RefreshControl} from "react-native";
import Post from "../Post";
import { getPosts } from '../../constants/api';

const Feed = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const flatList = useRef<FlatList>(null);

    const fetchPosts = async () => {
        setLoading(true);
        try{
            const postData = await getPosts();
            setPosts(postData);
        } catch (e) {
            console.log(e);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts().then();
    }, [])

    return (
        <ScrollView
            contentContainerStyle={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                flexGrow: 1
            }}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchPosts} />}
        >
            <FlatList
                inverted
                data={posts}
                renderItem={({item}) => <Post post={item}/>}
                keyExtractor={(item) => item._id}
                ref={flatList}
                refreshing={loading}
                onRefresh={fetchPosts}
            />
        </ScrollView>
    );
};

export default Feed;