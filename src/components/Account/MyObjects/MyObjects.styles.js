import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content: {
        backgroundColor: "#fff",
        marginVertical: 5,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: "#8073BD",
        borderRadius: 10,
    },
    image: {
        width: "100%",
        height: 150,
        borderRadius: 10,
    },
    infoContent: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
    iconContainer: {
        position: "absolute",
        backgroundColor: "#fff",
        borderRadius: 50,
        padding: 15,
        top: -30,
        right: 20,
    },
});
