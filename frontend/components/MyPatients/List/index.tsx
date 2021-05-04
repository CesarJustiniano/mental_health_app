import React from "react";
import { View ,Text, Linking, TouchableOpacity} from "react-native";

import {UserType} from "../../../types";
import styles from "../../VideoCall/styles";
//import styles from "./styles";
import ProfilePicture from "../../ProfilePicture";
import axios from "axios";
import moment from "moment";

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

// const getAtrributes = async (User)=>{
//     const firstNamed = await axios.get(`/user/${User}/getFirstName`)
//     const lastNamed = await axios.get(`/user/${User}/getLastName`)
//     const phoneNumby = await axios.get(`/user/${User}/getPhoneNumber`)
//     const address = await axios.get(`/user/${User}/getAddress`)
//     const appoin= await axios.get(`/user/${User}/getAppointment`)
//
//     let mystring = "Patient"+firstNamed.data.firstName+" "+lastNamed.data.lastName+"\n"+
//         "Phone Number "+phoneNumby.data.phoneNumber+"\n"+
//         "Address "+address.data.physicalAddress+"\n"+
//         "APPOINTMENT ON "+appoin.data.myAppointment.appointment
//     return "Patient"
// }


const List =   ({User}:UserProps) => {

    //getAtrributes(User)


return(
    <View style={styles.container}>
        <TouchableOpacity>
            <ProfilePicture></ProfilePicture>
            <Text>Patient: {User.firstName} {User.lastName} </Text>
            <Text>Phone Number: {User.phoneNumber}</Text>
            <Text>Address: {User.physicalAddress}</Text>
            <Text style={styles.redButton}>APPOINTMENT ON: {moment(User.myAppointment).format('DD/MM/YYYY, hh:mm a')}</Text>
        </TouchableOpacity>
    </View>
)

}
export default List