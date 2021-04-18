import * as React from 'react';
import {StyleSheet,Platform,ScrollView, TextInput, Dimensions, TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View , } from '../components/Themed';
import {useNavigation} from "@react-navigation/native";
const {width: WIDTH} = Dimensions.get('window')

export default function TermsOfServiceScreen(){
    const  navigation = useNavigation();

    return (
        <KeyboardAvoidingView
            style={{flex:1}}
            behavior="padding">

            <ScrollView
                contentContainerStyle={{flex:1}} bounces={false}>

                <View>
                    <View style={styles.headings}>
                       <Text>END USER LICENSE AGREEMENT</Text>
                    </View>
                    <Text>
                        FeelGoodApp is licensed to You (End-User) by FeelGoodApp, located at __________, Mayaguez, Puerto Rico 00680 (hereinafter: Licensor), for use only under the terms of this License Agreement.

                        By downloading the Application from the Apple AppStore, and any update thereto (as permitted by this License Agreement), You indicate that You agree to be bound by all of the terms and conditions of this License Agreement, and that You accept this License Agreement.

                        The parties of this License Agreement acknowledge that Apple is not a Party to this License Agreement and is not bound by any provisions or obligations with regard to the Application, such as warranty, liability, maintenance and support thereof. FeelGoodApp, not Apple, is solely responsible for the licensed Application and the content thereof.

                        This License Agreement may not provide for usage rules for the Application that are in conflict with the latest App Store Terms of Service. FeelGoodApp acknowledges that it had the opportunity to review said terms and this License Agreement is not conflicting with them.

                        All rights not expressly granted to You are reserved.
                    </Text>


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