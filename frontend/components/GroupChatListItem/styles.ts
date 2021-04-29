import {StyleSheet} from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 0.5,
    },
    leftContainer: {
        flexDirection: "row",
    },
    midContainer: {
        justifyContent: "space-around",
        marginHorizontal: 5,
    },
    avatar: {
        width: 60,
        height: 60,
        marginRight: 15,
        borderRadius: 50,
    },
    groupName: {
        fontWeight: "bold",
        color: Colors.light.tint,
    },
    description: {
        fontSize: 16,
        color: 'grey',
    },
})

export default styles;