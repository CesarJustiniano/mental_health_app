import React , {useEffect, useRef, useState} from "react";
import {View, FlatList, Text, Linking, TouchableOpacity} from "react-native";

import {UserType} from "../../types";
import {DoctorType} from "../../types";
import { useRoute, RouteProp } from '@react-navigation/native';
import {Params} from "../../types";
import styles from "./styles";
import axios from "axios";
import Comment from "../Comment";
import {getAuthUser, getDoctorList} from "../../constants/api";
export type VideoCallProps ={
    patient: UserType
    doctor: DoctorType
}

const VideoCall = () =>{

    const flatList = useRef<FlatList>(null);

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    console.log(route.params)

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            //const response = await axios.get(`/allDoctors`);
            const response = await getAuthUser();
            console.log("this is the user:")
            console.log(response.data)

            setUser(response.data);

        } catch (e){
        console.log(e);
    } finally {
        setLoading(false);
    }
}

useEffect(() => {
    fetchDoctors().then();
}, [])

    const onButtonPressVideoChat = (phoneNumber) => {
        //navigation.navigate('LoginPsychologistScreen');
        Linking.openURL("tel:+"+phoneNumber);
        //await?
    }
return (
    <View style={{ width: '100%'}}>
        <FlatList
            data={user}
            renderItem={({item}) => (
                <View style={styles.container}>
                    <TouchableOpacity >
                        <Text style={styles.redButton}> first name {item.phoneNumber} </Text>
                    </TouchableOpacity>

                </View>
            )}
            keyExtractor={(item) => item._id}
            ref={flatList}
            refreshing={loading}
            onRefresh={fetchDoctors}
        />
    </View>
);

}

export default VideoCall