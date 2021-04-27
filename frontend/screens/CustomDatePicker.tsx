import * as React from 'react';
import {View, Text} from "../components/Themed";
import {Modal, StyleSheet, TouchableHighlight, Platform} from "react-native";
import moment from "moment";
import {useState} from "react";
//import DateTimePicker from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDatePicker =(props)=>{
    const {textStyle, defaultDate} = props;
    const [date,setDate] = useState(moment(defaultDate));
    const [show,setShow] = useState(false);
    const onChange = (e,selectedDate)=>{
        setDate(moment(selectedDate))
    }

    const onAndroidChange =(e,selectedDate)=>{
        setShow(false);
        if(selectedDate){
            setDate(moment(selectedDate));
            props.onDateChange(selectedDate);
            console.warn("A date has been picked: ", date);
            console.log("Date Picked ", date)
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
                //minimumDate={new Date(moment().subtract(120,'years').format('YYYY-MM-DD'))}
                //maximumDate={new Date(moment().format('YYYY-MM-DD'))}
                onChange={Platform.OS=='ios'? onChange : onAndroidChange}
                //17:18
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
                                                //minimumDate={new Date(moment().subtract(120,'years').format('YYYY-MM-DD'))}
                                                //maximumDate={new Date(moment().format('YYYY-MM-DD'))}
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
});

export default CustomDatePicker;