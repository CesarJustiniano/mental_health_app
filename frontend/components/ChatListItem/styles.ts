import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
    },
    leftContainer: {
        flexDirection: "row",
    },
    midContainer: {
        justifyContent: "space-around",
        width: '56%',
    },
    avatar: {
        width: 60,
        height: 60,
        marginRight: 15,
        borderRadius: 50,
    },
    username: {
        fontWeight: "bold",
    },
    lastMessage: {
        fontSize: 16,
        color: 'grey',
        width: '100%',
    },
    time: {
        fontSize: 14,
        color: 'grey',
        width: '30%',
    },
})

export default styles;