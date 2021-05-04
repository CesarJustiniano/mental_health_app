import * as React from 'react';
import {Text, View} from "../components/Themed";
import {Modal, StyleSheet, TouchableHighlight, Button, TextInput} from "react-native";


import MyPatients from "../components/MyPatients";


export default function DoctorSchedule(){


    return(
        <View style={{flex:1,alignItems: 'center',
            justifyContent: 'center'}}>
            <MyPatients></MyPatients>

        </View>
    )




}
const styles = StyleSheet.create({
    textStyle :{
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: 'rgb(0, 128, 128)',
        borderWidth:1,

    },
    redButton:{

        alignItems: 'center',
        //userSelect: 'none',
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
        marginTop: 20,
        marginBottom: 12,
        //cursor: 'pointer'
    },

    customInput:{
        borderWidth: 0,
        borderColor: 'black',
        borderStyle: 'solid',
        backgroundColor: "#f2f2f2",
        padding: 12,
        borderRadius: 3,
        width: 250,
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginBottom:15,

    },


})
