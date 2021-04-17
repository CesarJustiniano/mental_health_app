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
    Linking
} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View , } from '../components/Themed';
import {useNavigation} from "@react-navigation/native";
const {width: WIDTH} = Dimensions.get('window')
//import { PostType } from "../../types";
import {UserType} from "../types";
import {DoctorType} from "../types";
import {useState} from "react";


export type VideoCallProps = {
    patient: UserType,
    doctor: DoctorType
}

export default function VideoPreCallScreen({doctor,patient}:VideoCallProps){
    const  navigation = useNavigation();


    //Dummy data
    let [username, setUsername] = useState('Jesse'); //Dummy initial
    let [phoneNumber, setPhoneNumber] = useState("17874094429"); //Dummy initial
    let [address, setAddress] = useState('San Juan, Puerto Rico'); //Dummy initial

    const onButtonPressVideoChat = () => {
        //navigation.navigate('LoginPsychologistScreen');
        Linking.openURL("tel:+"+phoneNumber);
        //await?
    }


    return (
        <View style={styles.container}>
            <Text style={styles.headings}>IF YOUR APPOINTMENT IS READY THEN PRESS THE BUTTON</Text>
            <Text onPress={onButtonPressVideoChat}> This is my doctors's phone {phoneNumber}</Text>
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