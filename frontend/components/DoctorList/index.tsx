import React , {useEffect, useRef, useState} from "react";
import {View, FlatList, Text, Linking, TouchableOpacity} from "react-native";

import {UserType} from "../../types";
import {DoctorType} from "../../types";
import axios from "axios";

import DoctorListComp from "./DoctorComponent";
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
                    <DoctorListComp doctor={item}/>
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