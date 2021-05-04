import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import {Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import * as React from "react";
import axios from "axios";

export default function UpdateProfileScreen() {

    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const createPopUp = ()=>{
        Alert.alert(
            "Your Profile has been updated",
            "You may return to the Main Menu",
            [

                {text: "OK",onPress: () => console.log("OK Pressed") }
            ]
        )
    }

    const onCloseButton = () => {
        navigation.navigate('ProfileSettings');
    }

    const onCancelButton = () => {
        navigation.navigate('ProfileSettings');
    }

    const onConfirmButton = async () => {
        try{
            const update = {
                username: username,
                phoneNumber: phoneNumber,
                physicalAddress: address,
            }
            const response = await axios.put('/updateUser', update, {withCredentials: true});
            setUsername(response.data.username);
            setPhoneNumber(response.data.phoneNumber);
            setAddress(response.data.physicalAddress);
            createPopUp();
            onCloseButton();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <AntDesign name={'close'} size={30} color={Colors.light.tint} onPress={onCloseButton}/>
                <Text style={styles.headerText}>Update Profile</Text>
            </View>
            <View style={styles.midContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Username: </Text>
                    <TextInput
                        style={styles.data}
                        value={username}
                        onChangeText={(value) => setUsername(value)}
                        placeholder={'Change to a new username'}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Phone Number: </Text>
                    <TextInput
                        style={styles.data}
                        value={phoneNumber}
                        onChangeText={(value) => setPhoneNumber(value)}
                        placeholder={'Change to a new phone number, e.g: 17875557777'}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Address: </Text>
                    <TextInput
                        style={styles.data}
                        value={address}
                        onChangeText={(value) => setAddress(value)}
                        placeholder={'Change to a new address'}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={onConfirmButton}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onCancelButton}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        borderBottomWidth: 0.5,
        borderColor: 'lightgrey',
        padding: 10,
    },
    headerText: {
        color: Colors.light.tint,
        fontWeight: "bold",
    },
    midContainer: {
        alignItems: "center",
        padding: 20,
    },
    text: {
        color: Colors.light.tint,
    },
    inputContainer: {
        flexDirection: "row",
    },
    data: {
        color: 'black',
    },
    button: {
        backgroundColor: Colors.light.tint,
        borderRadius: 30,
    },
    buttonText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'white',
        fontWeight: "bold",
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        padding: 20,
        justifyContent: "space-evenly",
        width: '100%'
    },
});