import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    objeto: {
        flexDirection: "row",
        marginVertical: 5,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#8073BD",
        borderRadius: 10,
        margin: 50,
    },
    image: {
        width: 100,
        height: 140,
        margin: 15,
        borderRadius: 10,
        paddingLeft: 50,
    },
    informacion: {
        marginHorizontal: 5,
        marginTop: 20,
    },
    name: {
        fontWeight: "bold",

    },
    info: {
        color: "#828282",
        paddingRight: 100,
        marginTop: 3,
    },
    switch: {
        marginTop: -80,

    },
    iconContainer: {
        marginRight: 0,
        marginTop: 70,

    },

    delete: {
        marginRight: -90,
        marginTop: -37,

    },
    eye: {
        marginRight: -180,
        marginTop: -35,
    },



});
