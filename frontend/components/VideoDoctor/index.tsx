import React , {useEffect, useRef, useState} from "react";
import {View, FlatList, Text, Linking, TouchableOpacity} from "react-native";

import {UserType} from "../../types";
import {DoctorType} from "../../types";
import { useRoute, RouteProp } from '@react-navigation/native';

import {getAuthUser, getDoctorList} from "../../constants/api";

import PatientList from "./PatientList";
import List from "../MyPatients/List";
import axios from "axios";
export type VideoCallProps ={
    patient: UserType
    doctor: DoctorType
}

const VideoDoctor= ()=>{
    const flatList = useRef<FlatList>(null);
    const [patients, setPatient] = useState([]);
    // const [user, setUser] = useState([]);
    // const [fName, setFName] = useState([]);
    // const [Dname,setDname] = useState([]);
    // const [lName, setLName] = useState([]);
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    console.log(route.params)

    // const fetchFDoctor = async ()=>{
    //     try{
    //         const info = await getAuthUser();
    //         console.log("this is the Doctor with DoctorName:")
    //         console.log(info)
    //
    //
    //         setPatient(info.myPatients);
    //
    //         console.log("This is My Patient:")
    //         console.log(info.myPatients)
    //         console.log(Patients)
    //         console.log("First in Array is:")
    //         console.log("My patient length"+info.myPatients.length)
    //         let i;
    //         for(i=0;i<info.myPatients.length;i++){
    //             //console.log(i)
    //         }
    //
    //         console.log(info.myPatients[0]['firstName'])
    //         setDname(info.myPatients[0]['firstName'])
    //         //console.log(myDoctor[0]['firstName'])
    //
    //     }
    //     catch (e){
    //         console.log(e)
    //     }
    //
    // }

    const fetchFDoctor = async () => {
        setLoading(true);
        try {
            const myPatients = await axios.get('/doctor_myPatients', {withCredentials: true});
            setPatient(myPatients.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
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
            <FlatList
                data={patients}
                renderItem={({item}) => <PatientList User={item}/>}
                keyExtractor={(item) => item._id}
                ref={flatList}
                refreshing={loading}
                onRefresh={fetchFDoctor}
            />
        </View>
    );
}

export default VideoDoctor