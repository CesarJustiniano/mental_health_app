import {AntDesign, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import FeedScreen from '../screens/FeedScreen';
import ChatScreen from "../screens/ChatScreen";
import InformationPsychologistScreen from "../screens/InformationPsychologistScreen";

import ScheduleScreen from "../screens/ScheduleScreen";
import InformationBoardScreen from "../screens/InformationBoardScreen";
import {
    BottomTabParamList,
    ChatNavigatorParamList,
    FeedNavigatorParamList,
    ScheduleNavigatorParamList,
    InformationBoardNavigatorParamList,
    VideoCallNavigatorParamList
} from '../types';
import ProfilePicture from "../components/ProfilePicture";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {getAuthUser} from "../constants/api";
import VideoPreCallScreen from "../screens/VideoPreCallScreen";
import DoctorVideoScreen from "../screens/DoctorVideoScreen";
import DoctorSchedule from "../screens/DoctorSchedule";


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Post"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Post"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="post" color={color} size={30}/>,
        }}
      />

        <BottomTab.Screen
            name="Chat"
            component={ChatNavigator}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="chatbox" color={color} />,
            }}
        />
        <BottomTab.Screen
            name="Schedule"
            component={ScheduleNavigator}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
            }}
        />
        <BottomTab.Screen
            name="Call"
            component={TabTwoNavigator}
            options={{
                tabBarIcon: ({ color }) => <AntDesign name="phone" color={color} size={28} />,
            }}
        />
        <BottomTab.Screen
            name="Info"
            component={InformationBoardNavigator}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="information-circle-outline" color={color} />,
            }}
        />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<FeedNavigatorParamList>();

function HomeNavigator() {
    const navigation = useNavigation();

    const [username, setUsername] = useState([]);

    const fetchUsername = async () => {
        try{
            const info = await getAuthUser();

            setUsername(info.username);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchUsername().then();
    }, [])

    const onProfilePress = () => {
        navigation.navigate('ProfileSettings');
    }

  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="FeedScreen"
        component={FeedScreen}
        options={{
            headerRightContainerStyle: {
                marginRight: 15,
            },

            headerLeftContainerStyle: {
                marginLeft: 15,
            },

            headerTitle: () => (
               <MaterialCommunityIcons name={'brain'} size={30} color={Colors.light.tint}/>
            ),

            headerRight: () => (
                <View style={styles.container}>
                    <Text style={styles.containerHeader}>Feel Good</Text>
                </View>
            ),

            headerLeft: () => (
                <TouchableOpacity onPress={onProfilePress} style={styles.container}>
                    <ProfilePicture size={40} image={'https://www.clipartkey.com/mpngs/m/146-1461473_default-profile-picture-transparent.png'}/>
                    <Text style={styles.containerHeader}>{username}</Text>
                </TouchableOpacity>
            )

        }}
      />
    </TabOneStack.Navigator>
  );
}

const VideoPreCallStack = createStackNavigator<VideoCallNavigatorParamList>()

function TabTwoNavigator() {
    const navigation = useNavigation();

    const [username, setUsername] = useState([]);
    const [userRole, setUserRole] = useState([]);

    const fetchUsername = async () => {
        try{
            const info = await getAuthUser();

            setUsername(info.username);
            setUserRole(info.role);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchUsername().then();
    }, [])

    const onProfilePress = () => {
        navigation.navigate('ProfileSettings');
    }
  return (
    <VideoPreCallStack.Navigator>
      <VideoPreCallStack.Screen
        name="VideoPreCallScreen"
        component={
            userRole=="user"?
            VideoPreCallScreen:DoctorVideoScreen
        }
        options={{
            headerRightContainerStyle: {
                marginRight: 15,
            },

            headerLeftContainerStyle: {
                marginLeft: 15,
            },

            headerTitle: () => (
                <MaterialCommunityIcons name={'brain'} size={30} color={Colors.light.tint}/>
            ),

            headerRight: () => (
                <View style={styles.container}>
                    <Text style={styles.containerHeader}>Feel Good</Text>
                </View>
            ),

            headerLeft: () => (
                <TouchableOpacity onPress={onProfilePress} style={styles.container}>
                    <ProfilePicture size={40} image={'https://www.clipartkey.com/mpngs/m/146-1461473_default-profile-picture-transparent.png'}/>
                    <Text style={styles.containerHeader}>{username}</Text>
                </TouchableOpacity>
            )

        }}
      />
    </VideoPreCallStack.Navigator>
  );
}

const ChatStack = createStackNavigator<ChatNavigatorParamList>()

