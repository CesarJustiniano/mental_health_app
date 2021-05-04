import React , {useEffect, useRef, useState} from "react";
import {View, FlatList, Text, Linking, TouchableOpacity} from "react-native";

import {UserType} from "../../types";
import {DoctorType} from "../../types";
import { useRoute, RouteProp } from '@react-navigation/native';

import {getAuthUser, getDoctorList} from "../../constants/api";
import axios from "axios";

import List from"../MyPatients/List/index"
export type VideoCallProps ={
    patient: UserType
    doctor: DoctorType
}

const MyPatients = ()=>{
    const flatList = useRef<FlatList>(null);
    const [patients, setPatient] = useState([]);

    // const [user, setUser] = useState([]);
    // const [fName, setFName] = useState([]);
    // const [Dname,setDname] = useState([]);
    // const [lName, setLName] = useState([]);
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    console.log(route.params)

    // const fetchFDoctor = async ()=>{
    //     try{
    //         const info = await getAuthUser();
    //         console.log("this is the Doctor with DoctorName:")
    //         console.log(info)
    //
    //
    //         setPatient(info.myPatients);
    //
    //         console.log("This is My Patient:")
    //         console.log(info.myPatients)
    //         console.log(Patients)
    //
    //         console.log("My patient length"+info.myPatients.length)
    //         let i;
    //         for(i=0;i<info.myPatients.length;i++){
    //             //console.log(i)
    //         }
    //         //const mypat = info.myPatients[2]
    //         //console.log("THE MYPAT IS")
    //         //console.log(mypat)
    //         //console.log(info.myPatients[2]['firstName'])
    //         //const firstNamed = await axios.get(`/user/${mypat}/getFirstName`)
    //
    //         //console.log("First in Array is:")
    //         //console.log(firstNamed.data.firstName)
    //
    //         //const lastNamed = await axios.get(`/user/${mypat}/getLastName`)
    //
    //         //console.log("Last Name is:")
    //         //console.log(lastNamed.data.lastName)
    //
    //         //const phoneNumby = await axios.get(`/user/${mypat}/getPhoneNumber`)
    //
    //        // console.log("PhoneNumber is:")
    //         //console.log(phoneNumby.data.phoneNumber)
    //
    //         //const address = await axios.get(`/user/${mypat}/getAddress`)
    //
    //         //console.log("Address is:")
    //         //console.log(address.data.physicalAddress)
    //
    //         //const appoin= await axios.get(`/user/${mypat}/getAppointment`)
    //
    //         //console.log("Appointment is is:")
    //         //console.log(appoin.data.myAppointment.appointment)
    //
    //
    //
    //         //setDname(info.myPatients[2]['firstName'])
    //         //console.log(myDoctor[0]['firstName'])
    //
    //         //console.log(info.myPatients[2]['myAppointment']['appointment'])
    //
    //
    //     }
    //     catch (e){
    //         console.log(e)
    //     }
    //
    // }

    const fetchFDoctor = async () => {
        setLoading(true);
        try {
            const myPatients = await axios.get('/doctor_myPatients', {withCredentials: true});
            setPatient(myPatients.data);
            let i
            for(i=0;i<patients.length;i++) {
                console.log(i)

            }

        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFDoctor().then();
    }, [])

    const onButtonPressVideoChat = (phoneNumber) => {
        //navigation.navigate('LoginPsychologistScreen');
        Linking.openURL("tel:+"+phoneNumber);
        //await?
    }

    // @ts-ignore
    return(

        <View style={{ alignItems: "flex-start", justifyContent: "flex-start"}}>
            <FlatList
                data={patients}
                renderItem={({item}) => <List User={item}/>}
                keyExtractor={(item) => item._id}
                ref={flatList}
                refreshing={loading}
                onRefresh={fetchFDoctor}
            />
        </View>
    )

}

export default MyPatients