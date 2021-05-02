import * as React from 'react';
import {StyleSheet,Platform,ScrollView, TextInput, Dimensions, TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native';


import { Text, View , } from '../components/Themed';
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import axios from "axios";
const {width: WIDTH} = Dimensions.get('window')

export default function LoginPsychologistScreen() {

    const [uLogin, setUserLogin] = useState({username: '', password: ''});
    const  navigation = useNavigation();

    const onButtonPress = () => {
        navigation.navigate('SignUpDoctorScreen');
    }

    const onButtonLogin = async () =>{
        try{
            const loginCredentials ={
                username:uLogin.username,
                password: uLogin.password
            }
            console.log(loginCredentials)
            const response = await  axios.post('/doctor_login',loginCredentials, {withCredentials:true});
            console.log(response.data)
            setUserLogin(response.data)

            //navigation.navigate('PsychologistMenuScreen')
            navigation.navigate('Root');
        }catch (e){
            console.log(e)
        }
    }

    const onButtonPress2 = () => {
        navigation.navigate('PsychologistMenuScreen');
    }

    const onButtonPressFirst = ()=>{
        navigation.navigate('FirstScreen')
    }

    // @ts-ignore
    return (
        <KeyboardAvoidingView
            style={{flex:1}}
            behavior="padding"
            //behavior={Platform.OS=== 'ios' ? 'padding':null}
            //behavior={Platform.OS ==='ios'? 'padding':null}
        >
            <ScrollView

                contentContainerStyle={{flex:1}} bounces={false}>

                <View style={styles.container}>

                    <View>
                        <Text style={styles.headings}>REGISTER AS A PROFESSIONAL</Text>


                        <View >
                            <TouchableOpacity>
                                <Text style={styles.redButton} onPress={onButtonPress}>                               REGISTER</Text>
                            </TouchableOpacity>
                        </View>



                    </View>

                    <View>

                        <Text style={styles.headings}>            SIGN IN</Text>
                        <TextInput
                                   value={uLogin.username||''}
                                   onChangeText={(event) => setUserLogin({...uLogin, username: event})}
                                   style={styles.customInput}
                                   placeholder='Username'
                                   placeholderTextColor='rgba(0,128,128,0.6)'
                                   underlineColorAndroid='transparent'>


                        </TextInput>

                        <TextInput
                                   value={uLogin.password || ''}
                                    onChangeText={(event) => setUserLogin({...uLogin, password: event})}
                                   style={styles.customInput}
                                   placeholder={'Password'}
                                   secureTextEntry={true}
                                   placeholderTextColor='rgba(0,128,128,0.6)'
                                   underlineColorAndroid='transparent'
                        >

                        </TextInput>
                        <TouchableOpacity>
                            <Text style={styles.redButton} onPress={onButtonLogin}>                       LOGIN</Text>
                        </TouchableOpacity>



                    </View>
                    <View>
                        <Text style={styles.headings}>-----------0R-----------</Text>
                        <TouchableOpacity >
                            <Text style={styles.redButton} onPress={onButtonPressFirst}>                      GO BACK</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
        //fontFamily: 'Orienta',
        letterSpacing: 1,
        fontStyle: 'italic',

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

    },
    keyboard: {
        marginBottom: 100,
    }


});
