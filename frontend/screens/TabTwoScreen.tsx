import * as React from 'react';
import {StyleSheet} from 'react-native';

import { Text } from '../components/Themed';
import {useNavigation} from "@react-navigation/native";


export default function TabTwoScreen() {
  const  navigation = useNavigation();

  return (
      <Text style={styles.container}>Hello Word</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
