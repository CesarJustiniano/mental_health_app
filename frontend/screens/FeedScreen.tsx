import * as React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';

import { View } from '../components/Themed';
import Feed from "../components/Feed";
import NewPostButton from "../components/NewPostButton";
import {AntDesign} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import {useNavigation, useRoute} from "@react-navigation/native";

export default function FeedScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    const onCloseButton = () => {
        navigation.navigate('Root');
    }

  return (
    <View style={styles.container} >
        <View style={styles.headerContainer}>
            <AntDesign name={'close'} size={30} color={Colors.light.tint} onPress={onCloseButton}/>
            <Text style={styles.headerText}>{route.params.name}</Text>
        </View>
      <Feed />
      <NewPostButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
      backgroundColor: 'white'
  },
    headerContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-between',
        alignItems: "center",
        fontWeight: "bold",
        padding: 15,
        marginTop: 30,
        borderBottomWidth: 0.5,
        borderColor: 'lightgrey',
    },
    headerText: {
        color: Colors.light.tint,
        fontWeight: "bold",
    },
});
