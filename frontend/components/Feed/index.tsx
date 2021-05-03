import React, {useState, useEffect, useRef} from "react";
import {View, FlatList, ScrollView, RefreshControl} from "react-native";
import Post from "../Post";
import axios from "axios";
import {Params} from "../../types";
import {RouteProp, useRoute} from "@react-navigation/native";

const Feed = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const flatList = useRef<FlatList>(null);

    const route = useRoute<RouteProp<Params, 'A'>>();

    const fetchPosts = async () => {
        setLoading(true);
        try{
            const postData = await axios.get(`/posts/${route.params.name}`);
            setPosts(postData.data);
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
                flexGrow: 1,
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