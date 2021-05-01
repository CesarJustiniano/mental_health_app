import React, {useRef} from "react";
import {View, Text, Linking, TouchableOpacity, FlatList} from "react-native";

import {UserType} from "../../../types";
import {DoctorType} from "../../../types";
import { useRoute, RouteProp } from '@react-navigation/native';
import {Params} from "../../../types";
import styles from "./styles";
import axios from "axios";
import Comment from "../../Comment";
import {getDoctorList} from "../../../constants/api";
import ProfilePicture from "../../ProfilePicture";
import {useState,useEffect} from "react";
import {useNavigation} from "@react-navigation/native";

export type DoctorProps = {
    doctor: DoctorType
}

const onButtonPressVideoChat = (phoneNumber) => {
    //navigation.navigate('LoginPsychologistScreen');
    Linking.openURL("tel:+"+phoneNumber);
    //await?
}










const DoctorListComp = ({doctor}:DoctorProps) => {

    const [Doctor, setDoctor] = useState([]);

    const  navigation = useNavigation();

    const onCloseButton = () => {
        navigation.navigate('UserMenuScreen');
    }

    const onButtonAssign = async (Doctor)=>{
        try{
            const update ={
                myDoctor: Doctor,

            }
            console.log("This is the doctor firstname")
            console.log(Doctor.firstName)
            const response = await axios.put(`/doctor/${Doctor._id}/assignDoctor`, update, {withCredentials:true})
            setDoctor(response.data.myDoctor)
            console.log(response)
            onCloseButton()

        }catch (e){
            console.log(e)
        }



    }


    return (

        <View style={styles.container}>
            <TouchableOpacity>
                <ProfilePicture></ProfilePicture>
                <Text>Doctor: {doctor.firstName} {doctor.lastName} </Text>
                <Text>Email: {doctor.email}</Text>
                <Text>Phone Number: {doctor.phoneNumber}</Text>
                <Text style={styles.redButton} onPress={() => onButtonAssign(doctor)}>ASSIGN DOCTOR
                    TO ME</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DoctorListComp;