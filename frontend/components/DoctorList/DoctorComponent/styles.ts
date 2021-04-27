import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
        justifyContent:"center",
        alignItems:"center",
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
})

export default styles;