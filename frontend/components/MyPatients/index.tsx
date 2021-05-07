import React , {useEffect, useRef, useState} from "react";
import {View, FlatList, Text, Linking, TouchableOpacity} from "react-native";

import {UserType} from "../../types";
import {DoctorType} from "../../types";
import { useRoute, RouteProp } from '@react-navigation/native';

import {getAuthUser, getDoctorList} from "../../constants/api";
import axios from "axios";

import List from"../MyPatients/List/index"
export type VideoCallProps ={
    patient: UserType
    doctor: DoctorType
}

const MyPatients = ()=>{
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
            let i
            for(i=0;i<patients.length;i++) {
                console.log(i)

            }

        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFDoctor().then();
    }, [])


    // @ts-ignore
    return(

        <View style={{ alignItems: "flex-start", justifyContent: "flex-start"}}>
            <FlatList
                data={patients}
                renderItem={({item}) => <List User={item}/>}
                keyExtractor={(item) => item._id}
                ref={flatList}
                refreshing={loading}
                onRefresh={fetchFDoctor}
            />
        </View>
    )

}

export default MyPatients