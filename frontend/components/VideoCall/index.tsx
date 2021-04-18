import React from "react";
import {View} from "react-native";

import {UserType} from "../../types";
import {DoctorType} from "../../types";
import styles from "./styles";
export type VideoCallProps ={
    patient: UserType
    doctor: DoctorType
}

const VideoCall = ({doctor,patient}:VideoCallProps) =>{
    return(

    <View style={styles.container }>




    </View>
    )

}

export default VideoCall
