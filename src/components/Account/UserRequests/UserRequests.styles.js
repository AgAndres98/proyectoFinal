import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
       
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
        width: 180,
        height: 140,
        margin: 15,
        paddingRight:10,
        borderRadius: 10,
        paddingLeft: 40,
        right:30,
    },
    informacion: {
        marginHorizontal: 5,
        marginTop: 20,
    },
    name: {
        fontWeight: "bold",
        right:40,
        textDecorationLine:'underline',
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
        marginRight: 150,
        marginTop: 70,
        borderColor:"#adff2f",
    },

    delete: {
        marginRight: 55,
        marginTop: -37,

    },
    eye: {
        marginRight: -50,
        marginTop: -35,
    },

    avatar:{
        marginRight:0,
        backgroundColor:"green",
        borderRadius: 10,
       
    },

    containerIcons:{
        right:45,
    }


});
