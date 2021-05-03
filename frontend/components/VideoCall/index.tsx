import React , {useEffect, useRef, useState} from "react";
import {View, FlatList, Text, Linking, TouchableOpacity} from "react-native";

import {UserType} from "../../types";
import {DoctorType} from "../../types";
import { useRoute, RouteProp } from '@react-navigation/native';

import {getAuthUser, getDoctorList} from "../../constants/api";
import axios from "axios";
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
    const [DLname,setDLname] = useState([]);
    const [lName, setLName] = useState([]);
    const [phoneNumber,setPhoneNumber] = useState([]);
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    console.log(route.params)



    const fetchFName = async () => {
        try{
            const info = await getAuthUser();
            console.log("this is the user with Fname:")
            console.log(info.firstName)

            setDoctor(info.myDoctor);
            const firstNamed = await axios.get(`/doctor/${info.myDoctor}/getFirstName`)
            const lastNamed = await axios.get(`/doctor/${info.myDoctor}/getLastName`)
            const phoneNumby = await axios.get(`/doctor/${info.myDoctor}/getPhoneNumber`)

            setFName(info.firstName);
            setLName(info.lastName);

            console.log("This is My Doctor:")
            console.log(info.myDoctor)

            console.log("First in Array is:")
            console.log(info.myDoctor['firstName'])
            setDname(firstNamed.data.firstName)
            setDLname(lastNamed.data.lastName)
            setPhoneNumber(phoneNumby.data.phoneNumber)

            //console.log(myDoctor[0]['firstName'])




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
    <View>
        <Text>Your Doctor`s Name is {Dname} {DLname}</Text>
        <Text>Your Doctor`s Phone: {phoneNumber} </Text>

    </View>
);

}

export default VideoCall