import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import NewPostScreen from "../screens/NewPostScreen";
import NewCommentScreen from "../screens/NewCommentScreen";
import CommentListScreen from "../screens/CommentListScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import ChatCategoriesScreen from "../screens/ChatCategoriesScreen";
import GroupChatScreen from "../screens/GroupChatScreen";
import GroupChatRoomScreen from "../screens/GroupChatRoomScreen";
import ProfileSettingsScreen from "../screens/ProfileSettingsScreen";
import SignUpScreen from "../screens/SignUpScreen";
import InformationBoardScreen from "../screens/InformationBoardScreen";
import HelpCenterScreen from "../screens/HelpCenterScreen";
import LoginPsychologistScreen from "../screens/LoginPsychologistScreen";
import PsychologistMenuScreen from "../screens/PsychologistMenuScreen";
import UserMenuScreen from "../screens/UserMenuScreen";
import FirstScreen from "../screens/FirstScreen";
import CalendarAgenda from "../screens/CalendarAgenda";
import DatePickerScreen from "../screens/DatePickerScreen";
import DateTimePickerScreen from "../screens/DateTimePickerScreen";
import TermsOfServiceScreen from "../screens/TermsOfServiceScteen";
import InformationPsychologistScreen from "../screens/InformationPsychologistScreen";
import VideoPreCallScreen from "../screens/VideoPreCallScreen";
import SignUpDoctorScreen from "../screens/SignUpDoctorScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NewPost" component={NewPostScreen} />
      <Stack.Screen name="NewComment" component={NewCommentScreen} />
      <Stack.Screen name="CommentList" component={CommentListScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
      <Stack.Screen name="ChatCategory" component={ChatCategoriesScreen} />
      <Stack.Screen name="GroupChatList" component={GroupChatScreen} />
      <Stack.Screen name="GroupChatRoom" component={GroupChatRoomScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
      <Stack.Screen name= "SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name= "InformationBoardScreen" component={InformationBoardScreen} />
      <Stack.Screen name= "HelpCenterScreen" component={HelpCenterScreen} />
      <Stack.Screen name= "LoginPsychologistScreen" component={LoginPsychologistScreen} />
      <Stack.Screen name= "PsychologistMenuScreen" component={PsychologistMenuScreen} />
      <Stack.Screen name= "UserMenuScreen" component={UserMenuScreen} />
      <Stack.Screen name= "FirstScreen" component={FirstScreen} />
      <Stack.Screen name= "CalendarAgenda" component={CalendarAgenda} />
      <Stack.Screen name= "DatePickerScreen" component={DatePickerScreen} />
      <Stack.Screen name="TermsOfServiceScreen" component={TermsOfServiceScreen} />
      <Stack.Screen name= "DateTimePickerScreen" component={DateTimePickerScreen} />
      <Stack.Screen name= "InformationPsychologistScreen" component={InformationPsychologistScreen} />
      <Stack.Screen name= "VideoPreCallScreen" component={VideoPreCallScreen} />
      <Stack.Screen name= "ScheduleScreen" component={ScheduleScreen}/>
      <Stack.Screen name= "SignUpDoctorScreen" component={SignUpDoctorScreen} />
      <Stack.Screen name={"UpdateProfileScreen"} component={UpdateProfileScreen}/>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
