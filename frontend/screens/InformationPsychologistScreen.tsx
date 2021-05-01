import React from 'react';
import {KeyboardAvoidingView, Linking, ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Text, View, } from '../components/Themed';

export default function InformationPsychologistScreen(){

    const  navigation = useNavigation();

    const onButtonHelp = () => {
        navigation.navigate('HelpCenterScreen');
    }
    const onButtonBack = () => {
        navigation.navigate('PsychologistMenuScreen');
    }

    const onButtonPrivacy = ()=>{
        Linking.openURL("https://pdfhost.io/v/kXsaPhgTN_FeelGoods_Privacy_Policy.pdf");
    }

    return(

        <View style={styles.container}>

            <View>

                <Text onPress={onButtonPrivacy}
                      style={{color:'blue', alignItems: 'center',
                          justifyContent: 'center'}}>
                    Privacy Policy
                </Text>
                <TouchableOpacity >
                    <Text style={styles.customButton} onPress={onButtonHelp} >HELP CENTERS</Text>
                </TouchableOpacity>


                <TouchableOpacity >
                    <Text style={styles.customButton} onPress={onButtonBack} >FEEDBACK</Text>
                </TouchableOpacity>



                <TouchableOpacity >
                    <Text style={styles.customButton} onPress={onButtonBack} >GO BACK</Text>
                </TouchableOpacity>

            </View>



        </View>





    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {


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

        //alignSelf: 'stretch',
        //height: 40,
        marginBottom: 15,
        //color: '#fff',
        //borderBottomWidth: 1,




    },

    customButton:{
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
        marginTop: 6,
        marginBottom: 12,
        //cursor: 'pointer'

    },
    keyboard: {
        marginBottom: 100,
    }
});
