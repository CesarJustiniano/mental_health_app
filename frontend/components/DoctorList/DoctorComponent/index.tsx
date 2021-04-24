import React from "react";
import { View ,Text, Linking, TouchableOpacity} from "react-native";

import {UserType} from "../../../types";
import {DoctorType} from "../../../types";
import { useRoute, RouteProp } from '@react-navigation/native';
import {Params} from "../../../types";
import styles from "./styles";
import axios from "axios";
import Comment from "../../Comment";
import {getDoctorList} from "../../../constants/api";
import ProfilePicture from "../../ProfilePicture";

export type DoctorProps = {
    doctor: DoctorType
}

const onButtonPressVideoChat = (phoneNumber) => {
    //navigation.navigate('LoginPsychologistScreen');
    Linking.openURL("tel:+"+phoneNumber);
    //await?
}
const DoctorListComp = ({doctor}:DoctorProps) => (



    <View style={styles.container}>
        <TouchableOpacity >
            <ProfilePicture></ProfilePicture>
            <Text>Doctor: {doctor.firstName} {doctor.lastName} </Text>
            <Text>Email: {doctor.email}</Text>
            <Text>Phone Number: {doctor.phoneNumber}</Text>
            <Text   style={styles.redButton} onPress={()=>onButtonPressVideoChat(doctor.phoneNumber)}>ASSIGN DOCTOR TO ME</Text>
        </TouchableOpacity>
    </View>
)

export default DoctorListComp;