function ChatNavigator() {
    const navigation = useNavigation();

    const [username, setUsername] = useState([]);

    const fetchUsername = async () => {
        try{
            const info = await getAuthUser();

            setUsername(info.username);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchUsername().then();
    }, [])

    const onProfilePress = () => {
        navigation.navigate('ProfileSettings');
    }

    return (
        <ChatStack.Navigator>
            <ChatStack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{
                    headerRightContainerStyle: {
                        marginRight: 15,
                    },

                    headerLeftContainerStyle: {
                        marginLeft: 15,
                    },

                    headerTitle: () => (
                        <MaterialCommunityIcons name={'brain'} size={30} color={Colors.light.tint}/>
                    ),

                    headerRight: () => (
                        <View style={styles.container}>
                            <Text style={styles.containerHeader}>Feel Good</Text>
                        </View>
                    ),

                    headerLeft: () => (
                        <TouchableOpacity onPress={onProfilePress} style={styles.container}>
                            <ProfilePicture size={40} image={'https://www.clipartkey.com/mpngs/m/146-1461473_default-profile-picture-transparent.png'}/>
                            <Text style={styles.containerHeader}>{username}</Text>
                        </TouchableOpacity>
                    )

                }}
            />
        </ChatStack.Navigator>
    );
}

const ScheduleStack = createStackNavigator<ScheduleNavigatorParamList>()

function ScheduleNavigator() {
    const navigation = useNavigation();

    const [username, setUsername] = useState([]);
    const [userRole, setUserRole] = useState([]);

    const fetchUsername = async () => {
        try{
            const info = await getAuthUser();

            setUsername(info.username);
            setUserRole(info.role)
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchUsername().then();
    }, [])

    const onProfilePress = () => {
        navigation.navigate('ProfileSettings');
    }

    return (
        <ScheduleStack.Navigator>
            <ScheduleStack.Screen
                name="ScheduleScreen"
                component={
                    userRole=="user"?
                    ScheduleScreen:DoctorSchedule
                }
                options={{
                    headerRightContainerStyle: {
                        marginRight: 15,
                    },

                    headerLeftContainerStyle: {
                        marginLeft: 15,
                    },

                    headerTitle: () => (
                        <MaterialCommunityIcons name={'brain'} size={30} color={Colors.light.tint}/>
                    ),

                    headerRight: () => (
                        <View style={styles.container}>
                            <Text style={styles.containerHeader}>Feel Good</Text>
                        </View>
                    ),

                    headerLeft: () => (
                        <TouchableOpacity onPress={onProfilePress} style={styles.container}>
                            <ProfilePicture size={40} image={'https://www.clipartkey.com/mpngs/m/146-1461473_default-profile-picture-transparent.png'}/>
                            <Text style={styles.containerHeader}>{username}</Text>
                        </TouchableOpacity>
                    )

                }}
            />
        </ScheduleStack.Navigator>
    );
}

const InformationBoardStack = createStackNavigator<InformationBoardNavigatorParamList>()

function InformationBoardNavigator() {
    const navigation = useNavigation();

    const [username, setUsername] = useState([]);
    const [userRole, setUserRole] = useState([]);

    const fetchUsername = async () => {
        try{
            const info = await getAuthUser();

            setUsername(info.username);
            setUserRole(info.role);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchUsername().then();
    }, [])

    const onProfilePress = () => {
        navigation.navigate('ProfileSettings');
    }

    return (
        <InformationBoardStack.Navigator>
            <InformationBoardStack.Screen
                name="InformationBoardScreen"
                component={
                    userRole =="user"?
                    InformationBoardScreen:InformationPsychologistScreen
                }
                options={{
                    headerRightContainerStyle: {
                        marginRight: 15,
                    },

                    headerLeftContainerStyle: {
                        marginLeft: 15,
                    },

                    headerTitle: () => (
                        <MaterialCommunityIcons name={'brain'} size={30} color={Colors.light.tint}/>
                    ),

                    headerRight: () => (
                        <View style={styles.container}>
                            <Text style={styles.containerHeader}>Feel Good</Text>
                        </View>
                    ),

                    headerLeft: () => (
                        <TouchableOpacity onPress={onProfilePress} style={styles.container}>
                            <ProfilePicture size={40} image={'https://www.clipartkey.com/mpngs/m/146-1461473_default-profile-picture-transparent.png'}/>
                            <Text style={styles.containerHeader}>{username}</Text>
                        </TouchableOpacity>
                    )

                }}
            />
        </InformationBoardStack.Navigator>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-around',
        width: '100%',
    },
    containerHeader: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    },
});