import React, {useState} from 'react';
import {
    KeyboardAvoidingView,
    FlatList,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    StatusBar, Animated, Linking
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Text, View, } from '../components/Themed';
import {getAuthUser} from "../constants/api";


const ITEM_SIZE= 160

export default function HelpCenterScreen(){
    const scrollY = React.useRef(new Animated.Value(0)).current
    const [people,setPeople] = useState([
        //{name: 'Hospital San Juan Capestran', _id: '1',phone:' (787) 852-0505',web:''},
        //{name : 'Beachway Therapy Center', _id:'2',phone:'(877) 226-5235',web:'https://www.beachway.com/?utm_source=psychology_today'},
        //{name : 'Hogar Crea Coamo Varones', _id:'3',phone:'888-991-1168',web:''},
        //{name: 'Hogar Crea Cayey', _id:'4',phone:'888-991-1168',web:''},
        //{name: 'Hogar Crea San Sebastian', _id: '5',phone:'888-991-1168',web:''},
        //{name: 'Hogar Crea Las Marias', _id: '6',phone:'888-991-1168',web:''},
        //{name: 'Hogar Crea San Humacao', _id: '7',phone:'888-991-1168',web:''},
        //{name: 'Hogar Crea Gurabo', _id: '8',phone:'888-991-1168',web:''},
        // {name: 'Hogar Crea Corozal', _id: '9',phone:'888-991-1168',web:''},
        //{name: 'Hogar Crea La Quinta', _id: '10',phone:'888-991-1168',web:''},
        //{name: 'Hogar Crea Comerio', _id: '11',phone:'888-991-1168',web:''},
        //{name: 'Hogar Crea Naranjito', _id: '12',phone:'888-991-1168',web:''},
        //{name: 'Hogar Crea Manati Varones', _id: '13',phone:'888-991-1168',web:''},
        //{name: 'Hogar Crea Coamo Damas', _id: '14',phone:'888-991-1168',web:''},
        //{name: 'Hogar Crea Yabucoa', _id: '15',phone:'888-991-1168',web:''},
        // {name: 'Hogar Crea Sabana Catano', _id: '16',phone:'888-991-1168',web:''},
        //{name: 'Hogar Crea Guaynabo Adultos', _id: '17',phone:'888-991-1168',web:''},
        //{name: 'Casa Luz y Vida Incorporated', _id: '18',phone:'888-991-1168',web:''},
        //{name: 'Silo Mision Christiana Incorporated', _id: '19',phone:'888-991-1168',web:''},
        // {name: 'Hogar Jesus Incorporated', _id: '20',phone:'888-991-1168',web:''},
        //{name: 'Hogar Nuevo Pacto', _id: '21',phone:'888-991-1168',web:''},
        {name: 'Ashford Presbyterian Community Hospital', id: '22', phone:' (787) 721-2160', web: 'https://www.presbypr.com/' },
        {name: 'Auxilio Mutuo', id: '23',phone:'(787) 758-2000',web:'http://www.auxiliomutuo.com/'},
        {name: 'Bella Vista', id: '24',phone:'(787) 834-6000',web:'http://www.agencias.pr.gov/agencias/Cardio/Pages/default.aspx'},
        {name: 'Caribbean Medical Center', id: '25', phone:' (787) 801-0081', web:'http://www.caribbeanmedicalcenter.com/'},
        {name: 'Centro Cardiovascular de Puerto Rico y El Caribe', id: '26',phone:'(787) 754-8500',web:'http://www.agencias.pr.gov/agencias/Cardio/Pages/default.aspx'},
        {name: 'Complejo Correccional de Bayamón', id: '27',phone:' (787) 758-8019',web:'http://www.chsc-pr.org/HospitalPsiquiatrico.html'},
        {name: 'Cuidado Agudo Especializado de Pacientes Politraumatizados', id: '28',phone:' (787) 777-3535',web:'https://www.asempr.org/'},
        {name: 'Doctor’s Center Hospital Bayamón', id: '29',phone:' (787) 622-5420',web:'http://www.tuhospitalfamiliar.com/'},
        {name: 'Doctor’s Center Hospital San Juan', id: '30',phone:' (787) 999-7620',web:'http://www.tuhospitalfamiliar.com/'},
        {name: 'Doctors’ Center Hospital Carolina', id: '31',phone:'(898) 626-3322',web:'https://www.tuhospitalfamiliar.com/'},
        {name: 'Doctors’ Center Hospital Manati', id: '32',phone:'(787) 854-3322',web:'http://www.tuhospitalfamiliar.com/'},
        {name: 'Episcopal San Lucas Ponce', id: '33',phone:' (787) 844-2080',web:'http://www.sanlucaspr.org/es/hospital-san-lucas-ponce?nav=ponce'},
        {name: 'First Hospital Panamericano', id: '34',phone:'(787) 739-5555',web:'http://www.hospitalpanamericano.com/'},
        {name: 'Healthsouth Rehabilitation Manati', id: '35',phone:' (787) 621-3800',web:'http://www.healthsouthmanati.com/en'},
        {name: 'HIMA San Pablo Bayamón', id: '36',phone:'(787) 620-4747',web:'http://himasanpablo.com/hospitales/bayamon/'},
        {name: 'HIMA San Pablo Caguas', id: '37',phone:'(787) 653-3434',web:'http://himasanpablo.com/hospitales/caguas/'},
        {name: 'HIMA San Pablo Cupey', id: '38',phone:' (787) 305-8383',web:'https://himasanpablo.com/hospitales/cupey/'},
        {name: 'HIMA San Pablo Fajardo', id: '39',phone:' (787) 655-0505',web:'http://himasanpablo.com/hospitales/fajardo/'},
        {name: 'HIMA San Pablo Humacao', id: '40',phone:'(787) 656-2424',web:'http://himasanpablo.com/hospitales/humacao/'},
        {name: 'Hospital Buen Samaritano', id: '41',phone:'(787) 658-0000',web:'http://www.hbspr.org/'},
        {name: 'Hospital Damas', id: '42',phone:' (787) 840-8686',web:'http://www.hospitaldamas.com/'},
        {name: 'Hospital de la Concepción', id: '43',phone:'(787) 892-1860',web:'http://www.hospitalconcepcion.com/'},
        {name: 'Hospital de Psiquiatria Dr. Ramon Fernandez Marina', id: '44',phone:'(787) 766-4646',web:''},
        {name: 'Hospital de Veteranos', id: '45',phone:'(787) 641-7582',web:'http://www.caribbean.va.gov/'},
        {name: 'Hospital del Maestro', id: '46',phone:'(787) 758-8383',web:'https://www.facebook.com/Hospital-El-Maestro-1563166177263666/'},
        {name: 'Hospital General Castañer', id: '47',phone:'(787) 829-5010',web:'http://www.hospitalcastaner.com/'},
        {name: 'Hospital Menonita Caguas', id: '48',phone:'(787) 653-0550',web:'http://www.sistemamenonita.com/'},
        {name: 'Hospital Menonita Aibonito', id: '48',phone:'(787) 735-8001',web:'http://sistemamenonita.com/'},
        {name: 'Hospital Menonita Guayama', id: '49',phone:'(787) 864-4300',web:'http://sistemamenonita.com/'},
        {name: 'Hospital Menonita Cayey', id: '50',phone:' (787) 852-0505',web:''},
    ])


    const  navigation = useNavigation();

    const onButtonPress = async () => {
        const info = await getAuthUser();
        if(info.role=="doctor"){
            navigation.navigate('Root');
        }
        else {
            navigation.navigate('Root');
        }

    }

    return(

        <View style={styles.container}>
            <TouchableOpacity >
                <Text style={styles.customButton} onPress={onButtonPress} >GO BACK</Text>
            </TouchableOpacity>

            <Animated.FlatList
                numColumns={1}
                onScroll={Animated.event(
                    [{nativeEvent:{contentOffset:{y:scrollY}}}]
                )}
                keyExtractor={(item)=>item.id}
                data={people}
                contentContainerStyle={{
                    //padding: 'SPACING',
                    paddingTop: StatusBar.currentHeight || 42,
                }}
                renderItem={({item,index})=> {
                    const inputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + 2 )
                    ]
                    const opacityInputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index +1 )
                    ]

                    const scale = scrollY.interpolate(
                        {
                            inputRange,
                            outputRange:[1,1,1,0]
                        }
                    )
                    const opacity = scrollY.interpolate(
                        {
                            inputRange: opacityInputRange,
                            outputRange:[1,1,1,0]
                        }
                    )


                    return <Animated.View style={
                        {
                            marginTop: 24,
                            padding: 30,
                            backgroundColor: 'rgb(0, 128, 128)',
                            //fontSize: 24,
                            marginHorizontal:10,
                            shadowColor: "#000",
                            shadowOffset: {
                                width:0,
                                height:10
                            },
                            shadowOpacity: .3,
                            shadowRadius: 20,
                            transform:[{scale}],
                            opacity,
                        }
                    }>
                        <Text style={{fontSize: 22, fontWeight: '700'}}>{item.name}</Text>
                        <Text style={{fontSize: 16, opacity: .7}}>{item.phone}</Text>
                        <Text style={{fontSize: 12, opacity: .7}} onPress={ ()=> Linking.openURL(item.web) }>{item.web}</Text>
                    </Animated.View>

                }}
            />


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

        marginBottom: 15,





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
    },

    item: {
        marginTop: 24,
        padding: 30,
        backgroundColor: 'rgb(0, 128, 128)',
        fontSize: 24,
        marginHorizontal:10,
        shadowColor: "#000",
        shadowOffset: {
            width:0,
            height:10
        },
        shadowOpacity: .3,
        shadowRadius: 20,


    },
});
