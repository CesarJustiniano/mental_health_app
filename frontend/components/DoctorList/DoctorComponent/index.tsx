import React, {useRef} from "react";
import {View, Text, Linking, TouchableOpacity, FlatList, Alert} from "react-native";


import {DoctorType} from "../../../types";

import styles from "./styles";
import axios from "axios";

import ProfilePicture from "../../ProfilePicture";
import {useState,useEffect} from "react";
import {useNavigation} from "@react-navigation/native";

export type DoctorProps = {
    doctor: DoctorType
}

const DoctorListComp = ({doctor}:DoctorProps) => {

    const [Doctor, setDoctor] = useState([]);

    const  navigation = useNavigation();

    const createPopUp = ()=>{
        Alert.alert(
            "Your Doctor has been assigned",
            "Return to the menu and select a Date for Appointment",
            [

                {text: "OK",onPress: () => console.log("OK Pressed") }
            ]
        )
    }

    const onCloseButton = () => {
        navigation.navigate('Root');
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
            createPopUp();
            onCloseButton();

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