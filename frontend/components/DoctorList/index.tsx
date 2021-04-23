import React , {useEffect, useRef, useState} from "react";
import {View, FlatList, Text, Linking, TouchableOpacity} from "react-native";

import {UserType} from "../../types";
import {DoctorType} from "../../types";
import { useRoute, RouteProp } from '@react-navigation/native';
import {Params} from "../../types";
import styles from "./styles";
import axios from "axios";
import Comment from "../Comment";
import {getDoctorList} from "../../constants/api";
import ProfilePicture from "../ProfilePicture";
export type VideoCallProps ={
    patient: UserType
    doctor: DoctorType
}

const DoctorList = () =>{

    const flatList = useRef<FlatList>(null);

    const [doctor, setDoctor] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/allDoctors`);
            //const response = await getDoctorList();
            console.log(response.data)
            setDoctor(response.data);

        } catch (e){
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDoctors().then();
    }, [])


    return (
        <View style={{ width: '100%'}}>
            <FlatList
                data={doctor}
                renderItem={({item}) => (
                    <View style={styles.container}>
                        <TouchableOpacity >
                            <ProfilePicture></ProfilePicture>
                            <Text>Doctor: {item.firstName} {item.lastName} </Text>
                            <Text>Email: {item.email}</Text>
                            <Text>Phone Number: {item.phoneNumber}</Text>
                            <Text   style={styles.redButton}>ASSIGN DOCTOR TO ME</Text>
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

export default DoctorList