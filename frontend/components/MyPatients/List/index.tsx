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


const List =   ({User}:UserProps) => {

return(
    <View style={styles.container}>
        <TouchableOpacity>
            <ProfilePicture></ProfilePicture>
            <Text>Patient: {User.firstName} {User.lastName} </Text>
            <Text>Username: {User.username}</Text>
            <Text>Phone Number: {User.phoneNumber}</Text>
            <Text>Address: {User.physicalAddress}</Text>
            <Text style={styles.redButton}>APPOINTMENT ON: {moment(User.myAppointment).format('MM/DD/YYYY, hh:mm a')}</Text>
        </TouchableOpacity>
    </View>
)

}
export default List