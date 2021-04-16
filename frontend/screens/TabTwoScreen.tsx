import * as React from 'react';
import {StyleSheet,Platform,ScrollView, TextInput, Dimensions, TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View , } from '../components/Themed';
import {useNavigation} from "@react-navigation/native";
const {width: WIDTH} = Dimensions.get('window')

export default function TabTwoScreen() {
  const  navigation = useNavigation();

  const onButtonPress = () => {
    navigation.navigate('SignUpScreen');
  }
  
  const onButtonPress2 = () => {
    navigation.navigate('UserMenuScreen');
  }

  const onButtonPressFirst = ()=>{
    navigation.navigate('FirstScreen')
  }

  const onButtonTest= ()=>{
    navigation.navigate('VideoPreCallScreen')
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
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />



      <View>
        <Text style={styles.headings}>CREATE AN ACCOUNT</Text>


        <View >
          <TouchableOpacity>
          <Text style={styles.redButton} onPress={onButtonTest}>SIGN UP</Text>
          </TouchableOpacity>
        </View>



      </View>

      <View>

        <Text style={styles.headings}>LOGIN</Text>
        <TextInput style={styles.customInput}  placeholder='Email/Username'
        placeholderTextColor='rgba(255,255,255,0.7'
        underlineColorAndroid='transparent'>


        </TextInput>

        <TextInput style={styles.customInput}
        placeholder={'Password'} secureTextEntry={true} placeholderTextColor='rgba(255,255,255,0.7' underlineColorAndroid='transparent'
        >

        </TextInput>
        <View>
          <Text style={styles.redButton} onPress={onButtonPress2} >LOGIN</Text>
        </View>

        <View>
          <Text style={styles.headings}>-----------0R-----------</Text>
          <TouchableOpacity >
            <Text style={styles.redButton} onPress={onButtonPressFirst} >GO BACK</Text>
          </TouchableOpacity>
        </View>



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
    fontFamily: 'Orienta',
    letterSpacing: 1,
    fontStyle: 'italic',

  },
    customInput:{
      borderWidth: 0,
      borderColor: 'black',
      borderStyle: 'solid',
      //WebkitAppearance: 'none',
      //msAppearance: 'none',
      //MozAppearance: 'none',
      //appearance: 'none',
      backgroundColor: "#f2f2f2",
      padding: 12,
      borderRadius: 3,
      width: 250,
      //outline: 'none',
      fontSize: 14,
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      //borderBottom: "1px solid black"
      marginBottom:15,
      //alt
      //width: WIDTH-55,
      //height: 45,
      //borderRadius: 25,
      //fontSize: 16,
      //paddingLeft: 45,
      //backgroundColor: 'rgba(0,0,0,0.35)',
      //color: 'rgba(255,255,255,0.7)',
      //marginHorizontal:25


    },
  redButton:{
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
