import * as React from 'react';
import {View, Text} from "../components/Themed";
import {Modal, StyleSheet, TouchableHighlight, Platform} from "react-native";
import moment from "moment";
import {useState} from "react";
//import DateTimePicker from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomTimePicker =(props)=>{
    const {textStyle, defaultTime} = props;
    const [time,setTime] = useState(moment(defaultTime));
    const [show,setShow] = useState(false);
    const onChange = (e,selectedTime)=>{
        setTime(moment(selectedTime))

    }

    const onAndroidChange =(e,selectedTime)=>{
        setShow(false);
        if(selectedTime){
            setTime(moment(selectedTime));
            props.onTimeChange(selectedTime);
            console.warn("A time has been picked: ", time);
        }
    }
    //

    const onCancelPress =()=>{
        setTime(moment(defaultTime));
        setShow(false);


    }

    const onDonePress =()=>{
        props.onTimeChange(time);
        console.warn("A time has been picked: ", time);
        setShow(false);
    }

    const renderTimePicker = ()=>{
        return(
            <DateTimePicker
                //isVisible={show}
                //onConfirm={handleConfirm}
                //onCancel={onCancelPress}
                timeZoneOffsetInMinutes={0}
                value={new Date(time)}
                mode="time"


                onChange={Platform.OS=='ios'? onChange : onAndroidChange}
                //17:18
            >
            </DateTimePicker>
        );
    }


    return (
        <TouchableHighlight
            activeOpacity={0}
            onPress={()=>setShow(true)}
        >
            <View>
                <Text style={textStyle}>{time.format('HH-MM-SS')}</Text>

                {Platform.OS != 'ios'  && show && renderTimePicker()}

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

                                            {renderTimePicker()}

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

CustomTimePicker.defaultProps={
    textStyle:{},
    defaultTime: moment(),
    onTimeChange: ()=>{

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

export default CustomTimePicker;