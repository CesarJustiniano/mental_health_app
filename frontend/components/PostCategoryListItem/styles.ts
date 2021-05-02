import {StyleSheet} from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 0.5,
    },
    name: {
        fontWeight: "bold",
        color: Colors.light.tint,
    },

})

export default styles;