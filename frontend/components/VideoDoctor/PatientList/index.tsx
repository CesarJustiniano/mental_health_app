import React from "react";
import { View ,Text, Linking, TouchableOpacity} from "react-native";

import {UserType} from "../../../types";
import {DoctorType} from "../../../types";
import { useRoute, RouteProp } from '@react-navigation/native';
import {Params} from "../../../types";
import styles from "../../VideoCall/styles";
import axios from "axios";
import Comment from "../../Comment";
import {getDoctorList} from "../../../constants/api";
import ProfilePicture from "../../ProfilePicture";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";

export type UserProps = {
    User: UserType
}

const onButtonPressVideoChat = (phoneNumber) => {
    //navigation.navigate('LoginPsychologistScreen');
    Linking.openURL("tel:+"+phoneNumber);
    //await?
}
const onCloseButton = () => {
    // navigation.navigate('UserMenuScreen');
}


const PatientList = ({User}:UserProps) =>(
    <View style={styles.container}>
        <TouchableOpacity >
            <ProfilePicture></ProfilePicture>
            <Text>Doctor: {User.firstName} {User.lastName} </Text>

            <Text>Phone Number: {User.phoneNumber}</Text>
            <Text style={styles.redButton} onPress={()=>onButtonPressVideoChat(User.phoneNumber)}>CALL PATIENT</Text>
        </TouchableOpacity>
    </View>


)

export default PatientList