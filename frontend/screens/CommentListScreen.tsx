import * as React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

import { View } from '../components/Themed';
import CommentList from "../components/CommentList";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';

export default function CommentListScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  console.log(route.params)

  const onCloseButton = () => {
    navigation.navigate('Feed');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <AntDesign name={'close'} size={30} color={Colors.light.tint} onPress={onCloseButton}/>
        <Text style={styles.headerText}>Comments</Text>
      </View>
      <CommentList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  headerContainer: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    color: Colors.light.tint,
    justifyContent: 'center',
  },
});
