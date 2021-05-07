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
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    console.log(route.params)



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