import * as React from 'react';
import {View, Text} from "../components/Themed";
import {Modal, StyleSheet, TouchableHighlight, Platform, Alert} from "react-native";
import moment from "moment";
import {useState} from "react";
//import DateTimePicker from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import {getAuthUser} from "../constants/api";
import {useNavigation} from "@react-navigation/native";

const CustomDatePicker =(props)=>{
    const {textStyle, defaultDate} = props;
    const navigation = useNavigation(); //new
    const [date,setDate] = useState(moment(defaultDate));
    const [show,setShow] = useState(false);
    const [User, setUser] = useState([]);
    const [UserApp, setUserApp] = useState([]);
    const [Doctor, setDoctor] = useState([]);
    const [DoctorApp,setDoctorApp] = useState([]);
    const [DateApp, setDateApp] = useState([]);
    const onChange = (e,selectedDate)=>{
        setDate(moment(selectedDate))
    }

    const createPopUp = ()=>{
        Alert.alert(
            "Your Appointment has been created",
            " Please Wait for your appointment date",
            [

                {text: "OK",onPress: () => console.log("OK Pressed") }
            ]
        )
    }
    const onCloseButton = () => {
        navigation.navigate('Root');
    }

    const onButtonAppoint= async ()=>{
        try{
            const info = await getAuthUser();
            console.log("The User is ")
            console.log(info.firstName)
            setUser(info)
            console.log("The doctor of the User is")
            console.log(info.myDoctor.firstName)
            setDoctor(info.myDoctor)
            console.log("THIS IS THE DATE")
            console.log(date)
            const newAppointment = {
                appointment: date,
                requestedBy: User,
                yourDoctor: Doctor
            }
            const response = await axios.post('/createSchedule',newAppointment,{withCredentials:true})
            setDateApp(response.data)
            console.log("RESPONSE OF THE APPOINTMENT")
            console.log(response.data);


            const updateUser = {
                    myAppointment: response.data,
            }
            const responseUser = await axios.put('/updateUser', updateUser, {withCredentials: true});
            setUserApp(responseUser.data.myAppointment)
            console.log("RESPONSE OF THE UPDATED USER")
            console.log(responseUser.data);


            const updateDoctor ={
                myAppointment: response.data,
            }
            const responseDoctor = await axios.put('/updateDoctor', updateDoctor, {withCredentials: true});
            setDoctorApp(responseDoctor.data.myAppointment)
            console.log("RESPONSE OF THE DOCTOR")
            console.log(responseDoctor.data)

            createPopUp()
            onCloseButton()

            //look into newpost component
        }catch (e){
            console.log(e);
        }
    }


    const onAndroidChange =(e,selectedDate)=>{
        setShow(false);
        if(selectedDate){
            setDate(moment(selectedDate));
            props.onDateChange(selectedDate);
            console.warn("A date has been picked: ", date);
            console.log("Date Picked ", date);
        }
    }
    //

    const onCancelPress =()=>{
        setDate(moment(defaultDate));
        setShow(false);


    }

    const onDonePress =()=>{
            props.onDateChange(date);
            console.warn("A date has been picked: ", date);
            console.log("Date Picked ", date)
            setShow(false);
    }



    const renderDatePicker = ()=>{
        return(
            <DateTimePicker
                //isVisible={show}
                //onConfirm={handleConfirm}
                //onCancel={onCancelPress}
                timeZoneOffsetInMinutes={0}
                value={new Date(date)}
                mode="date"
                //mode = {tmode}

                minimumDate={new Date(moment().format('YYYY-MM-DD'))}
                maximumDate={new Date(moment().add(5,'years').format('YYYY-MM-DD'))}

                onChange={Platform.OS=='ios'? onChange : onAndroidChange}
            >
            </DateTimePicker>
        );
    };


        return (
            <TouchableHighlight
                activeOpacity={0}
                onPress={()=>setShow(true)}
                >
                <View>
                    <Text style={textStyle}>{date.format('MMM-Do-YYYY hh:mm:ss')}</Text>


                    {Platform.OS != 'ios'  && show && renderDatePicker()}

                    {Platform.OS=='ios' && (



                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={show}
                        supportedOrientations={['portrait']}
                        onRequestClose={()=>setShow(false)}
                    >
                        <View style={{flex:1}}>
                            <TouchableHighlight
                                style={{
                                    flex:1,
                                    alignItems:'flex-end',
                                    flexDirection:'row',
                                }}
                                activeOpacity={1}
                                visible={show}
                                onPress={()=>setShow(false)}
                            >
                                <TouchableHighlight
                                    underlayColor={'#FFFFFF'}
                                    style={{
                                        flex: 1,
                                        borderTopColor:'#E9E9E9',
                                        borderTopWidth: 1,
                                    }}
                                    onPress={()=>console.log('datapicker clicked')}
                                >
                                    <View style={{
                                        backgroundColor:'#FFFFFF',
                                        height: 256,
                                        overflow:'hidden'
                                    }}>
                                        <View style={{marginTop: 20}}>

                                            <DateTimePicker
                                                //isVisible={show}
                                                //onConfirm={handleConfirm}
                                                //onCancel={onCancelPress}
                                                timeZoneOffsetInMinutes={0}
                                                value={new Date(date)}
                                                mode="datetime"
                                                //mode = {tmode}

                                                minimumDate={new Date(moment().format('YYYY-MM-DD'))}
                                                maximumDate={new Date(moment().add(5,'years').format('YYYY-MM-DD'))}
                                                onChange={Platform.OS=='ios'? onChange : onAndroidChange}
                                                //17:18
                                            >
                                            </DateTimePicker>

                                            <TouchableHighlight
                                                underlayColor={'transparent'}
                                                onPress={onCancelPress}
                                                style={[styles.btnText,styles.btnCancel]}
                                            >
                                                <Text>
                                                    Cancel
                                                </Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight
                                                underlayColor={'transparent'}
                                                onPress={onDonePress}
                                                style={[styles.btnText,styles.btnDone]}
                                            >
                                                <Text>
                                                    Done
                                                </Text>
                                            </TouchableHighlight>



                                        </View>

                                    </View>

                                </TouchableHighlight>

                            </TouchableHighlight>
                        </View>

                    </Modal>
                    )}
                    <View>
                        <Text style={styles.redButton}  onPress={()=>onButtonAppoint()} >CONFIRM APPOINTMENT</Text>
                    </View>

                </View>

            </TouchableHighlight>
        )

}

CustomDatePicker.defaultProps={
    textStyle:{},
    defaultDate: moment(),
    //currentMode: 'date',
    onDateChange: ()=>{

    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle:{
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: 'gray',
        borderWidth: 1,
    },
    btnText:{
        position:'absolute',
        top:0,
        height:42,
        paddingHorizontal: 20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    btnCancel:{
        left:0,
    },
    btnDone:{
        right:0,
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
});

export default CustomDatePicker;