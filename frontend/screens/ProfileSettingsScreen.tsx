
import * as React from "react";
import {Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import ProfilePicture from "../components/ProfilePicture";
import {AntDesign} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import {useEffect, useState} from "react";
import {getAuthUser, userLogout} from '../constants/api';

export default function ProfileSettingsScreen() {
    const navigation = useNavigation();
    const [fName, setFName] = useState([]);
    const [lName, setLName] = useState([]);
    const [username, setUsername] = useState([]);
    const [email, setEmail] = useState([]);
    const [phone, setPhone] = useState([]);
    const [address, setAddress] = useState([]);
    const [age, setAge] = useState([]);
    const [gender, setGender] = useState([]);
    // let [username, setUsername] = useState('JoseRivera'); //Dummy initial
    // let [phoneNumber, setPhoneNumber] = useState('555-555-5555'); //Dummy initial
    // let [address, setAddress] = useState('San Juan, Puerto Rico'); //Dummy initial

    const fetchFName = async () => {
        try{
            const info = await getAuthUser();
            setFName(info.firstName);
            setLName(info.lastName);
            setUsername(info.username);
            setEmail(info.email);
            setPhone(info.phoneNumber);
            setAddress(info.physicalAddress);
            setAge(info.age);
            setGender(info.gender);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchFName().then();
    }, [])

    const onCloseButton = () => {
        navigation.navigate('Root');
    }

    const onLogoutButton = async () => {
        try{
            await userLogout();
            //console.warn('Logout is pressed');
            //sends to login screen
            navigation.navigate("FirstScreen");
        } catch (e) {
            console.log(e);
        }
    }

    const onUpdateInfoButton = () => {
        console.log(`Username: ${username}
            Phone Number: ${phone}
            Address: ${address}`);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <AntDesign name={'close'} size={30} color={Colors.light.tint} onPress={onCloseButton}/>
                <Text style={styles.headerText}>Profile</Text>
            </View>
            <View style={styles.midContainer}>
                <ProfilePicture size={100} image={'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'}/>
                <Text style={styles.text}>First Name:
                    <Text style={styles.data}>{fName}</Text>
                </Text>
                <Text style={styles.text}>Last Name:
                    <Text style={styles.data}>{lName}</Text>
                </Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>*Username: </Text>
                    <Text style={styles.data}>{username}</Text>
                    {/*<TextInput*/}
                    {/*    value={username}*/}
                    {/*    onChangeText={setUsername}*/}
                    {/*    placeholder={'username'}*/}
                    {/*/>*/}
                </View>
                <Text style={styles.text}>Email:
                    <Text style={styles.data}>{email}</Text>
                </Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>*Phone Number: </Text>
                    <Text style={styles.data}>{phone}</Text>
                    {/*<TextInput*/}
                    {/*    value={phone}*/}
                    {/*    onChangeText={setPhone}*/}
                    {/*    placeholder={'555-555-5555'}*/}
                    {/*/>*/}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>*Address: </Text>
                    <Text style={styles.data}>{address}</Text>
                    {/*<TextInput*/}
                    {/*    value={address}*/}
                    {/*    onChangeText={setAddress}*/}
                    {/*    placeholder={'San Juan, Puerto Rico'}*/}
                    {/*/>*/}
                </View>
                <Text style={styles.text}>Age:
                    <Text style={styles.data}>{age}</Text>
                </Text>
                <Text style={styles.text}>Gender:
                    <Text style={styles.data}>{gender}</Text>
                </Text>
            </View>
            <Text style={styles.headerText}>*Changeable information</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onUpdateInfoButton} >
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onLogoutButton}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start',
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