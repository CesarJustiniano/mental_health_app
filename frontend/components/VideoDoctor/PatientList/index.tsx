import React from "react";
import { View ,Text, Linking, TouchableOpacity} from "react-native";

import {UserType} from "../../../types";

import styles from "../../VideoCall/styles";

import ProfilePicture from "../../ProfilePicture";


export type UserProps = {
    User: UserType
}

const onButtonPressVideoChat = (phoneNumber) => {
    //navigation.navigate('LoginPsychologistScreen');
    Linking.openURL("tel:+"+phoneNumber);
    //await?
}



const PatientList = ({User}:UserProps) =>(
    <View style={styles.container}>
        <TouchableOpacity >
            <ProfilePicture></ProfilePicture>
            <Text>Patient: {User.firstName} {User.lastName} </Text>
            <Text>Username: {User.username}</Text>
            <Text>Phone Number: {User.phoneNumber}</Text>
            <Text style={styles.redButton} onPress={()=>onButtonPressVideoChat(User.phoneNumber)}>CALL PATIENT</Text>
        </TouchableOpacity>
    </View>


)

export default PatientList