import React , {useEffect, useRef, useState} from "react";
import {View, FlatList, Text, Linking, TouchableOpacity} from "react-native";

import {UserType} from "../../types";
import {DoctorType} from "../../types";
import { useRoute, RouteProp } from '@react-navigation/native';
import {Params} from "../../types";
import styles from "../VideoCall/styles";
import axios from "axios";
import Comment from "../Comment";
import {getAuthUser, getDoctorList} from "../../constants/api";
export type VideoCallProps ={
    patient: UserType
    doctor: DoctorType
}

const VideoDoctor= ()=>{
    const flatList = useRef<FlatList>(null);
    const [myPatient, setPatient] = useState([]);
    const [user, setUser] = useState([]);
    const [fName, setFName] = useState([]);
    const [Dname,setDname] = useState([]);
    const [lName, setLName] = useState([]);
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    console.log(route.params)

    const fetchFDoctor = async ()=>{
        try{
            const info = await getAuthUser();
            console.log("this is the Doctor with DoctorName:")
            console.log(info)

            setFName(info.firstName);
            setLName(info.lastName);
            setPatient(info.myPatient);
            console.log("This is My Patient:")
            console.log(info.myPatient)
            console.log(myPatient)
            console.log("First in Array is:")
            console.log(info.myPatient[0]['firstName'])
            setDname(info.myPatient[0]['firstName'])
            //console.log(myDoctor[0]['firstName'])

        }
        catch (e){
            console.log(e)
        }

    }
    useEffect(() => {
        fetchFDoctor().then();
    }, [])

    const onButtonPressVideoChat = (phoneNumber) => {
        //navigation.navigate('LoginPsychologistScreen');
        Linking.openURL("tel:+"+phoneNumber);
        //await?
    }


    return (
        <View style={{ width: '100%'}}>
            <Text> The First Name of user is {fName}</Text>
            <Text>The Last Name of user is {lName}</Text>
            <Text>The Doctor of the user is is {Dname} </Text>




        </View>
    );
}

export default VideoDoctor