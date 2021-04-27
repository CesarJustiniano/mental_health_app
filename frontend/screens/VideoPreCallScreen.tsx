import * as React from 'react';
import {
    StyleSheet,
    Platform,
    ScrollView,
    TextInput,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image,
    Linking,
    FlatList, RefreshControl, SafeAreaView
} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View , } from '../components/Themed';
import {useNavigation} from "@react-navigation/native";
const {width: WIDTH} = Dimensions.get('window')
//import { PostType } from "../../types";
import {UserType} from "../types";
import {DoctorType} from "../types";
import {useEffect, useRef, useState} from "react";
import axios from "axios";

import {getDoctorList, getPosts} from "../constants/api";
import Post from "../components/Post";
import VideoCall from "../components/VideoCall";
import { useRoute } from '@react-navigation/native';




export type VideoCallProps = {
    patient: UserType,
    doctor: DoctorType
}

export default function VideoPreCallScreen(this: any, {doctor,patient}:VideoCallProps){




    const  navigation = useNavigation();
    const route = useRoute();
    console.log(route.params)

    //const [doctors, setDoctors] = useState([]);
    //const [loading, setLoading] = useState(false);

    //Dummy data
    let [username, setUsername] = useState('Jesse'); //Dummy initial
    let [phoneNumber, setPhoneNumber] = useState("17874094429"); //Dummy initial
    let [address, setAddress] = useState('San Juan, Puerto Rico'); //Dummy initial
    let[appointmentDate] = useState('May-03-2021')
    let[myDoctor] = useState('Jesse')

    const onButtonPressVideoChat = () => {
        //navigation.navigate('LoginPsychologistScreen');
        Linking.openURL("tel:+"+phoneNumber);
        //await?
    }
    const onButtonBack = () => {
        //navigation.navigate('CalendarAgenda');
        navigation.navigate('UserMenuScreen');
    }
    const flatList = useRef<FlatList>(null);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);


    return (
        <View style={styles.container}>
            <Text style={styles.headings}>IF YOUR APPOINTMENT IS READY THEN WAIT FOR YOUR DOCTOR TO CALL YOU</Text>
            <Text>Your Appointment is {appointmentDate}</Text>
            <Text onPress={onButtonPressVideoChat}> Doctor: {myDoctor}| Phone: {phoneNumber}</Text>
            <TouchableOpacity >
                <Text style={styles.redButton} onPress={onButtonBack} >GO BACK</Text>
            </TouchableOpacity>
            <VideoCall />
        </View>


    );




}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    headings:{
        //margin: "1em 0 0.5em 0",
        color: '#343434',
        fontSize: 22,
        lineHeight: 40,
        fontWeight: 'normal',
        textTransform: 'uppercase',
        fontFamily: 'Orienta',
        letterSpacing: 1,
        fontStyle: 'italic',

    },

    redButton:{
        alignItems: 'center',

        display: 'flex',
        justifyContent: 'center',
        paddingTop: 6,
        paddingRight: 16,
        paddingBottom: 6,
        paddingLeft: 16,
        flexShrink: 0,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3,
        fontWeight: "500",
        backgroundColor: 'rgba(235, 87, 87, 0.03)',
        color: 'rgb(0, 128, 128)',
        borderWidth: 1,
        borderColor: 'rgb(0, 128, 128)',
        borderStyle: 'solid',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 1,
        width: '100%',
        marginTop: 6,
        marginBottom: 12,
        //cursor: 'pointer'
    },
    keyboard: {
        marginBottom: 100,
    }


});