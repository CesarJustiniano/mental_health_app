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
    const [myDoctor, setDoctor] = useState([]);
    const [user, setUser] = useState([]);
    const [fName, setFName] = useState([]);
    const [Dname,setDname] = useState([]);
    const [lName, setLName] = useState([]);
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    console.log(route.params)



    const fetchFName = async () => {
        try{
            const info = await getAuthUser();
            console.log("this is the user with Fname:")
            console.log(info)

            setFName(info.firstName);
            setLName(info.lastName);
            setDoctor(info.myDoctor);
            console.log("This is My Doctor:")
            console.log(info.myDoctor)




        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchFName().then();
    }, [])

    const onButtonPressVideoChat = (phoneNumber) => {
        //navigation.navigate('LoginPsychologistScreen');
        Linking.openURL("tel:+"+phoneNumber);
        //await?
    }
return (
    <View style={{ width: '100%'}}>
        <Text>The First Name of user is {fName}</Text>
        <Text>The Last Name of user is {lName}</Text>
        <Text>The Doctor of the user is </Text>




    </View>
);

}

export default VideoCall